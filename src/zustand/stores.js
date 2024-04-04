// src/zustand/stores.js
import { create } from 'zustand';
import { getTime, formatTime, previousAlarmInterval, nextAlarm, updateAlarmStore } from '../alarm/alarm_logic.js'
import { todos, dones, addTodo, markAsDone } from '../todo/todo_logic.js'

export const alarmStore = create((set) => ({
  time: getTime(),
  timeFormatted: formatTime(),
  currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,
  previousAlarmInterval: previousAlarmInterval(),
  nextAlarm: nextAlarm(),
  updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
  updateAlarmStore: () => set(updateAlarmStore())
}))



export const todoStore = create((set) => ({
  todos: todos,
  dones: dones,
  addTodo: (input) => addTodo(input),
  markAsDone: () => markAsDone(),
  updateTodoStore: () => {
    set(todos)
    set(dones)
  }
}))
