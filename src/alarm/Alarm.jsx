import { ztore } from '../zustand/ztore.js';
import { useEffect } from 'react';

export const Alarm = () => {
  const { timeFormatted, currentAlarmInterval, updateCurrentAlarmInterval, updateZtore } = ztore();

  // refresh ztore every second
  useEffect(() => {
    const intervalId = setInterval(updateZtore, 1000);
    return () => clearInterval(intervalId);
  }, [currentAlarmInterval]);

  // save ztore state in local storage when ztore state changes
  useEffect(()=>{
    localStorage.setItem("currentAlarmInterval", JSON.stringify(currentAlarmInterval))
  },[currentAlarmInterval]) 

  return (
    <div className="alarm">
      <div className="alarm-left">
        <span>Current Local Time </span>
        <span>{timeFormatted.h} : {timeFormatted.m} : {timeFormatted.s}</span>
      </div>
      <div className="alarm-center">
        <span>The alarm will sound </span>
        <span>
          every...
          <span className="alarm-interval-show" onClick={() => updateCurrentAlarmInterval(23)}>{currentAlarmInterval}</span>
          ...minutes</span>
      </div>
    </div>
  );
};
