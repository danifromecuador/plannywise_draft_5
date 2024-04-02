import { ztore } from '../zustand/ztore.js'

export const Todo = () => {
  const { currentAlarmInterval } = ztore()
  return (
    <div className="todo">
      TODO alarm interval : {currentAlarmInterval}
    </div>
  )
}