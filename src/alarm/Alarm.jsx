import { useStore } from '../zustand/store'

export const Alarm = () => {
  const bears = useStore((state)=>state.bears)
  return (
    <h1>total amount of bears = {bears}</h1>    
  )
}