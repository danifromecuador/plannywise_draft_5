// following functions will be used by src/zustand/stores.js
import { TodoStore } from "../zustand/stores"
const getDate = () => {
  const date = new Date()
  const index = [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    (date.getDate()).toString().padStart(2, '0'),
    (date.getHours()).toString().padStart(2, '0'),
    (date.getMinutes()).toString().padStart(2, '0'),
    (date.getSeconds()).toString().padStart(2, '0'),
    (date.getMilliseconds()).toString().padStart(3, '0')
  ]
  return Number(index.join(""))
}

export const addTodo = (set, input) => {
  let todos = TodoStore.getState().todos
  todos.push({ index: getDate(), text: input })
  set({ todos })
}

export const markAsDone = (set, todo) => {
  let dones = TodoStore.getState().dones
  dones.push(todo)
  set({ dones })



  const todos = TodoStore.getState().todos.filter(t => t.index !== todo.index);
  set({ todos });
}

