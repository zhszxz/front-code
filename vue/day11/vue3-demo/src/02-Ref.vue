<script setup>
// vue 中的数据默认不是响应式的
// const count = 100

// import { reactive } from 'vue'
// reactive 函数: 接收对象,返回响应式对象
// const state = reactive({ count: 100 })

import { ref } from 'vue'
// ref 函数: 接收基本类型或对象,返回响应式对象(推荐使用)
const count = ref(100)
// script 中访问加 .value
console.log(count.value)
const inc = () => {
  count.value++
}
</script>

<template>
  <!-- template 中直接访问 -->
  <div>{{ count }}</div>
  <button @click="inc">+1</button>
</template>

<style scoped></style>
