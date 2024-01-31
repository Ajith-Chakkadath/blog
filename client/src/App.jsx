import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/project' element={<Project/>} />
      




    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App