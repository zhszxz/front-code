<script setup>
import { ref, computed } from 'vue'

const list = ref([1, 2, 3, 4, 5, 6, 7, 8])
// computed 函数: 计算属性
const newList = computed(() => {
  return list.value.filter((item) => item % 2 === 0)
})

const append = () => {
  list.value.push(666)
}
</script>

<template>
  <div>
    {{ list }}
  </div>
  <div>
    {{ newList }}
  </div>
  <button @click="append">添加</button>
</template>

<style scoped></style>
