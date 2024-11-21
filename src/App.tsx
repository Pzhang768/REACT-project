import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Hero from './components/Hero';
import Demo from './components/Demo';
import Nav from './components/Nav';
import './globals.css'
import './App.css'

const App = () => {

  const [theme, settheme] = useState('light')

  return (
  

    <main>
      <Routes>
        {/* public routes */}
      <Route path = "/sign-in" element={<SigninForm />} />
      
      <Route element={<Hero />} />

      {/* private routes */}
      <Route index element={<Home />} />

      </Routes>
    </main>
  )
}

export default App

{
  //import two pages Hero and Demo
}