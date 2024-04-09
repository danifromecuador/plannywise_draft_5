// following functions will be used by src/zustand/stores.js
import { TodoStore } from "../zustand/stores"
const getDate = () => {
  const date = new Date()
  const index = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ]
  return Number(index.join(""))
}

export const addTodo = (set, input) => set({ todos: [...TodoStore.getState().todos, { index: getDate(), text: input }] })

export const markAsDone = (set, todo) => {
  let todos = TodoStore.getState().todos
  for (let i = 0; i < todos.length; i++) {
    if (todo.index === todos[i].index) {
      todos.splice(i, 1)
    }
  }
  set({ todos })
}


