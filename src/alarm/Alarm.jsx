import { useState, useEffect } from "react";

export const Alarm = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (intervalId) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(id);
              setIntervalId(null);
              return 0;
            }
            setMinutes((prevMinutes) => prevMinutes - 1);
            return 9;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [intervalId, minutes]);

  const startTimer = () => {
    if (!intervalId) {
      setIntervalId(setInterval(() => {}, 1000)); // This initiates the useEffect hook
    }
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <div className="Alarm">
      <h1>Alarm Component</h1>
      <div className="clock">
        {`${minutes} : ${seconds < 10 ? seconds.toString().padStart(2, "0") : seconds}`}
      </div>
      <div className="play-pause">
        <button onClick={startTimer}>Play</button>
        <button onClick={stopTimer}>Pause</button>
      </div>
    </div>
  );
};
