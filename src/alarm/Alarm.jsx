// src/alarm/Alarm.jsx
import { useState, useEffect } from 'react'
import { ztore } from '../zustand/ztore'
import alarmSound from '../../public/alarm.wav'
import './Alarm.css'

// time       is a variable type object from the store that shows the current local time
// updateTime is a function from the store that updates the time (this function is called each second)
//            other way the time will be static
// h, m, s    are the keys of the time object that represent the hours, minutes, and seconds 
export const Alarm = () => {
  const { time, updateTime, alarmInterval, updateAlarmInterval } = ztore();
  const [timeFormatted, setTimeFormatted] = useState({ h: time.h, m: time.m, s: time.s });
  const [alarmStatusMessage, setAlarmStatusMessage] = useState("wait");
  const [nextAlarmMessage, setNextAlarmMessage] = useState("");
  const [showHide1, setShowHide1] = useState("")
  const [showHide2, setShowHide2] = useState("hide")

  // update ztore time each second, other way the time will be static
  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  // the following functions will be called when ztore time or ztore alarmInterval changes
  useEffect(() => {
    // format ztore time to transform from 9:17:0 to 09:17:00 only for HTML rendering only
    const formatTime = () => {
      setTimeFormatted({
        h: time.h.toString().padStart(2, '0'),
        m: time.m.toString().padStart(2, '0'),
        s: time.s.toString().padStart(2, '0')
      });
    };

    const playAlarm = () => {
      const audio = new Audio(alarmSound)
      if (time.m % alarmInterval === 0) {
        if (time.s === 0) audio.play()
        if (time.s >= 0 && time.s <=8) setAlarmStatusMessage("playing")
        else setAlarmStatusMessage("wait")
      }
    };

    // TODO check if it is working with 60 minutes
    // calculate newt time that the alarm will sound
    const nextAlarmWillSoundAt = () => {
      const remainder = time.m % alarmInterval;
      const nextMinute = time.m + (alarmInterval - remainder);
      const nextAlarmMinute = nextMinute >= 60 ? 0 : nextMinute;
      setNextAlarmMessage(nextAlarmMinute.toString().padStart(2, '0'));
    };

    formatTime();
    playAlarm();
    nextAlarmWillSoundAt();
  }, [time, alarmInterval]);

  const handleClick1 = () => {
    showHide1 == "" ? setShowHide1("hide") : setShowHide1("")
    setShowHide2("")
  }

  const handleClick2 = (i) => {
    updateAlarmInterval(i)
    setShowHide1("")
    setShowHide2("hide")
  }

  return (
    <div className="alarm">
      <div className="alarm-h-m-s">
        <span>Current Local Time</span>
        <span>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
      </div>
      <div className="alarm-setted-interval-indicator">
        <span>The alarm will sound </span>
        <span>
          every
          <span className={`alarm-interval-show ${showHide1}`} onClick={handleClick1}>{alarmInterval}</span>
          <span className={`alarm-interval-select ${showHide2}`}>
            {[5, 10, 15, 20, 30, 60].map(i => <span key={i} className='alarm-interval-select-item' onClick={() => handleClick2(i)}>{i}</span>)}
          </span>
          minutes
        </span>
      </div>
      <div className="alarm-next-time-indicator">
        {
          alarmStatusMessage === "wait" ?
            <>
              <span>Next alarm will sound at </span>
              <span>{timeFormatted.h} : {nextAlarmMessage} : 00</span>
            </>
            :
            <div>Alarm is playing right now</div>
        }
      </div>
    </div >
  );
};
