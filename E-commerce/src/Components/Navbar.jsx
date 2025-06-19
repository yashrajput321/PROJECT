import React from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img src={assets.logo} className="w-36" alt="Logo" />

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            {/* Home */}
            <NavLink to='/' className='hover:text-black-600 hover:underline underline-offset-4 transition-all duration-200 flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            {/* Collection */}
             <NavLink to='/collection' className='hover:text-black-600 hover:underline underline-offset-4 transition-all duration-200 flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            {/* about */}
             <NavLink to='/about' className='hover:text-black-600 hover:underline underline-offset-4 transition-all duration-200 flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>

            {/* Contact */}
             <NavLink to='/contact' className='hover:text-black-600 hover:underline underline-offset-4 transition-all duration-200 flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden ' />
            </NavLink>
        </ul>

    </div>
  )
}

export default Navbar