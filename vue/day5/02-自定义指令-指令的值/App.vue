<template>
  <div>
    <h1 v-color="color1">指令的值1测试</h1>
    <h1 v-color="color2">指令的值2测试</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color1: 'red',
      color2: 'orange'
    }
  },
  directives: {
    color: {
      // binding.value 就是指令的值
      inserted (el, binding) {
        el.style.color = binding.value
      },
      // update 指令的值修改的时候触发，提供值变化后，dom更新的逻辑
      update (el, binding) {
        console.log('指令的值修改了');
        el.style.color = binding.value
      }
    }
  }
}
</script>

<style>

</style>