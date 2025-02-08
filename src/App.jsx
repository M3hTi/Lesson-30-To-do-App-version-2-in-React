import * as React from 'react'
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";


import './App.css'

function App() {
  return (
    <>
      <Header />
    </>
  )
}


function Header() {
  return(
    <div className='header'>
      <h1>Todo App</h1>
      <button className='toggle'></button>
    </div>
  )
}

export default App
