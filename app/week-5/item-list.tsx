"use client"
import Item from "./item";
import { useState } from "react";
import itemsData from "./items.json";


function ItemList() {
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'group'>("name")
  const sortItems = [...itemsData].sort((current, next) => {
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
    const grouped = itemsData.reduce<Record<string, typeof itemsData>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const sortedCategories = Object.keys(grouped).sort(); // sort categories alphabetically

    return sortedCategories.map(category => (
      <div key={category} className="mb-4">
        <h2 className="font-bold capitalize text-xl">{category}</h2>
        <div className="ml-5 mt-1">
          {grouped[category]
            .sort((a, b) => a.name.localeCompare(b.name)) // sort items alphabetically
            .map((item, idx) => (
              <Item key={idx} {...item} />
            ))}
        </div>
      </div>
    ));
  };
  return (
    <>
      <h1 className="text-4xl mb-5 text-center ">Sort by: <span className=" font-bold text-blue-300">{sortBy}</span></h1>
      <div>
        {sortBy === "group" ? renderGroupedItems() : sortItems.map((item, index) => <Item key={index} {...item} />)}


        {sortItems.map((item, index) => (
          <Item key={index} name={item.name} quantity={item.quantity} category={item.category} />
        ))}
      </div >
      <div className=" flex flex-col md:flex-row items-center md:justify-around gap-4 mt-8 
      ">
        <button onClick={() => setSortBy('name')} className={` h-15 rounded-2xl hover:bg-black hover:text-white cursor-pointer ${sortBy === "name" ? " bg-blue-100 text-black w-50" : "bg-amber-50 text-black w-50"} `}> name</button >
        <button onClick={() => setSortBy('category')} className={` h-15 rounded-2xl  hover:bg-black hover:text-white cursor-pointer ${sortBy === "category" ? " bg-blue-100 text-black w-50 " : "bg-amber-50 text-black w-50"} `}>category</button>
        <button
          onClick={() => setSortBy("group")}
          className={`h-15 rounded-2xl hover:bg-black hover:text-white cursor-pointer ${sortBy === "group" ? "bg-blue-100 text-black w-50" : "bg-amber-50 text-black w-50"
            }`}
        >
          Group
        </button>
      </div>
      <div>

      </div>
    </>
  );
}

export default ItemList;