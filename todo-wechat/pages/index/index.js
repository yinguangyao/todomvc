//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: "",
    autoFocus: false,
    activeKey: "todo-1",
    todos: [{
      text: "1111",
      check: true,
      key: "todo-1"
    }, {
      text: "222",
      key: "todo-2"
    }]
  },
  onInput(e) {
    const {
      value = ""
    } = e.detail
    this.setData({
      inputValue: value
    })
  },
  clearInput() {
    this.setData({
      inputValue: ""
    })
  },
  createToDo(e) {
    const index = this.data.todos.length;
    this.data.todos.push({
      text: this.data.inputValue,
      key: "todo-" + index
    })
    this.setData({
      todos: this.data.todos,
      autoFocus: true,
      activeKey: "todo-" + index
    })
    this.clearInput();
  },
  deleteToDo(e) {
    const {
      index
    } = e.detail
    console.log(index)
    this.data.todos.splice(index, 1);
    this.setData({
      todos: this.data.todos
    })
  }
})
