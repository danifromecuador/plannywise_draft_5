// src/alarm/Alarm.jsx
import { useState, useEffect } from 'react'
import { ztore } from '../zustand/ztore'
import './Alarm.css'

// time       is a variable type object from the store that shows the current local time
// updateTime is a function from the store that updates the time (this function is called each second)
//            other way the time will be static
// h, m, s    are the keys of the time object that represent the hours, minutes, and seconds 
export const Alarm = () => {
  const { time, updateTime, alarmInterval, updateAlarmInterval } = ztore()
  let [timeFormatted, setTimeFormatted] = useState({ h: time.h, m: time.m, s: time.s })
  let [alarmStatusMessage, setAlarmStatusMessage] = useState("")
  let [nextAlarmMessage, setNextAlarmMessage] = useState("")

  // update ztore time each second, other way the time will be static
  useEffect(() => {
    const intervalId = setInterval(() => { updateTime() }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // format ztore time to transform from 9:17:0 to 09:17:00 only for visual purposes
  // this change will not affect ztore time, because this change will be setted in
  // timeFormatted, so this way, ztore time can be used to math operations
  const formatTime = () => {
    setTimeFormatted({
      h: time.h.toString().padStart(2, '0'),
      m: time.m.toString().padStart(2, '0'),
      s: time.s.toString().padStart(2, '0')
    })
  }

  const alarmWillSoundEach = () => time.s % alarmInterval == 0 ? setAlarmStatusMessage("playing") : setAlarmStatusMessage("wait")
  

  // TODO check if it is working with 60 minutes
  // calculate newt time that the alarm will sound
  const nextAlarmWillSoundAt = () => {
    const remainder = time.s % alarmInterval;
    const nextMinute = time.s + (alarmInterval - remainder);
    const nextAlarmMinute = nextMinute >= 60 ? 0 : nextMinute;

    setNextAlarmMessage(nextAlarmMinute.toString().padStart(2, '0'));
  }

  // run these functions each time that ztore time is updated (each second)
  useEffect(() => {
    formatTime()
    alarmWillSoundEach()
    nextAlarmWillSoundAt()
  }, [time])

  return (
    <div className="alarm">
      <div className="alarm-h-m-s">
        <span>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
        <span>{alarmStatusMessage}</span>
      </div>
      <div className="alarm-setted-interval-indicator">
        <span>The alarm will sound</span>
        <span>each {alarmInterval} minutes</span>
      </div>
      <div className="alarm-config">
        <details>
          <summary>Change interval</summary>
          {[5, 10, 15, 20, 30, 60].map(i => <div key={i} onClick={() => updateAlarmInterval(i)}>{i}</div>)}
        </details>
      </div>
      <div className="alarm-next-time-indicator">
        <span>Next alarm will sound</span>
        <span>at {timeFormatted.h} : {timeFormatted.m} : {nextAlarmMessage}</span>
      </div>
    </div>
  )
}