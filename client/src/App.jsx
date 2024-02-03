
import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import FooterComp from './Component/Footer'
import Header from './Component/Header'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Project from './Pages/Project'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'


function App() {


  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/project' element={<Project/>} />
      


    </Routes>
 <FooterComp />
    </BrowserRouter>
    </>
  )
}

export default App
