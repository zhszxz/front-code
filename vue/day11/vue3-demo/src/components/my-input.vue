<script setup>
import { defineModel } from 'vue'
// 使用defineModel简化props和emit的定义
const modelValue = defineModel()
</script>

<template>
  <div>
    <input type="text" :value="modelValue" @input="(e) => (modelValue = e.target.value)" />
  </div>
</template>
