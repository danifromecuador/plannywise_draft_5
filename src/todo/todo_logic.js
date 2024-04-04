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

export const addTodo = (input) => {
  todos.push({ date: "12", text: input })
}

export const markAsDone = () => {
  console.log("caramelo");
}