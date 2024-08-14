
export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                <label htmlFor="" className="whitespace-nowrap">
                    Search Term: 
                    </label>
                    <input type="text"
                    id="searchTerm"
                    placeholder="Search.."
                    className="border rounded-lg p-3 w-full" />
                </div>
                
                <div className="flex items-center gap-2">
                    <label htmlFor="">Sort:</label>
                    <select id="sort_order"
                    className="border rounded-lg p-3">
                        <option value="">Price high to low</option>
                        <option value="">Price low to high</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className="bg-slate-700 uppercase text-white p-3 rounded-lg hover:opacity-95"> search</button>
                </form>
        </div>
        <div>
            <h1 className="font-semibold text-xl border-b p-3 text-slate-700 mt-5 ">Search Results..</h1>
        </div>
    </div>
  )
}
