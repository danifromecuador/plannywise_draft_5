// src/alarm/Alarm.jsx
import { useState, useEffect } from 'react'
import { useStore } from '../zustand/store'

export const Alarm = () => {
  const { currentDate, updateCurrentDate } = useStore()
  let [currentDateFormatted, updateCurrentDateFormatted] = useState({ h: "", m: "", s: ""})
  let [message, setMessage] = useState("")
  let [minutesInterval, setMinutesInterval] = useState(15)
  let [nextAlarmMessage, setNextAlarmMessage] = useState("")

  // format currentDate to transform from this: 9:7:0 to this: 09:07:00
  const formatCurrentDate = () => {
    currentDate.h < 10 ? currentDateFormatted.h = `0${currentDate.h}` : currentDateFormatted.h = currentDate.h;
    currentDate.m < 10 ? currentDateFormatted.m = `0${currentDate.m}` : currentDateFormatted.m = currentDate.m;
    currentDate.s < 10 ? currentDateFormatted.s = `0${currentDate.s}` : currentDateFormatted.s = currentDate.s;
  }

  // 
  const alarmWillSoundEachMinutes = (minutesInterval) => {
    if (currentDate.s % minutesInterval == 0) setMessage("alarm is playing")
    else setMessage("wait")
  }

  const nextAlarmWillSoundAt = () => {
    const remainder = currentDate.s % minutesInterval;
    const nextMinute = currentDate.s + (minutesInterval - remainder);
    const nextAlarmMinute = nextMinute >= 60 ? 0 : nextMinute;

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
    formatCurrentDate()
  }, [currentDate])

  return (
    <div className="alarm">
      <div className="alarm-local-hour">
        {currentDateFormatted.h} : {currentDateFormatted.m} : {currentDateFormatted.s}
      </div>
      <div className="alarm-setted-interval-indicator">
        The alarm will sound every {minutesInterval} minutes
      </div>
      <div className="alarm-next-time-indicator">
        Next alarm will sound at {currentDate.h} : {currentDate.m} : {nextAlarmMessage}
      </div>
      <div className="alarm-config">
        <details>
          <summary>Change interval</summary>
          {[5, 10, 15, 20, 30, 60].map(i => <div key={i} onClick={() => setMinutesInterval(i)}>{i}</div>)}
        </details>
      </div>
      <div>{message}</div>
    </div>
  )
}