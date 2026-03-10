"use client"
import Item from "./item";
import { useState } from "react";

type ItemProps = {
  id?: string;
  name: string;
  quantity: number;
  category: string;
};
interface ItemListProps {
  items: ItemProps[];
  onItemSelect: (item: ItemProps) => void; // callback when an item is clicked
}
function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'group'>("name")
  const sortItems = [...items].sort((current, next) => {
    if (sortBy === 'name') {
      return current.name.localeCompare(next.name);
    }
    else if (sortBy === 'category') {
      return current.category.localeCompare(next.category);
    }
    else {
      return 0;
    }
  });
  const renderGroupedItems = () => {
    const grouped: Record<string, ItemProps[]> = {};

    // We are NOT modifying items, only reading from it
    items.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    return Object.keys(grouped)
      .sort()
      .map((category) => {
        // Copy before sorting inside group
        const sortedGroup = [...grouped[category]].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        return (
          <div key={category} className="mb-4">
            <h2 className="text-xl font-bold capitalize">{category}</h2>

            <div className="ml-5 mt-2">
              {sortedGroup.map((item) => (
                <Item
                  key={item.id ?? item.name}
                  {...item}
                  onSelect={() => onItemSelect(item)} // pass click callback
                />
              ))}
            </div>
          </div>
        );
      });
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Sort by: {sortBy}
      </h1>

      {sortBy === "group"
        ? renderGroupedItems()
        : sortItems.map((item) => (
          <Item
            key={item.id ?? item.name}
            {...item}
            onSelect={() => onItemSelect(item)}
          />
        ))}

      <div className="flex gap-10 mt-6 justify-center">
        <button onClick={() => setSortBy("name")} className="bg-amber-50 p-8  rounded-4xl text-2xl text-black hover:bg-black hover:text-white hover: cursor-pointer">Name</button>
        <button onClick={() => setSortBy("category")} className="bg-amber-50 p-8  rounded-4xl text-2xl text-black hover:bg-black hover:text-white hover: cursor-pointer">Category</button>
        <button onClick={() => setSortBy("group")} className="bg-amber-50 p-8  rounded-4xl text-2xl text-black hover:bg-black hover:text-white hover: cursor-pointer">Group</button>
      </div>
    </>
  );
}


export default ItemList;