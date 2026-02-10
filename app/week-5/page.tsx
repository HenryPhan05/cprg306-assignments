import ItemList from "./item-list";
function Page() {
  return (
    <main className="flex flex-col justify-center items-center mt-10 ">
      <div className="mb-10 bg-orange-950 p-10 rounded-4xl">
        <h1 className="text-5xl font-bold mb-10 mt-5 text-center ">Shopping List</h1>
        <ItemList />
      </div>
      <a
        className=" mb-10 text-1xl p-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px] "
        href="/"

        rel="noopener noreferrer"
      >


        Home Page      </a>
    </main>
  )
}
export default Page;