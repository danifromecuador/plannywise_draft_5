// src/zustand/store.js

import { create } from 'zustand'

const getLocalTime = () => {
  const currentDate = new Date()

  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1, // because January=0
    dayOfMonth: currentDate.getDate(),
    dayOfWeek: currentDate.getDay(),
    hour: currentDate.getHours(),
    minute: currentDate.getMinutes(),
    second: currentDate.getSeconds()
  }
}

export const useStore = create(() => ({
  currentDate: getLocalTime(),
}))
