import { alarmStore } from '../zustand/stores.js'
import { TaskStore } from '../zustand/stores.js'
import './Task.css'

export const Task = () => {
  const taskStore = TaskStore()
  const AlarmStore = alarmStore()
  return (
    <div className="tasks">
      <h1>Task Tracker</h1>
      <div className="worked-hours">
        worked hours:&nbsp;&nbsp;
        <span className='worked-hours-counter'>
          {taskStore.workedHours}
        </span>
      </div>
      <ul className={taskStore.tasks.length === 0 ? "hide" : ""}>
        {taskStore.tasks.map((task) => (
          <li key={task.date} className='task'>{task.text}</li>
        ))}
      </ul>
      <div className='input-and-button'>
        <button>
          Reset Todays Progress
        </button>
        <div className='previous-interval-and-input'>
          <div className="previous-interval">
            {AlarmStore.previousAlarmInterval.min.h} : {AlarmStore.previousAlarmInterval.min.m} - {AlarmStore.previousAlarmInterval.max.h} : {AlarmStore.previousAlarmInterval.max.m}
          </div>
          <input
            type="text"
            placeholder="Type a completed task and press Enter"
          />
        </div>
      </div>
    </div>
  )
}