<script setup>
// 父子通信
import SonCom from './components/son-com.vue'
import { ref } from 'vue'

const money = ref(100)
const setMoney = (newMoney) => {
  money.value = newMoney
}
</script>

<template>
  <!-- 引入后直接使用无需注册 -->
  <h1>
    <!-- 父传子 -->
    <SonCom car="宝马车" :money="money" @pay="setMoney"></SonCom>
    <button @click="money += 10">挣钱</button>
  </h1>
</template>

<style scoped></style>
