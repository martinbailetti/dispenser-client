import { useAppSelector } from "@/redux/hooks";
import { ItemInterface } from "@/types";

import Item from "@/components/index/Item";
import { memo, useCallback } from "react";

const ItemList = memo(
  ({
    openDetailClick,
  }: {
    openDetailClick: (item: ItemInterface) => void; // eslint-disable-line
  }) => {
    const items = useAppSelector((state) => state.itemsData.items);

    const showItems = useCallback(() => {
      const sortedItems = items
        ? [...items].sort((a, b) => a.screen_position - b.screen_position)
        : [];
      if (sortedItems) {
        return sortedItems.map((item: ItemInterface, index: number) => {
          return <Item key={index} data={item} infoClick={() => openDetailClick(item)} />;
        });
      }
    }, [openDetailClick, items]);

    return (
      <div className="items-list" data-testid="item-list">
        {showItems()}
      </div>
    );
  },
);

ItemList.displayName = "ItemList";
export default ItemList;
