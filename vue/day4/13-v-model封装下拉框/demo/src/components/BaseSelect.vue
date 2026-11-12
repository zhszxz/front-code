<template>
  <div>
    <select :value="value" @input="handle">
      <option value="101">北京</option>
      <option value="102">上海</option>
      <option value="103">武汉</option>
      <option value="104">广州</option>
      <option value="105">深圳</option>
    </select>
  </div>
</template>

<script>
export default {
  // 2.接收父组件传递过来的数据
  props: {
    value: String,
  },
  methods: {
    // 3.当下拉框的值发生改变时，触发input事件，把最新的值传递给父组件
    handle(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>

<style>
</style>