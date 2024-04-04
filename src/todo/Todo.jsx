import { useState } from 'react'
import { todoStore } from '../zustand/stores.js'
import './Todo.css'

export const Todo = () => {
  const { todos, dones, addTodo, markAsDone, updateTodoStore } = todoStore()
  const [input, setInput] = useState("")

  const handleInputChange = (e) => setInput(e.target.value)

  const handleEnterKeyDown = (k) => {
    if (k.key === "Enter" && input[0] !== " ") {
      addTodo(input)
      setInput("")
    }    
  }

  return (
    <div className="todo">
      <h1>Today's Goals</h1>
      <ul>
        {todos.map((e, i) => (
          <li key={i} className='to-do'>{e.text}</li>
        ))}
        {dones.map((e, i) => (
          <li key={i} className='done'>{e.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Type a goal and press Enter"
          value={input}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(k) => handleEnterKeyDown(k)}
        />
      </div>
    </div>
  )
}