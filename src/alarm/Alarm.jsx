// src/alarm/Alarm.jsx

import { useState, useEffect } from 'react'
import { useStore } from '../zustand/store'

export const Alarm = () => {
  const { currentDate, updateCurrentDate } = useStore()
  let [message, setMessage] = useState("")
  let [minutesInterval, setMinutesInterval] = useState(15)
  let [nextAlarmMessage, setNextAlarmMessage] = useState("")

  const alarmWillSoundEachMinutes = (minutesInterval) => {
    console.log(currentDate.second);
    if (currentDate.second % minutesInterval == 0) setMessage("alarm is playing")
    else setMessage("wait")
  }

  const nextAlarmWillSoundAt = () => {
    const remainder = currentDate.second % minutesInterval;
    const nextMinute = currentDate.second + (minutesInterval - remainder);
    const nextAlarmMinute = nextMinute >= 60 ? 0 : nextMinute;
    console.log(remainder, nextMinute, nextAlarmMinute);

    setNextAlarmMessage(nextAlarmMinute.toString().padStart(2, '0'));
  }
  // update date and time (currentDate) each second
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCurrentDate()
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // update next alarm will sound at message each time currentDate changes (each second)
  useEffect(() => {
    alarmWillSoundEachMinutes(minutesInterval)
    nextAlarmWillSoundAt()
  }, [currentDate])

  return (
    <div className="alarm">
      <div className="alarm-local-hour">
        {currentDate.hour < 10 ? `0${currentDate.hour}` : currentDate.hour} : {currentDate.minute < 10 ? `0${currentDate.minute}` : currentDate.minute} : {currentDate.second < 10 ? `0${currentDate.second}` : currentDate.second}
      </div>
      <div className="alarm-setted-interval-indicator">
        The alarm will sound every {minutesInterval} minutes
      </div>
      <div className="alarm-next-time-indicator">
        Next alarm will sound at {currentDate.hour} : {currentDate.minute} : {nextAlarmMessage}
      </div>
      <div className="alarm-config">
        <details>
          <summary>Change interval</summary>
          <div onClick={() => setMinutesInterval(5)}>5</div>
          <div onClick={() => setMinutesInterval(10)}>10</div>
          <div onClick={() => setMinutesInterval(15)}>15</div>
          <div onClick={() => setMinutesInterval(20)}>20</div>
          <div onClick={() => setMinutesInterval(30)}>30</div>
          <div onClick={() => setMinutesInterval(60)}>60</div>
        </details>
      </div>
      <div>{message}</div>
    </div>
  )
}