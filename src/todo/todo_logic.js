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

export const addTodo = (set, input) => {
  let todos = TodoStore.getState().todos
  todos.push({ index: getDate(), text: input })
  set({ todos })
}

export const markAsDone = (set, todo) => {
  const todos = TodoStore.getState().todos.filter(t => t.index !== todo.index);
  set({ todos });
}

