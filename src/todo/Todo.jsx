import { ztore } from '../zustand/ztore.js'

export const Todo = () => {
  const { alarmInterval } = ztore()
  return (
    <div className="todo">
      TODO alarm interval : {alarmInterval.current}
    </div>
  )
}