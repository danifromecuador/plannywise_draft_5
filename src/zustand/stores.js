// src/zustand/stores.js
import { create } from 'zustand';
import { getTime, formatTime, previousAlarmInterval, nextAlarm, updateAlarmStore } from '../alarm/alarm_logic.js'
// import { todos, dones, addTodo, markAsDone } from '../todo/todo_logic.js'

export const alarmStore = create((set) => ({
  time: getTime(),
  timeFormatted: formatTime(),
  currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,
  previousAlarmInterval: previousAlarmInterval(),
  nextAlarm: nextAlarm(),
  updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
  updateAlarmStore: () => set(updateAlarmStore())
}))



/////////////////////////////////////////////////////////////////////////////////////////
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

const addTodo = (set, input) => {
  TodoStore.getState
  set({ todos: [...TodoStore.getState().todos, { index: getDate(), text: input }] })
}

const markAsDone = (todo) => {
console.log(todo);
}












export const TodoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  dones: [],
  addTodo: (input) => addTodo(set, input),
  markAsDone: (todo) => markAsDone(todo)
}))
