import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Nav from './components/Nav';
import './globals.css'
import './App.css'

const App = () => {

  const [theme, settheme] = useState('light')

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