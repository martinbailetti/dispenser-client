import { addItem, removeItem } from "@/slices/customerSlice";
import { SelectedItemInterface, ItemInterface } from "@/types";
import { memo, useContext, useMemo, useState } from "react";
import { useTranslation } from "@/context/contextUtils";
import Tooltip from "@/components/common/Tooltip";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { playAudio } from "@/utils/audio";
import { DataContext } from "@/context/DataContext";
import { sendActionToMachine } from "@/bridge";

interface ItemProps {
  data: ItemInterface;
  infoClick: () => void;
}

/**
 * Item component represents an individual item in the list.
 * It allows users to add or remove the item from their selection,
 * and displays relevant information about the item.
 */
const Item = memo(({ data, infoClick }: ItemProps) => {
  const dispatch = useAppDispatch();
  const { language } = useContext(DataContext);

  const t = useTranslation();

  const [pressed, setPressed] = useState("");

  const [tooltip, setTooltip] = useState({ text: "", type: "", elm: null as HTMLElement | null });
  const customerData = useAppSelector((state) => state.customerData);
  const configData = useAppSelector((state) => state.configData);

  const item = useMemo(() => {
    return customerData.items.find(
      (elm: SelectedItemInterface) => elm.id === data.id && elm.screen_position ===  data.screen_position,
    );
  }, [customerData.items, data.id, data.screen_position]);

  const quantity = item ? item.quantity : 0;

  const handlePressed = (type: string) => {
    setPressed(type);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setPressed("");
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleAddItem = (event: React.MouseEvent<HTMLElement>) => {
    if (data.status !== "ok") {
      return;
    }

    if (data.current_quantity < quantity + 1) {
      if (tooltip.elm == null) {
        setTooltip({ text: t("no_stock"), type: "right", elm: event.currentTarget });
      }
      return;
    }
    if (data.max_quantity < quantity + 1) {
      if (tooltip.elm == null) {
        setTooltip({
          text: t("maximum_amount"),
          type: "right",
          elm: event.currentTarget,
        });
      }
      return;
    }
    playAudio("click");
    const item: SelectedItemInterface = {
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.image,
      quantity: 1,
      dispenser:  data.dispenser,
      screen_position:  data.screen_position,
    };
    const totalElm = document.querySelector("#total");
    totalElm?.classList.remove("animated");
    setTimeout(() => {
      totalElm?.classList.add("animated");
    }, 500);

    sendActionToMachine("log", {message: `add item: ${JSON.stringify(item)}`});
    dispatch(addItem(item));
  };
  const handleInfoClick = () => {
    console.log("handleInfoClick");

    sendActionToMachine("log", {message: `show item info click`});
    playAudio("click");
    infoClick();
  };

  const closeTooltip = () => {
    setTooltip({ ...tooltip, elm: null });
  };

  const handleRemoveItem = () => {
    if (quantity == 0) {
      return;
    }

    playAudio("click");
    sendActionToMachine("log", {message: `remove item`});
    dispatch(removeItem({ ...data, screen_position: data.screen_position }));
  };

  const title = JSON.parse(data.title)[language];

  return (
    <div className={`item ${data.status !== "ok" ? "disabled" : ""}`} key={data.screen_position}>
      {tooltip.elm && <Tooltip {...tooltip} closeTooltip={closeTooltip} />}
      <div className={`content ${quantity > 0 ? "active" : ""} fade-in delay-${data.screen_position}`}>
        <div className="banner">
          <img
            data-testid="increase-image"
            alt={title}
            className="game-image"
            src={`${data.thumbnail}`}
            onMouseDown={() => {
              handlePressed("increase");
            }}
            onTouchStart={() => {
              handlePressed("increase");
            }}
            onTouchEnd={() => {
              handleMouseUp();
            }}
            onClick={handleAddItem}
          />
          <div className="info-link">
            <img
              data-testid="info-link"
              alt="Info"
              className="press"
              src="images/info.png"
              onClick={handleInfoClick}
            />
          </div>
        </div>
        <div className="panel">
          <div className="info">
            <div className="title">{title}</div>
            <div className="price">
              {configData?.currency.symbol}
              {Number(data.price).toFixed(2)}
            </div>
          </div>

          {data.status == "ok" && (
            <div className="game-quantity">
              <div className="container">
                <div className="selector">
                  <div className="buttons">
                    <div
                      data-testid="decrease-button"
                      className={`button decrease press ${pressed == "decrease" ? " pressed" : ""} ${quantity == 0 ? " disabled" : ""}`}
                      onMouseDown={() => handlePressed("decrease")}
                      onTouchStart={() => {
                        handlePressed("decrease");
                      }}
                      onTouchEnd={() => {
                        handleMouseUp();
                      }}
                      onClick={handleRemoveItem}
                    >
                      −
                    </div>
                    <div className="quantity" data-testid="item-quantity">
                      {quantity}
                    </div>
                    <div
                      data-testid="increase-button"
                      className={`button increase press ${pressed == "increase" ? " pressed" : ""} ${data.max_quantity < quantity + 1 || data.current_quantity < quantity + 1 ? " disabled" : ""}`}
                      onMouseDown={() => handlePressed("increase")}
                      onTouchStart={() => {
                        handlePressed("increase");
                      }}
                      onTouchEnd={() => {
                        handleMouseUp();
                      }}
                      onClick={handleAddItem}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
              <div className="total-content">
                <div className="label-total">{t("total")}</div>
                <div className="total" id="total1">
                  {configData.currency.symbol}
                  {(data.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {data.status !== "ok" && (
            <div className="error">
              <span>NO DISPONIBLE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
Item.displayName = "Item";
export default Item;
