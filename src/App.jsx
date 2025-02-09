import * as React from 'react'
import { CiSquarePlus, CiSquareMinus} from "react-icons/ci";
import { IoIosCheckmark ,IoIosClose } from "react-icons/io";


import './App.css'


// Instead of a single data object, the initial state is an array.
const initialTodos = [];

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const newTodo = { task: action.payload, isCompelete: false };
      return [...state, newTodo];
    }
    case 'REMOVE': {
      return state.filter(todo => todo.task !== action.payload.task);
    }
    default:
      return state;
  }
}

function App() {
  const [isDark, setIsDark] = React.useState(false)

  const [inputTerm, setInputTerm] = React.useState('')



  // Use the reducer to manage the entire todos list
  const [todos, dispatchTodos] = React.useReducer(todosReducer, initialTodos)




  const inputHandler = React.useCallback((e) => {
    setInputTerm(e.target.value)
  }, [])


  const submit = React.useCallback((e) => {
    e.preventDefault()
    
    // Dispatch an action to add a new todo
    dispatchTodos({ type: 'ADD', payload: inputTerm })
    
    // Clear the input field
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
  const removeTodo = (itemToDelete) => {
    dispatchTodos({ type: 'REMOVE', payload: itemToDelete })
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
      <button type='submit' disabled={!term}>
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
