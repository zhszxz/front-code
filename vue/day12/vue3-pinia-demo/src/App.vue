<script setup>
import Son1Com from './components/Son1Com.vue'
import Son2Com from './components/Son2Com.vue'
import { useCounterStore } from './store/counter'

</script>

<template>
  <div>
    <h1>Hello Vue 3! Pinia -{{ useCounterStore().count }} - {{ useCounterStore().msg }}</h1>
    <Son1Com></Son1Com>
    <Son2Com></Son2Com>
  </div>
</template>

<style scoped>
</style>
