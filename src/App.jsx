import React, { useState } from 'react'

import Hero from './components/Hero';
import Demo from './components/Demo';
import Nav from './components/Nav';

import './App.css'

const App = () => {

  const [theme, settheme] = useState('light', 'dark')

  return (
    <main>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <div className='app'>
        <Nav theme={theme} setTheme={settheme}/>
        <Hero/>
        <Demo/>
      </div>
    </main>
  )
}

export default App

{
  //import two pages Hero and Demo
}