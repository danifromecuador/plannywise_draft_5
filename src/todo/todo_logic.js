// following functions will be used by src/zustand/stores.js
export const todos = []

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
  const index = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ]
  return Number(index.join(""))
}

export const addTodo = (input) => {
  const date = getDate()
  todos.push({ date: date, text: input })
}

export const markAsDone = (todo) => {
  console.log(todo);
}