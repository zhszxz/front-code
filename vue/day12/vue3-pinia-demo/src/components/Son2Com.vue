<script setup>
import { useCounterStore } from '../store/counter'
const counterStore=useCounterStore()
</script>

<template>
  <div>
    <h1>我是Son2Com组件</h1>
    <button @click="counterStore.subCount">-</button>
  </div>
</template>

<style scoped>
</style>
