import {TaskStore} from '../zustand/stores.js'
import './Task.css'

export const Task = () => {
  const taskStore = TaskStore()
  return (
    <div className="task">
      {taskStore.tasks}
    </div>
  )
}