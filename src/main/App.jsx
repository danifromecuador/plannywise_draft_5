import { Alarm } from '../alarm/Alarm.jsx'
import {Todo} from '../todo/Todo.jsx'
import './styles/App.css'

export const App = () => {
  return (
    <div className='app'>
      <Alarm />
      <Todo />
    </div>
  )
}