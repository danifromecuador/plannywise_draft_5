import { TaskStore } from "../zustand/stores"

const taskWasCompleted = (interval) => {
  let previousInterval = TaskStore.getState().tasks.length > 0 ? TaskStore.getState().tasks[TaskStore.getState().tasks.length - 1].interval : "none"
  console.log([JSON.stringify(previousInterval), JSON.stringify(interval)])
  console.log(JSON.stringify(previousInterval) === JSON.stringify(interval))
  return JSON.stringify(previousInterval) === JSON.stringify(interval)
}

export const addTask = (set, interval, input) => {
  if (taskWasCompleted(interval) === false) {
    set(() => ({
      tasks: [...TaskStore.getState().tasks, {
        interval: { minH: interval.minH, minM: interval.minM, maxH: interval.maxH, maxM: interval.maxM },
        text: input
      }]
    }))
  }
}