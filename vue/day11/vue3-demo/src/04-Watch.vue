<script setup>
import { ref, watch } from 'vue'
const count = ref(100)
const nickname = ref('张三')
// watch 监听器: watch(ref对象, 回调函数)
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
watch(nickname, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})

// 监听多个ref对象的变化,写成数组即可
watch([count, nickname], (newArr, oldArr) => {
  console.log(newArr, oldArr)
})

// 监听复杂类型,需要使用第三个参数
const obj = ref({
  name: '张三',
  age: 18,
})
watch(
  obj,
  (newObj, oldObj) => {
    console.log(newObj, oldObj)
  },
  {
    immediate: true,
    deep: true,
  },
)

// 监听复杂类型指定属性
watch(
  // 指定属性
  () => obj.value.name,
  // 回调函数
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
)
</script>

<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="count++">增加</button>
    <h1>{{ nickname }}</h1>
    <button @click="nickname = '李四'">修改昵称</button>
    <h1>{{ obj.name }}</h1>
    <button @click="obj.name = '李四'">修改姓名</button>
  </div>
</template>

<style scoped></style>
