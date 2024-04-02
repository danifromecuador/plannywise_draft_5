export const getTime = () => {
  const time = new Date()
  return {
    y: time.getFullYear(),
    M: time.getMonth() + 1, // because January=0
    D: time.getDate(), // day of month
    d: time.getDay(), // day of week
    h: time.getHours(),
    m: time.getMinutes(),
    // m: 40,
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
  const time = {
    h: getTime().h,
    m: getTime().m,
  }
  const interval = JSON.parse(localStorage.getItem("currentAlarmInterval"))
  // TODO calculate interval

  let maxHour = time.h
  let minHour = maxHour
  let maxMinute = (Math.floor(time.m / interval)) * interval
  let minMinute = maxMinute - interval
  if (minMinute < 0) {
    maxMinute = 0
    minMinute = 60 + minMinute
    minHour = time.h - 1
    if (minHour < 0) minHour = 23
  }

  return {
    min: { h: minHour.toString().padStart(2, '0'), m: minMinute.toString().padStart(2, '0') },
    max: { h: maxHour.toString().padStart(2, '0'), m: maxMinute.toString().padStart(2, '0') }
  }

}

export const updateZtore = () => ({
  time: getTime(),
  timeFormatted: formatTime(),
  previousAlarmInterval: previousAlarmInterval(),
})

