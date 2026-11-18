<script setup>
import { inject } from 'vue'
// 1. 接收普通数据
const msg = inject('msg')
// 2. 接收响应式数据
const count = inject('count')
// 3. 接收修改数据的方法
const changeCount = inject('changeCount')
</script>

<template>
  <div>
    <h1>我是底层组件 - {{ msg }} - {{ count }}</h1>
    <button @click="changeCount(200)">修改 count</button>
  </div>
</template>

<style scoped></style>
