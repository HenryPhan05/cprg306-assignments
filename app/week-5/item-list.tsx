"use client"
import Item from "./item";
import { useState } from "react";
import itemsData from "./items.json";


function ItemList() {
  const [sortBy, setSortBy] = useState<'name' | 'category'>("name")
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

  return (
    <>
      <h1 className="text-4xl mb-5">Sort by: <span className=" font-bold text-blue-300">{sortBy}</span></h1>
      <div>
        {sortItems.map((item, index) => (
          <Item key={index} name={item.name} quantity={item.quantity} category={item.category} />
        ))}
      </div >
      <div className=" flex flex-1 flex-row justify-around  ">
        <button onClick={() => setSortBy('name')} className={` h-15 rounded-2xl hover:bg-black hover:text-white cursor-pointer ${sortBy === "name" ? " bg-blue-100 text-black w-50" : "bg-amber-50 text-black w-30"} `}> name</button >
        <button onClick={() => setSortBy('category')} className={` h-15 rounded-2xl  hover:bg-black hover:text-white cursor-pointer ${sortBy === "category" ? " bg-blue-100 text-black w-50 " : "bg-amber-50 text-black w-30"} `}>category</button>
      </div>
    </>
  );
}

export default ItemList;