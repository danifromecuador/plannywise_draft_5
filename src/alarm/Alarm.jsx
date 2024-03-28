// src/alarm/Alarm.jsx
import { useState, useEffect } from 'react'
import { useStore } from '../zustand/store'

// time       is a variable type object from the store that shows the current local time
// updateTime is a function from the store that updates the time (this function is called each second)
//            other way the time will be static
// h, m, s    are the keys of the time object that represent the hours, minutes, and seconds 
export const Alarm = () => {
  const { time, updateTime } = useStore()
  let [timeFormatted, setTimeFormatted] = useState({ h: time.h, m: time.m, s: time.s })
  let [alarmStatusMessage, setAlarmStatusMessage] = useState("")
  let [minutesInterval, setMinutesInterval] = useState(15)
  let [nextAlarmMessage, setNextAlarmMessage] = useState("")

  // format time to transform from 9:17:0 to 09:17:00 only for visual purposes
  const formatTime = () => {
    setTimeFormatted({
      h: time.h.toString().padStart(2, '0'),
      m: time.m.toString().padStart(2, '0'),
      s: time.s.toString().padStart(2, '0')
    })
  }

  const alarmWillSoundEach = () => {
    if (time.s % minutesInterval == 0) setAlarmStatusMessage("alarm is playing")
    else setAlarmStatusMessage("wait")
  }

  // TODO check if it is working with 60 minutes
  const nextAlarmWillSoundAt = () => {
    const remainder = time.s % minutesInterval;
    const nextMinute = time.s + (minutesInterval - remainder);
    const nextAlarmMinute = nextMinute >= 60 ? 0 : nextMinute;

    setNextAlarmMessage(nextAlarmMinute.toString().padStart(2, '0'));
  }

  // update time each second, other way the time will be static
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTime()
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // run these functions each time that `time` is updated
  useEffect(() => {
    alarmWillSoundEach()
    nextAlarmWillSoundAt()
    formatTime()
  }, [time])

  return (
    <div className="alarm">
      <div className="alarm-h-m-s">
        {timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}
      </div>
      <div className="alarm-setted-interval-indicator">
        The alarm will sound each {minutesInterval} minutes
      </div>
      <div className="alarm-next-time-indicator">
        Next alarm will sound at {time.h} : {time.m} : {nextAlarmMessage}
      </div>
      <div className="alarm-config">
        <details>
          <summary>Change minutes interval</summary>
          {[5, 10, 15, 20, 30, 60].map(i => <div key={i} onClick={() => setMinutesInterval(i)}>{i}</div>)}
        </details>
      </div>
      <div>{alarmStatusMessage}</div>
    </div>
  )
}