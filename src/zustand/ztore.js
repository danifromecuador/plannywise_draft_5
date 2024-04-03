import { create } from 'zustand';
import { getTime, formatTime, previousAlarmInterval, nextAlarm, updateZtore } from '../alarm/alarm_logic.js'

export const ztore = create((set) => ({
  time: getTime(),
  timeFormatted: formatTime(),
  currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,
  previousAlarmInterval: previousAlarmInterval(),
  nextAlarm: nextAlarm(),
  updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
  updateZtore: () => set(updateZtore())
}))
