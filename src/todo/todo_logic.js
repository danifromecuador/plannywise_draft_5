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
  TodoStore.getState
  set({ todos: [...TodoStore.getState().todos, { index: getDate(), text: input }] })
}

export const markAsDone = (todo) => {
console.log(todo);
}


