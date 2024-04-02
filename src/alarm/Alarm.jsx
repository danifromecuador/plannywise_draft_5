import { ztore } from '../zustand/ztore.js';
import { useState, useEffect } from 'react';
import './Alarm.css'

export const Alarm = () => {
  const { timeFormatted, currentAlarmInterval, updateCurrentAlarmInterval, updateZtore } = ztore();

  // refresh ztore every second
  useEffect(() => {
    const intervalId = setInterval(updateZtore, 1000);
    return () => clearInterval(intervalId);
  }, [currentAlarmInterval]);

  // save ztore state in local storage when ztore state changes
  useEffect(() => {
    localStorage.setItem("currentAlarmInterval", JSON.stringify(currentAlarmInterval))
  }, [currentAlarmInterval])

  const [hideAlarmIntervalShow, setHideAlarmIntervalShow] = useState("")
  const [hideAlarmIntervalSelect, setHideAlarmIntervalSelect] = useState("hide")
  const handleClickAlarmIntervalShow = () => {
    if (hideAlarmIntervalShow === "") {
      setHideAlarmIntervalShow("hide")
      setHideAlarmIntervalSelect("")
    }
    else setHideAlarmIntervalShow("")
  }

  const handleClickAlarmIntervalSelect = (i) => {
    setHideAlarmIntervalSelect("hide")
    setHideAlarmIntervalShow("")
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
          <span className={`alarm-interval-show ${hideAlarmIntervalShow}`} onClick={handleClickAlarmIntervalShow}>{currentAlarmInterval}</span>
          <span className={`alarm-interval-select ${hideAlarmIntervalSelect}`}>
            {[5, 10, 15, 20, 30, 60].map(i => <span key={i} className='alarm-interval-select-item' onClick={() => handleClickAlarmIntervalSelect(i)}>{i}</span>)}
          </span>
          minutes
        </span>
      </div>
      <div className="alarm-right">
        <span>Next alarm will sound at</span>
        <span>11 : 11 : 00</span>
      </div>
    </div>
  );
};
