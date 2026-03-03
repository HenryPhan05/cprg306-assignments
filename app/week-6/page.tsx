"use client"
import { useState } from "react";
import Link from "next/link";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
type ItemProps = {
  id: string,
  name: string;
  quantity: number;
  category: string;
};
function Page() {

  const [items, setItems] = useState<ItemProps[]>(itemsData);
  const handleAddItem = (NewItem: ItemProps) => {
    setItems((prevItems) => [...prevItems, NewItem]);
  };
  return (
    <main className="justify-center items-center">
      <div className="flex flex-row justify-center mt-10 gap-10 ">
        <NewItem onAddItem={handleAddItem} />
        <div className="mb-10 bg-orange-950 p-10 rounded-4xl">
          <h1 className="text-5xl font-bold mb-10 mt-5 text-center ">Shopping List</h1>
          <ItemList items={items} />
        </div>
      </div>
      <Link
        className=" mb-10 text-1xl p-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px] "
        href="/"

        rel="noopener noreferrer"
      >


        Home Page      </Link>
    </main>
  )
}
export default Page;