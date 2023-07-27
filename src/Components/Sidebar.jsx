import React, { useState } from 'react';
import "../App.css"
import HomeIcon from '@mui/icons-material/Home';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Link , useLocation} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
export default function Sidebar() {
    const [openNav,setOpenNav]=useState(false)
    const toggleNav=()=>{
        setOpenNav(!openNav)
    }
    console.log(openNav)
    return (
        <div className='Sidebar w-[200px] h-[100%] sm:w-[100%] sm:h-[100px] sm:relative sm:flex sm:justify-between bg-blue-950 fixed'>
        <h1 className='SidebarTitle text-white text-[1.5rem] sm:text-[1.2rem] text-center justify-center'>CRYPTO <span>hub</span></h1>
        <div className="SideHead">

        <MenuIcon className='text-white hidden sm:block' onClick={toggleNav}/>
        <ul className={`SidebarItemList sm:flex sm:flex-col pt-2 ${openNav?"sm:block sm:bg-gray-400 sm:overflow":"sm:hidden"} `}>
            <Link to="/">
            <li className='SidebarItem text-gray-300 flex text-sm items-center sm:text-blue-950 gap-x-4 cursor-pointer p-2 mt-2 hover:text-white'>
               <span  className='text-2xl block float-left'><HomeIcon className='SidebarIcon '/></span> 
                <span className='text-base font-medium flex-1 '>Home </span>
            </li>
            </Link>
            <Link to="/currency">

            <li className='SidebarItem text-gray-300 flex text-sm items-center gap-x-4 cursor-pointer p-2 mt-2 hover:text-white '>
                <span className='text-2xl block float-left'><CurrencyBitcoinIcon/></span>
                <span className='text-base font-medium flex-1 '>Currency </span>
            </li>
            </Link>
            <Link to="/newspage">

            <li className='SidebarItem text-gray-300 flex text-sm items-center gap-x-4 cursor-pointer p-2 mt-2 hover:text-white '>
                <span className='text-2xl block float-left'><NewspaperIcon/></span>
                <span className='text-base font-medium flex-1 '>News </span>
            </li>
            </Link>
            <Link to="/converter">

            <li className='SidebarItem text-gray-300 flex text-sm items-center gap-x-4 cursor-pointer p-2 mt-2 hover:text-white '>
                <span className='text-2xl block float-left'><SwapVertIcon/></span>
                <span className='text-base font-medium flex-1 '>Converter</span>
            </li>
            </Link>
        </ul>
      
        </div>
    </div>
  );
}
