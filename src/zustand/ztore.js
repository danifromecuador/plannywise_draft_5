import { create } from 'zustand';
import {getTime, formatTime, previousAlarmInterval,updateZtore} from './logic.js'

export const ztore = create((set) => ({
  // set initial values
    time: getTime(),
    timeFormatted: formatTime(),
    currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,
    previousAlarmInterval: previousAlarmInterval(),

    // update values
    updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
    updateZtore: () => set(updateZtore())
}))
