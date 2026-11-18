<script setup>
// 模板引用
import { ref, onMounted } from 'vue'
import TestCom from './components/test-com.vue'

// 1.创建ref对象
const inputRef = ref(null)
// 3.使用ref对象访问元素
onMounted(() => {
  console.log(inputRef.value)
  inputRef.value.focus()
})

// 获取组件
const testComRef = ref(null)
const handleClick = () => {
  console.log(testComRef.value)
  alert(testComRef.value.count)
  testComRef.value.sayHi()
}
</script>

<template>
  <div>
    <!-- 2.元素绑定ref对象 -->
    <input type="text" ref="inputRef" />
    <TestCom ref="testComRef" />
    <button @click="handleClick">点击组件</button>
  </div>
</template>

<style scoped></style>
