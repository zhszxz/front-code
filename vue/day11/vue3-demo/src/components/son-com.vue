<script setup>
const props = defineProps({
  car: String,
  money: Number,
})
console.log(props)
console.log(props.car)
console.log(props.money)

// 子传父W
const emit = defineEmits(['pay'])
// 子组件向父组件传递数据
const pay = () => {
  emit('pay', props.money - 50)
}
</script>

<template>
  <div>
    <h1>
      子组件
      <p>父组件传递的数据：{{ car }} - {{ money }}</p>
      <button @click="pay">花钱</button>
    </h1>
  </div>
</template>

<style scoped></style>
