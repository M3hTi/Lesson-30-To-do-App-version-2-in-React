import * as React from 'react'
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";


import './App.css'

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [inputTerm, setInputTerm] = React.useState('')

  const [confirmSubmit, setConfirmSubmit] = React.useState('')


  



  const inputHandler = React.useCallback((e) => {
    const newValue = e.target.value
    setInputTerm(newValue)
  },[inputTerm])


  const submit = React.useCallback((e) => {
    e.preventDefault()
    setConfirmSubmit(inputTerm)
  },[inputTerm])

  React.useEffect(() => {
    if(isDark){
      document.body.classList.add('dark_mode')
    }else{
      document.body.classList.remove('dark_mode')
    }
  },[isDark])

  const toggle = React.useCallback(() => setIsDark(state => !state),[])
  return (
    <>
      <Header isDark={isDark} onToggle={toggle} />
      <SearchForm term={inputTerm} onInputHandler={inputHandler} onConfirm={submit} />
    </>
  )
}


function Header({isDark, onToggle}) {
  return(
    <div className='header'>
      <h1>Todo App</h1>
      <button className='btn pad-8' onClick={onToggle}>
        {isDark ? 'Switch to Light mode ☀️': 'Switch to Dark mode 🌙'}
      </button>
    </div>
  )
}

function SearchForm({term, onInputHandler, onConfirm}){
  return(
    <form className='form' onSubmit={onConfirm}>
      <input type="text" placeholder="pls enter todo" value={term} onChange={onInputHandler} />
      <button type='submit'>
      <CiSquarePlus />
      </button>
    </form>
  )
}

export default App
