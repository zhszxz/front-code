<template>
  <div>
    <h1>自定义指令</h1>
    <input v-focus type="text">
  </div>
</template>

<script>
// 需求：自定义指令实现页面加载自动获焦
export default {
  directives: {
    // 自定义指令名
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
}
</script>

<style>

</style>