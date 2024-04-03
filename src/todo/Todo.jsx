import { ztore } from '../zustand/ztore.js'

export const Todo = () => {
  const { currentAlarmInterval, previousAlarmInterval } = ztore()
  return (
    <div className="todo">
      <div>current : {currentAlarmInterval}</div>
      <div>previous : {previousAlarmInterval.min.h}:{previousAlarmInterval.min.m} ... {previousAlarmInterval.max.h}:{previousAlarmInterval.max.m}</div>      
    </div>
  )
}