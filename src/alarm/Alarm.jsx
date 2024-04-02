import { ztore } from '../zustand/ztore.js';
import { useEffect } from 'react';

export const Alarm = () => {
  const { time, timeFormatted, alarmInterval, updateAlarmInterval, updateZtore } = ztore();

  useEffect(() => {
    const intervalId = setInterval(updateZtore, 1000);
    return () => clearInterval(intervalId);    
  }, []);

  const store = ztore()
  useEffect(()=>{
    console.log(store);
  },[store])

  return (
    <div className="alarm">
      <div className="alarm-left">
        <span>Current Local Time</span>
        <span>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
      </div>
      <div className="alarm-center">
        <span>Alarm will sound</span>
        <span>
          each
          <button onClick={()=>updateAlarmInterval(23)}>{alarmInterval.current}</button>
          minutes
        </span>
      </div>
      <div className="alarm-right">
      </div>
    </div>
  );
};
