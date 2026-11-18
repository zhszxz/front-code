<script setup>
import MyInput from '@/components/my-input.vue'
import { ref } from 'vue'
const txt = ref('123456')
</script>

<template>
  <div>
    <!-- vue3中v-model等价于:modelValue和@update:modelValue -->
    <MyInput v-model="txt"></MyInput>
    {{ txt }}
  </div>
</template>
