<script setup>
// 子组件定义的属性方法默认不对父组件暴露
const count = 100
const sayHi = () => {
  alert('hi!')
}
// defineExpose 暴露属性方法给父组件调用
defineExpose({
  count,
  sayHi,
})
</script>

<template>
  <h1>
    <div>我是测试组件{{ count }}</div>
    <button @click="sayHi">点击我</button>
  </h1>
</template>

<style scoped></style>
