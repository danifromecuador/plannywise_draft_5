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
  set({ todos: sortList(todos) })
}

export const markAsDone = (set, todo) => {
  TodoStore.getState().dones.push(todo)
  set({ dones: sortList(TodoStore.getState().dones) })
  const todos = TodoStore.getState().todos.filter(t => t.index !== todo.index)
  set({ todos: sortList(todos) });
}

export const unMarkAsDone = (set, todo) => {
  TodoStore.getState().todos.push(todo)
  set({ todos: sortList(TodoStore.getState().todos) })
  const dones = TodoStore.getState().dones.filter(d => d.index !== todo.index)
  set({ dones: sortList(dones) })
}

// sort todos or dones list by index
const sortList = (list) => list.sort((a, b) => a.index - b.index)
