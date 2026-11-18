<!-- setup 语法糖:简化语法,定义的逻辑和状态可以直接用 -->
<script setup>
// export default {
//   // setup 函数: 用于定义组件的逻辑和状态,在所有钩子函数之前调用
//   setup() {
//     const msg = 'this is a message'
//     const print = () => {
//       console.log(msg)
//     }
//     // 模板中要使用的变量必须 return 出去
//     return {
//       msg,
//       print,
//     }
//   },
// }

const msg = 'this is a message'

const print = () => {
  console.log(msg)
}
</script>

<template>
  <div class="msg">{{ msg }}</div>
  <button @click="print">print</button>
</template>

<style scoped></style>
