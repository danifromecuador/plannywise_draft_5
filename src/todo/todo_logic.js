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
  let sortTodos = sortList(todos)
  set({ todos: sortTodos })
}

export const markAsDone = (set, todo) => {
  // add todo to dones list
  let dones = TodoStore.getState().dones
  dones.push(todo)
  let sortDones = sortList(dones)
  set({ dones: sortDones })

  // delete todo from todos list
  const todos = TodoStore.getState().todos.filter(t => t.index !== todo.index)
  let sortTodos = sortList(todos)
  set({ todos: sortTodos });
}

export const unMarkAsDone = (set, todo) => {
  // add todo to todos list
  let todos = TodoStore.getState().todos
  todos.push(todo)
  let sortTodos = sortList(todos)
  set({ todos: sortTodos })

  // delete todo from dones list
  const dones = TodoStore.getState().dones.filter(d => d.index !== todo.index)
  let sortDones = sortList(dones)
  set({ dones: sortDones })
}

const sortList = (list) => {
  list.sort((a, b) => a.index - b.index)
  return list
}