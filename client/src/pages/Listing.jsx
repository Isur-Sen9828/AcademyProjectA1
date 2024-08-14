// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'Swiper/react';
import SwiperCore from 'Swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';


export default function Listing() {
  SwiperCore.use(Navigation);
  const[listing, setListing] = useState(null);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(false);
  const params = useParams();

  useEffect(()=>{
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchListing();
  },[params.listingId]);

  return (
    <main>
      {loading && <p className='text-center font-semibold'>Loading...</p> }
      {error && <p className='text-center font-semibold text-red-700'>Something went wrong...</p> }
      {listing && !loading && !error &&(
        <div className="">
        
          <Swiper navigation>
          {listing.imageURLs.map((url) => (
          
          <SwiperSlide key={url}>
            <div className="h-[500px]" 
            style={{background:`url(${url}) center no-repeat`,backgroundSize:'cover',}}
            ></div>
            </SwiperSlide>
          ))}
          </Swiper>
          
          <div className='flex gap-2 flex-col text-center flex-wrap'>
            <p className='font-semibold text-slate-600 uppercase center'>{listing.name}  ${listing.price}  ({listing.duration} mo.)</p>
          <p></p>
          
          <span className='font-semibold text-black'>
          Description -
          </span>
          <p className=''> {listing.description}</p>
          </div>
          </div>
      )}
      </main>
  );
}
