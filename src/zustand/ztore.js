import { create } from 'zustand';
import {getTime, formatTime, updateZtore} from './logic.js'

export const ztore = create((set) => ({
  // set initial values
    time: getTime(),
    timeFormatted: formatTime(),
    currentAlarmInterval: JSON.parse(localStorage.getItem("currentAlarmInterval")) || 15,

    // update values
    updateCurrentAlarmInterval: (newCurrentAlarmInterval) => set({ currentAlarmInterval: newCurrentAlarmInterval }),
    updateZtore: () => set(updateZtore())
}))
