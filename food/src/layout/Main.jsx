import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../App.css'

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <footer>Footer</footer>
    </div>
  )
}

export default Main
