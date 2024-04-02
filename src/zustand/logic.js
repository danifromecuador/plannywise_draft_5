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


export const updateZtore = () => ({
  time: getTime(),
  timeFormatted: formatTime(),
})

