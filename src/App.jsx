import React from 'react'

import Hero from './components/Hero';
import Demo from './components/Demo';

import './App.css'

const App = () => {
  return (
    <main>
      <div classname="main">
        <div classname="gradient"></div>
      </div>
        
      <div className ="app">
        <Hero />
        <Demo />
      </div>
    </main>
  )
}

export default App

{
  //import two pages Hero and Demo
}