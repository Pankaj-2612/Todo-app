import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-indigo-900 text-white py-2">
        <div className="logo my-2 mx-7">
            <span className="font-bold text-2xl ">iTask</span>
        </div>
        <ul className='flex gap-9 text-xl my-3 mr-10'>
            <li className='cursor-pointer hover:cursor-pointer'>Home</li>
            <li className='cursor-pointer hover:cursor-pointer'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
