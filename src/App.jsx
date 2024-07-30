import { Alarm } from './alarm/Alarm'
import './App.css'

export const App =()=> {
  return (
    <div className="App">
      <div className="todo">
        TODOS
      </div>
      <div className="doing">
        <Alarm />
      </div>
      <div className="done">
        DONE
      </div>
    </div>
  )
}
