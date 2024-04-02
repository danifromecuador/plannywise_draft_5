import { create } from 'zustand';

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

const formatTime = () => {
  const time = getTime()
  return {
    h: time.h.toString().padStart(2, '0'),
    m: time.m.toString().padStart(2, '0'),
    s: time.s.toString().padStart(2, '0')
  }
}

const alarmInterval = () => {
  return {
    current: 15,
  }
}









const updateZtore = () => ({
  time: getTime(),
  timeFormatted: formatTime(),
})

export const ztore = create((set) => ({
  // set initial values
  time: getTime(),
  timeFormatted: formatTime(),
  alarmInterval: alarmInterval(),
  updateAlarmInterval: (alarmInterval) => set({alarmInterval: {current: alarmInterval}}),

  // update values
  updateZtore: () => set(updateZtore())
}))
