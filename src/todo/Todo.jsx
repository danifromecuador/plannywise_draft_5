import { useState, useEffect } from 'react'
import { TodoStore } from '../zustand/stores.js'
import './Todo.css'

export const Todo = () => {
  const todoStore = TodoStore()
  const [input, setInput] = useState("")

  const handleInputChange = (e) => setInput(e.target.value)

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter" && input[0] !== " ") {
      todoStore.addTodo(input)
      setInput("")
    }
  }



  return (
    <div className="todo">
      <h1>Today's Goals</h1>
      <ul>
        {todoStore.todos.map((todo) => (
          <li key={todo.date} className='to-do' onClick={() => todoStore.markAsDone(todo.date)}>{todo.text}</li>
        ))}
        {todoStore.dones.map((todo) => (
          <li key={todo.date} className='done' onClick={() => todoStore.markAsDone(todo.date)}>{todo.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Type a goal and press Enter"
          value={input}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleEnterKeyDown(e)}
        />
      </div>
    </div>
  )
}