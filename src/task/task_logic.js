import { TaskStore } from "../zustand/stores"

export const addTask = (set, interval, input) => {
  // const taskStore = TaskStore()
  set(() => ({
    tasks: [...TaskStore.getState().tasks, {
      interval: { minH: interval.minH, minM: interval.minM, maxH: interval.maxH, maxM: interval.maxM },
      text: input
    }]
  }))
}