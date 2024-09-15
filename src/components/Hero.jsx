import {logo} from '../assets';

import React from 'react'

const Hero = () => {
  return (
    <header className="w-full flex
    justify-center items-center flex-col">
        <nav className='flex justify-between
        items-center flex-col'>
            <img src={logo} alt="sumz_logo"
            className="w-28"/>
        
        <button
            type="button"
            onClick={()=>window.open('https://github.com/Pzhang768/AI_wonder')}
            className="black_btn"
        >
            Github
        </button>
        </nav>
    </header>
  )
}

export default Hero