// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {useSelector} from 'react-redux';



export default function CreateListing() {
  const{currentUser} = useSelector(state => state.user)
  const[files, setFiles] = useState([]);
  const[formData, setFormData] = useState({
    imageURLs: [],
    name:'',
    description:'',
    duration:'',
    price:50,
  });
  const[imageUploadError, setImageUploadError] = useState(false);
  const[uploading, setUploading] = useState(false);
  const[error, setError] = useState(false);
  const[loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length + formData.imageURLs.length < 7){
      const promises = [];

      for(let i=0; i<files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageURLs: formData.imageURLs.concat(urls),
        });
        setImageUploadError(false);
      }).catch((err) => {
        setImageUploadError('Image upload unsuccessfull!')
      });
    }else{
      setImageUploadError('You can only upload six images!')
    }
  };

  const storeImage = async(file) => {
    return new Promise((resolve, reject) =>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uplaodTask = uploadBytesResumable(storageRef,file);
      uplaodTask.on(
        "state_changed",
        (snapshot) => {
        const progress = 
        (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
        console.log(`Upload is ${progress}% done`);
      },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uplaodTask.snapshot.ref).then((getDownloadURL) => {
            resolve(getDownloadURL);
          })
        }
      )
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_, i)=> i !== index), 
    });
  };

  const handleChange = (e) => {
    if(e.target.type === 'number' || 
      e.target.type === 'text' || 
      e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDeafault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData, 
          userRef: currentUser._id
        })
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message);
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className=' p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'> Create A Plan</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-5'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" 
                placeholder='Name' 
                className='border p-3 rounded-lg' id='name' 
                required
                onChange={handleChange}
                value={formData.name}
                />

                <textarea 
                type="text" 
                placeholder='Description' 
                className='border p-3 rounded-lg' 
                id='description' required
                onChange={handleChange}
                value={formData.description}
                />
                <input type="text" placeholder='duration' 
                className='border p-3 rounded-lg' id='duration' 
                required
                onChange={handleChange}
                value={formData.duration}
                />

                <div className='flex items-center gap-2'>
                  <p>Price</p>
                  <input 
                  type="number" 
                  id='price' 
                  required 
                  className='p-3 border border-gray-300 rounded-lg w-20' 
                  onChange={handleChange}
                  value={formData.price}
                  />
                <p>$</p>
                </div>
                </div>

            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'> Images:
              <span className='font-normal text-gray-600 ml-2'>The first image will be the cover</span>
              </p>
              <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)} 
                className='p-3 border border-gray-300 rounded-none w-full' 
                type="file" 
                id='images' 
                accept='image/*' 
                multiple />
                <button type='button' onClick={handleImageSubmit} 
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                  Upload</button>
              </div>
              <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageURLs.length > 0 && formData.imageURLs.map((url,index) => (
                // eslint-disable-next-line react/jsx-key
                <div key={url} className='justify-between flex p-3 border'>
                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg flex-col' />
                <button type='button' 
                onClick={()=>handleRemoveImage(index)} 
                className='p-3 text-red-700 rounded-lg uppercase hover:opacity-70'>Delete</button>
                </div>
              ))
            }
            <button 
            className='p-3 bg-slate-700 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-white'>
              {loading? 'Creating..': 'Create Listing'}
              </button>
              {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
            
            
            
        </form>
    </main>
  )
}
