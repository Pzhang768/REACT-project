import {logo} from '../../public/assets';

import React from 'react'

const Hero = () => {
  return (
    <header className="w-full flex
    justify-center items-center flex-col">
        <nav className='flex justify-between
        items-center w-full mb-10 pt-3 flex-row'>
        
        </nav>

        <h1 className ='head_text'>
            Summarize with <br
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