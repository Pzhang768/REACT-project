import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
//import Hero from './components/Hero';
//import Demo from './components/Demo';
//import Nav from './components/Nav';
import './globals.css'
import './App.css'

import SigninForm from './_auth/_forms/SigninForm';
import SignupForm from './_auth/_forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import { Toaster } from './components/ui/toaster';

const App = () => {

  const [theme, settheme] = useState('light')

  return (

    <main>
      <Routes>
        {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path = "/sign-in" element={<SigninForm />} />
        <Route path = "/sign-up" element={<SignupForm />} />
        
      </Route>

      {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
      </Routes>
      
      <Toaster />
    </main>
  )
}

export default App

{
  //import two pages Hero and Demo
}