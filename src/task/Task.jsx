import { useState, useEffect } from 'react'
import { alarmStore } from '../zustand/stores.js'
import { TaskStore } from '../zustand/stores.js'
import './Task.css'

export const Task = () => {
  const taskStore = TaskStore()
  const AlarmStore = alarmStore()
  const [input, setInput] = useState("")

  const handleEnter = (e) => {
    if (e.key === "Enter" && input[0] !== "") {
      const interval = {
        minH: AlarmStore.previousAlarmInterval.min.h,
        minM: AlarmStore.previousAlarmInterval.min.m,
        maxH: AlarmStore.previousAlarmInterval.max.h,
        maxM: AlarmStore.previousAlarmInterval.max.m
      }
      taskStore.addTask(interval, input)
      setInput("")
    }
  }

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(taskStore.tasks))
  }, [taskStore])


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
        {taskStore.tasks.map((t) => (
          <li key={t.interval} className='task'>{t.interval.minH} : {t.interval.minM} - {t.interval.maxH} : {t.interval.maxM}...{t.text}</li>
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      </div>
    </div>
  )
}