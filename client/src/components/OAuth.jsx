// eslint-disable-next-line no-unused-vars
import React from 'react'
import { app } from '../firebase';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleclick = async() => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: result.user.displayName, 
          email: result.user.email, 
          photo: result.user.photoURL}),
      })
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log('could not sign in with google',error);
    }
  }
  return (
    <button onClick={handleGoogleclick} type='button' 
    className='bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95'>continue with google</button>
  )
}
