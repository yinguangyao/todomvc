// pages/components/Input/Input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete(e) {
      const {
        index = 0
      } = e.target && e.target.dataset || {}
      this.triggerEvent('deleteToDo', {index: index})
    },
    check(e) {
      const {
        index = 0
      } = e.target && e.target.dataset || {}
    }
  }
})
