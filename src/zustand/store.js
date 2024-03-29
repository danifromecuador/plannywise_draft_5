// src/zustand/store.js
import { create } from 'zustand'

const getTime = () => {
  const time = new Date()

  return {
    y: time.getFullYear(),
    M: time.getMonth() + 1, // because January=0
    D: time.getDate(), // day of month
    d: time.getDay(), // day of week
    h: time.getHours(),
    m: time.getMinutes(),
    s: time.getSeconds()
  }
}

export const useStore = create((set) => ({
  time: getTime(),
  alarmInterval: 15,
  updateTime: () => set({ time: getTime() }),
  updateAlarmInterval: (alarmInterval) => set({alarmInterval})  
}))
