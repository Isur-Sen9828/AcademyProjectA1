/* eslint-disable no-unused-vars */
import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-500'>Ivon</span>
            <span className='text-slate-700'>Academy</span>
        </h1>
        <form action="">
            <input type="text" placeholder="Search.." />
        </form>
    </header>
  )
}
