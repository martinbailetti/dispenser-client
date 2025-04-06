import { useTranslation } from "@/context/contextUtils";
import { useAppSelector } from "@/redux/hooks";
import { playAudio } from "@/utils/audio";
import { memo, useContext, useRef } from "react";
import { close_detail_wait } from "@/config";
import { DataContext } from "@/context/DataContext";
import { sendActionToMachine } from "@/bridge";
/**
 *
 * Item detail component displays detailed information about the item.
 */
const ItemDetail = memo(
  ({
    price,
    title,
    description,
    image,
    closeClick,
  }: {
    price: number;
    title: string;
    description: string;
    image: string;
    closeClick: () => void;
  }) => {
    const configData = useAppSelector((state) => state.configData);
    const { language } = useContext(DataContext);

    const t = useTranslation();

    const itemDetailRef = useRef<HTMLDivElement>(null);

    const closeDetail = () => {
      sendActionToMachine("log", {message: `close item detail click`});
      playAudio("click");
      itemDetailRef.current?.classList.add("hide");
      setTimeout(() => {
        closeClick();
      }, close_detail_wait);
    };

    const title_locale = JSON.parse(title);
    const description_locale = JSON.parse(description);
    return (
      <div data-testid="close-detail" className="item-detail" onClick={closeDetail}>
        <div className="content " ref={itemDetailRef}>
          <div className="top-bar">
            <div className="close">{t("close_detail")}</div>
          </div>
          <div className="banner">
            <img className="game-image" src={`${image}`} alt={title_locale[language]} />
          </div>

          <div className="info">
            <div className="title">{title_locale[language]}</div>
            <div className="price">
              {configData.currency.symbol}
              {price.toFixed(2)}
            </div>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description_locale[language] }}
          ></div>
        </div>
      </div>
    );
  },
);
ItemDetail.displayName = "ItemDetail";
export default ItemDetail;
