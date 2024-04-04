import { useState, useEffect } from 'react'
import { todoStore } from '../zustand/stores.js'

export const Todo = () => {
  const { todos, dones, addTodo, markAsDone, updateTodoStore } = todoStore()
  const [input, setInput] = useState("")
  const handleInputChange = (e) => setInput(e.target.value)

  const handleEnterKeyDown = (k) => {
    if (k.key === "Enter" && input !== "") {
      addTodo(input)
      updateTodoStore()
      setInput("")
    }
  }

  useEffect(() => {

  }, [])



  return (
    <div className="todo">
      <h1>Today's Goals</h1>
      <ul>
        {todos.map((e, i) => (
          <li key={i}>{e.text}</li>
        ))}
        {dones.map((e, i) => (
          <li key={i}>{e.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder='Type a new goal and press enter'
          value={input}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(k) => handleEnterKeyDown(k)}
        />
      </div>
    </div>
  )
}