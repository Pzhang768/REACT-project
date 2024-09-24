import React from 'react'
import './Nav.css'
import logo_light from '../assets/logo-black.png'
import logo_dark from '../assets/logo-white.png'
import search_icon_light from '../assets/search-w.png'
import search_icon_dark from '../assets/search-w.png'
import toogle_light from '../assets/night.png'
import toogle_dark from '../assets/day.png'

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
            <img src={search_icon_light} alt="" className='search-icon'/>
        </div>
        
        <img onClick={() => {toggle_mode()}} src={toogle_light} alt="" className='toggle-icon'/>
    </div>
  )
}

export default Nav