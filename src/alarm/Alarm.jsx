// src/alarm/Alarm.jsx
import { alarmStore } from '../zustand/stores.js';
import { useState, useEffect } from 'react';
import alarmSound from '../../public/alarm.wav'
import './Alarm.css'

export const Alarm = () => {
  const { time, timeFormatted, currentAlarmInterval, nextAlarm, updateCurrentAlarmInterval, updateAlarmStore } = alarmStore();
  const [nextAlarmWillSoundAtMessage, setNextAlarmWillSoundAtMessage] = useState("Next will sound at")
  const [hide1, setHide1] = useState("")
  const [hide2, setHide2] = useState("hide")
  const [hide3, setHide3] = useState("")

  // refresh alarmStore every 1000 miliSeconds
  useEffect(() => {
    const intervalId = setInterval(updateAlarmStore, 1000);
    return () => clearInterval(intervalId);
  }, [updateAlarmStore]);

  // save alarmStore state in local storage when alarmStore state changes
  useEffect(() => { localStorage.setItem("currentAlarmInterval", JSON.stringify(currentAlarmInterval)) }, [currentAlarmInterval])

  // verify if the alarm should be played each time that "time" is updated (each second)
  useEffect(() => {
    const audio = new Audio(alarmSound)
    if (time.m % currentAlarmInterval === 0 && time.s === 0) audio.play()
    if (time.m % currentAlarmInterval === 0 && time.s < 8) {
      setNextAlarmWillSoundAtMessage("Alarm is playing right now")
      setHide3("hide")
    }
    else {
      setNextAlarmWillSoundAtMessage("Next will sound at")
      setHide3("")
    }
  }, [time, currentAlarmInterval])

  // show or hide div
  const handleClickAlarmIntervalShow = () => {
    if (hide1 === "") {
      setHide1("hide")
      setHide2("")
    }
    else setHide1("")
  }

  // show or hide div
  const handleClickAlarmIntervalSelect = (i) => {
    setHide2("hide")
    setHide1("")
    updateCurrentAlarmInterval(i)
  }

  return (
    <div className="alarm">
      <div className="alarm-left">
        <span>Current Local Time</span>
        <span className='alarm-time-number'>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
      </div>
      <div className="alarm-center">
        <span>Alarm will sound every</span>
        <span className='alarm-interval-show-and-select'>
          <span className={`alarm-interval-show alarm-time-number ${hide1}`} onClick={handleClickAlarmIntervalShow}>{currentAlarmInterval}</span>
          <span className={`alarm-interval-select ${hide2}`}>
            {[5, 10, 15, 20, 30, 60].map(i => <span key={i} className='alarm-interval-select-item alarm-time-number' onClick={() => handleClickAlarmIntervalSelect(i)}>{i}</span>)}
          </span>
          minutes
        </span>
      </div>
      <div className="alarm-right">
        <span>{nextAlarmWillSoundAtMessage}</span>
        <span className={`alarm-time-number ${hide3}`}>{nextAlarm.h} : {nextAlarm.m} : 00</span>
      </div>
    </div>
  );
};
