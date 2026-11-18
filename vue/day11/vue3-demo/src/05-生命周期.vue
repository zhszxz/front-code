<script setup>
// vue3 生命周期函数
// 1.beforeCreate,created:直接写到script setup中
const create = () => {
  console.log('create')
}

// 2.beforeMount,mounted: onBeforeMount,onMounted
import { onBeforeMount, onMounted } from 'vue'
onBeforeMount(() => {
  console.log('beforeMount')
})
onMounted(() => {
  console.log('mounted')
})

// 3.beforeDestroy,destroyed: onBeforeUnmount,onUnmounted
import { onBeforeUnmount, onUnmounted } from 'vue'
onBeforeUnmount(() => {
  console.log('beforeDestroy')
})
onUnmounted(() => {
  console.log('destroyed')
})
create()
</script>

<template>
  <div></div>
</template>

<style scoped></style>
