import { ztore } from '../zustand/ztore.js';
import { useState, useEffect } from 'react';
import alarmSound from '../../public/alarm.wav'
import './Alarm.css'

export const Alarm = () => {
  const { time, timeFormatted, currentAlarmInterval, updateCurrentAlarmInterval, updateZtore } = ztore();
  const [hide1, setHide1] = useState("")
  const [hide2, setHide2] = useState("hide")
  const [hide3, setHide3] = useState("")
  const [nextAlarmWillSoundAtMessage, setNextAlarmWillSoundAtMessage] = useState("Next alarm will sound at")

  // refresh ztore every second
  useEffect(() => {
    const intervalId = setInterval(updateZtore, 1000);
    return () => clearInterval(intervalId);
  }, [currentAlarmInterval]);

  // save ztore state in local storage when ztore state changes
  useEffect(() => {
    localStorage.setItem("currentAlarmInterval", JSON.stringify(currentAlarmInterval))
  }, [currentAlarmInterval])

  useEffect(() => {
    const audio = new Audio(alarmSound)
    if (time.m % currentAlarmInterval === 0 && time.s === 0) audio.play()
    if (time.m % currentAlarmInterval === 0 && time.s < 8) {
      setNextAlarmWillSoundAtMessage("The alarm is playing right now")
      setHide3("hide")
    }
    else {
      setNextAlarmWillSoundAtMessage("Next alarm will sound at")
      setHide3("")
    }
  }, [time])

  const handleClickAlarmIntervalShow = () => {
    if (hide1 === "") {
      setHide1("hide")
      setHide2("")
    }
    else setHide1("")
  }

  const handleClickAlarmIntervalSelect = (i) => {
    setHide2("hide")
    setHide1("")
    updateCurrentAlarmInterval(i)
  }



  return (
    <div className="alarm">
      <div className="alarm-left">
        <span>Current Local Time</span>
        <span>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
      </div>
      <div className="alarm-center">
        <span>The alarm will sound every</span>
        <span className='puto'>
          <span className={`alarm-interval-show ${hide1}`} onClick={handleClickAlarmIntervalShow}>{currentAlarmInterval}</span>
          <span className={`alarm-interval-select ${hide2}`}>
            {[5, 10, 15, 20, 30, 60].map(i => <span key={i} className='alarm-interval-select-item' onClick={() => handleClickAlarmIntervalSelect(i)}>{i}</span>)}
          </span>
          minutes
        </span>
      </div>
      <div className="alarm-right">
        <span>{nextAlarmWillSoundAtMessage}</span>
        <span className={`${hide3}`}>11 : 11 : 00</span>
      </div>
    </div>
  );
};
