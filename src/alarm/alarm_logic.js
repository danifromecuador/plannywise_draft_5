// following functions will be exported to ztore
// gets the local time that will be used for math operations
export const getTime = () => ({
  y: new Date().getFullYear(),
  M: new Date().getMonth() + 1, // because January=0
  D: new Date().getDate(), // day of month
  d: new Date().getDay(), // day of week
  h: new Date().getHours(),
  m: new Date().getMinutes(),
  s: new Date().getSeconds()
})

// format time to transform from 9:17:0 to 09:17:00 only for HTML rendering only
export const formatTime = () => ({
  h: getTime().h.toString().padStart(2, '0'),
  m: getTime().m.toString().padStart(2, '0'),
  s: getTime().s.toString().padStart(2, '0')
})

// if (time=9:40 && interval=15) => {09:15 to 09:30}
// if (time=9:43 && interval=5) => {09:35 to 09:40}
// if (time=9:43 && interval=60) => {08:00 to 09:00}
export const previousAlarmInterval = () => {
  const time = { h: getTime().h, m: getTime().m, }
  const interval = JSON.parse(localStorage.getItem("currentAlarmInterval"))
  let maxH = time.h
  let minH = maxH
  let maxM = (Math.floor(time.m / interval)) * interval
  let minM = maxM - interval
  if (minM < 0) {
    maxM = 0
    minM = 60 + minM
    minH = time.h - 1
  }
  if (minH < 0) minH = 23
  return {
    min: { h: minH.toString().padStart(2, '0'), m: minM.toString().padStart(2, '0') },
    max: { h: maxH.toString().padStart(2, '0'), m: maxM.toString().padStart(2, '0') }
  }
}

// return the next time that the alarm will sound, it's not an interval like previousAlarmInterval()
export const nextAlarm = () => {
  const time = { h: getTime().h, m: getTime().m, }
  const interval = JSON.parse(localStorage.getItem("currentAlarmInterval"))
  let hour = time.h
  let minute = (Math.floor(time.m / interval) + 1) * interval
  if (minute >= 60) {
    minute = 0
    hour += 1
  }
  if (hour > 23) hour = 0
  return { h: hour.toString().padStart(2, '0'), m: minute.toString().padStart(2, '0') }
}

// update some states (time, timeFormatted, previousAlarmInterval, nextAlarm) of updateZtore
export const updateZtore = () => ({
  time: getTime(),
  timeFormatted: formatTime(),
  previousAlarmInterval: previousAlarmInterval(),
  nextAlarm: nextAlarm(),
})
