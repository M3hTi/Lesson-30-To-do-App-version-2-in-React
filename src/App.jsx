import * as React from 'react'
import { CiSquarePlus, CiSquareMinus} from "react-icons/ci";
import { IoIosCheckmark ,IoIosClose } from "react-icons/io";


import './App.css'


function reducer(state, action){
  switch (action.type) {
    case 'ADD':
      return {task: action.payload, isCompelete: false}
    case 'REMOVE':
      return {task: action.payload, isCompelete: true}
    default:
      return state
  }
}

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [inputTerm, setInputTerm] = React.useState('')



  const [todos, setTodos] = React.useState([])




  const data = {
    task: '',
    isCompelete: false
  }


  const [todo, dispatchTodo] = React.useReducer(reducer ,data)



  const inputHandler = React.useCallback((e) => {
    const newValue = e.target.value
    setInputTerm(newValue)
  },[inputTerm])


  const submit = React.useCallback((e) => {
    e.preventDefault()
    // Use inputTerm directly instead of waiting for confirmSubmit to update.
    dispatchTodo({ type: 'ADD', payload: inputTerm })
    
    // Append the new task to the todos list (using functional update for safety)
    setTodos(prevTodos => [...prevTodos, { task: inputTerm, isCompelete: false }])
    
    // Clear the input field if desired
    setInputTerm('')

    
    // Note: console.log(todos) right here might print the old state because state updates are asynchronous.
  }, [inputTerm])

  React.useEffect(() => {
    if(isDark){
      document.body.classList.add('dark_mode')
    }else{
      document.body.classList.remove('dark_mode')
    }
  },[isDark])

  const toggle = React.useCallback(() => setIsDark(state => !state),[])



  // removeTodo: Removes the todo item from the todos array
  function removeTodo(itemToDelete) {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.task !== itemToDelete.task)
    );
  }

  return (
    <>
      <Header isDark={isDark} onToggle={toggle} />
      <SearchForm term={inputTerm} onInputHandler={inputHandler} onConfirm={submit} />
      <List items={todos} onRemoval={removeTodo} />
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



function List({items, onRemoval}){
  return(
    <div className='container'>
      {items.map((item,index) => {
        return(
          <Item item={item} key={index} removeItem={onRemoval} />
        )
      })}
    </div>
  )
}


function Item({item, removeItem}) {
  const {task, isCompelete} = item
  return(
    <div className='todo-container'>
      <span>{task}</span>
      <span>
        compelete: {isCompelete ? (<IoIosCheckmark />) : (<IoIosClose />)}
      </span>
      <span>
        <button onClick={() => removeItem(item)}>
        <CiSquareMinus />
        </button>
      </span>
    </div>
  )
}

export default App
