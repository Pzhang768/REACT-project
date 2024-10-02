import React from 'react'
import './Nav.css'

import { AcademicCapIcon } from "@heroicons/react/24/outline";

import logo_light from '/assets/logo-black.png'
import logo_dark from '/assets/logo-white.png'
import search_icon_light from '/assets/search-w.png'
import search_icon_dark from '/assets/search-b.png'
import toogle_light from '/assets/night.png'
import toogle_dark from '/assets/day.png'

const Nav = ({theme, setTheme}) => {
  const toggle_mode = () => {
    theme == 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
    <div className="navbar ">
        <img src={theme == 'light' ? logo_light : logo_dark} alt = "" className='logo'/>
        <ul>
            <li>Home</li>
            <li>User</li>
            <li>About</li>
        </ul>
        <div className='search-box'>
            <input type="text" placeholder='Search'/>
            <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt="" className='search-icon'/>
        </div>
        <img onClick={() => {toggle_mode()}} src={theme == 'light' ? toogle_light : toogle_dark} 
        alt="" className='toggle-icon'/>

        <button
            type="button"
            onClick={()=>window.open('https://github.com/Pzhang768/AI_wonder')}
            className="black_btn"
        >
            Github
        </button>
    </div>
  )
}

export default Nav