import {logo} from '../assets';

import React from 'react'

const Hero = () => {
  return (
    <header className="w-full flex
    justify-center items-center flex-col">
        <nav className='flex justify-between
        items-center w-full mb-10 pt-3 flex-row'>
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

        <h1 className ='head_text'>
            Suumaruze with <br
            className='max-md:hidden'/>
            <span className='orange_gradient'>OpenAI 
                GPT-4</span>
        </h1>
        <h2 className='desc'>
            Simplfy content with website,
            Developed by Paul Zhang
        </h2>
    </header>
  )
}

export default Hero