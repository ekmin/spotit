import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between flex-wrap bg-secondary-color p-4 bg-fixed'>
        <Link href="/" className='md:text-3xl text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-violet-500  transition duration-300 ease-in-out hover:scale-110'>SPOTIT</Link>
        <button className='bg-primary-color hover:bg-primary-dark-color hover:rotate-12 transition duration-300 ease-in-out md:w-28 md:h-10 md:text-sm rounded-lg text-xs w-20 h-8'>Sign Up</button>
    </nav>
  )
}

export default Navbar