"use client"
import { ReactEventHandler, useState } from "react";
type ItemProps = {
  id: string,
  name: string;
  quantity: number;
  category: string;
};
function NewItem({ onAddItem, }: { onAddItem: (item: ItemProps) => void; }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("product")
  const [nameTouched, setNameTouched] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || name.length < 2) {
      alert("Error: Item name must be at least 2 characters long.")
      setNameTouched(true);

      return;
    }
    const item = {
      id: crypto.randomUUID(),
      name: name.trim(),
      quantity: quantity,
      category: category,
    };
    onAddItem(item);
    // console

    //reset the variable
    setName("");
    setQuantity(1);
    setCategory("product");
    setNameTouched(false);
  }
  return (
    <>

      <div className="h-100 flex  bg-gray-100">
        <form action="submit" className=" flex flex-col gap-5 bg-white p-8 rounded-xl shadow-lg w-100 h-100 ">
          <h1 className=" text-black text-center text-2xl font-bold">Add New Item</h1>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Item Name"
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            required
            /* Notice the backticks wrap the entire string */
            className={`p-2 rounded text-black border ${(name === "" || name.length < 2) && nameTouched
              ? "border-red-500 bg-red-50"
              : "border-gray-300"
              }`}

          />
          {(name === "" || name.length < 2) && nameTouched && (
            <p className="text-red-500 text-xs mt-1 font-medium italic">Name is required</p>
          )}
          <input type="number" name="number" min={1} max={99} value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }} required className="border p-2 rounded text-black" />
          <select name="category"
            onChange={(e) => setCategory(e.target.value)} required
            id="" className="border p-2 rounded text-black">
            <option value="product">Product</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozenFoods">FrozenFoods</option>
            <option value="cannedGoods">CannedGoods</option>
            <option value="dryGoods">DryGoods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
          <button
            type="submit" onClick={handleSubmit}
            disabled={name === "" || name.length < 2}
            className={`border p-2 rounded text-black transition-colors
              ${(name === "" || name.length < 2)
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-lime-500 cursor-pointer bg-white"
              }`}
          >
            Add Item
          </button>
        </form>

      </div >
    </>

  );
}
export default NewItem;