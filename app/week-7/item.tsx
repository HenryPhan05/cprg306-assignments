import React from "react";


interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  console.log(`${name}, ${quantity}, ${category}`);
  return (
    <div onClick={onSelect} className="w-full sm:w-72 md:w-96 lg:w-300 h-40 flex flex-col gap-3  mb-5 p-3 rounded-md cursor-pointer hover:opacity-50 transition">

      <div className="   w-full sm:w-72 md:w-96 lg:w-300 h-40 flex flex-col gap-3 border-2 mb-5 p-3 rounded-md" >
        <h2 className="text-lg md:text-3xl font-semibold">{name}</h2>
        <h2 className="text-base md:text-2xl">Quantity: {quantity}</h2>
        <h2 className="text-base md:text-2xl">Category: {category}</h2>
      </div>

    </div>
  )
}
//export default Item;