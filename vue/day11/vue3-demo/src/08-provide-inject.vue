<script setup>
// 跨层级通信
import MiddleCom from '@/components/middleCom.vue'
import { provide, ref } from 'vue'
// 1. 提供普通数据
const msg = ' 你好'
provide('msg', msg)

// 2.提供响应式数据
const count = ref(100)
provide('count', count)

// 3.提供修改数据的方法
const changeCount = (newCount) => {
  count.value = newCount
}
provide('changeCount', changeCount)
</script>

<template>
  <div>
    <h1>我是顶级组件</h1>
    <MiddleCom></MiddleCom>
  </div>
</template>

<style scoped></style>
