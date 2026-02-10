import React from "react";
import ItemList from "./item-list";
import tailwindcss from "@tailwindcss/vite";
interface ItemProps {
  name: string;
  quantity: number;
  category: string;
}

export default function Item({ name, quantity, category }: ItemProps) {
  console.log(`${name}, ${quantity}, ${category}`);
  return (
    <>

      <div className="w-300 h-40 flex flex-col gap-3 border-2 mb-5 p-3 " >
        <h2 className="text-3xl">{name}</h2>
        <h2 className="text-3xl">Quantity: {quantity}</h2>
        <h2 className="text-3xl">Category: {category}</h2>
      </div>

    </>
  )
}
//export default Item;