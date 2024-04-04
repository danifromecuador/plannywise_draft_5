import { alarmStore } from '../zustand/stores.js'

export const Todo = () => {
  const { currentAlarmInterval, previousAlarmInterval } = alarmStore()
  return (
    <div className="todo">
      <div>current : {currentAlarmInterval}</div>
      <div>previous : {previousAlarmInterval.min.h}:{previousAlarmInterval.min.m} ... {previousAlarmInterval.max.h}:{previousAlarmInterval.max.m}</div>      
    </div>
  )
}