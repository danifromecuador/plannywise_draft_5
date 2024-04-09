// src/zustand/stores.js
import { create } from 'zustand';
import { getTime, formatTime, previousAlarmInterval, nextAlarm, updateAlarmStore } from '../alarm/alarm_logic.js'
import { addTodo, markAsDone, unMarkAsDone } from '../todo/todo_logic.js'

export const alarmStore = create((set) => ({
  time: getTime(),
  timeFormatted: formatTime(),
  currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,
  previousAlarmInterval: previousAlarmInterval(),
  nextAlarm: nextAlarm(),
  updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
  updateAlarmStore: () => set(updateAlarmStore())
}))
////////////////////////////////////////////////////////////////////
export const TodoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  dones: JSON.parse(localStorage.getItem("dones")) || [],
  addTodo: (input) => addTodo(set, input),
  markAsDone: (todo) => markAsDone(set, todo),
  unMarkAsDone: (todo) => unMarkAsDone(set, todo)
}))
