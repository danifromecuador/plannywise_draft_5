// following functions will be used by src/zustand/stores.js
export const todos = [
  {
    date: "1",
    text: "text to do 1"
  },
  {
    date: "2",
    text: "text to do 2"
  }
]

export const dones = [
  {
    date: "3",
    text: "some text done 3"
  },
  {
    date: "4",
    text: "some text done 4"
  }
]

const getDate = () => {
  const date = new Date()
  const Y = date.getFullYear()
  const M = date.getMonth()+1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  const ms = date.getMilliseconds()
  const index = [Y, M, D, h, m, s, ms]
  let newIndex = ""
  for (let i = 0; i< index.length; i++) {
    newIndex += index[i].toString()
  }
  return newIndex
}

export const updateTodosLocalStorage = (todos) => {
  console.log("This is the data that will be saved in local storage");
  console.log(todos);
  console.log(getDate());
}

export const addTodo = (input) => {
  const date = new Date()
  todos.push({ date: date, text: input })
}

export const markAsDone = () => {
  console.log("caramelo");
}