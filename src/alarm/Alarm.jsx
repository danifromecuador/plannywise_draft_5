// src/alarm/Alarm.jsx

import { useStore } from '../zustand/store'

export const Alarm = () => {
  const { currentDate } = useStore()

  const updateTime = () => {
    console.log(currentDate);
  }

  return (
    <div className="alarm">
      local hour is {currentDate.hour} : {currentDate.minute} : {currentDate.second}
      <button onClick={updateTime} >Update Time</button>
    </div>
  )
}