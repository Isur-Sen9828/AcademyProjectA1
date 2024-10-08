import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/Listingitem";


export default function Search() {
    const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'created_at',
    order: 'desc',
  });

    const[loading, setLoading] = useState(false);
    const[listings, setListings] = useState([]);
    
    console.log(sidebarData);
    console.log(listings);

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

        const fetchListings = async() => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        };

        fetchListings();
        },[location.search]);


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
        navigate(`/search?${searchQuery}`);
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
                    className="border rounded-lg p-3 w-full"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                     />
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
        <div className="flex-1">
            <h1 className="font-semibold text-xl border-b p-3 text-slate-700 mt-5 ">
                Search Results:</h1>
                <div className="text-xl flex flex-wrap gap-4">
                    
                {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
              </div>
        </div>
    </div>
  )
}
