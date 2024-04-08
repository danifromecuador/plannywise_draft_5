// following functions will be used by src/zustand/stores.js
const todos = [
  {
    date: "1",
    text: "text to do 1"
  },
  {
    date: "2",
    text: "text to do 2"
  }
]

const dones = [
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

export const updateTodosLocalStorage = (todos) => {
  console.log("This is the data that will be saved in local storage");
  console.log(todos);
  console.log(getDate());
}

export const addTodo = (input) => {
  const date = getDate()
  todos.push({ date: date, text: input })
  console.log(todos);
}

export const markAsDone = () => {
  console.log("caramelo");
}