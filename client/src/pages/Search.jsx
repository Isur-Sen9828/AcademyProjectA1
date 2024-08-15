import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'created_at',
        order: 'desc',
    });

    useEffect (() =>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }
        }, [location.search]);


    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({...sidebarData, sort,order});
        }
    };
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?/${searchQuery}`);
    };


  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">
                    Search Term: 
                    </label>
                    <input type="text"
                    id="searchTerm"
                    placeholder="Search.."
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className="border rounded-lg p-3 w-full" />
                </div>
                
                <div className="flex items-center gap-2">
                    <label htmlFor="">Sort:</label>
                    <select onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    id="sort_order"
                    className="border rounded-lg p-3">
                        <option value="Price_desc">Price high to low</option>
                        <option value="Price_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
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
