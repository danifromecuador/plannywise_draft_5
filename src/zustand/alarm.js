export const getTime = () => {
  const time = new Date()
  return {
    y: time.getFullYear(),
    M: time.getMonth() + 1, // because January=0
    D: time.getDate(), // day of month
    d: time.getDay(), // day of week
    h: time.getHours(),
    m: time.getMinutes(),
    s: time.getSeconds()
  }
}

export const formatTime = () => {
  const time = getTime()
  return {
    h: time.h.toString().padStart(2, '0'),
    m: time.m.toString().padStart(2, '0'),
    s: time.s.toString().padStart(2, '0')
  }
}

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
    if (minH < 0) minH = 23
  }
  return {
    min: { h: minH.toString().padStart(2, '0'), m: minM.toString().padStart(2, '0') },
    max: { h: maxH.toString().padStart(2, '0'), m: maxM.toString().padStart(2, '0') }
  }
}

export const updateZtore = () => ({
  time: getTime(),
  timeFormatted: formatTime(),
  previousAlarmInterval: previousAlarmInterval(),
})

