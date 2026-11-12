<template>
  <div class="app">
    <!-- 1.提供数据给子组件 4.接收子组件传递的数据并更新 -->
    <BaseSelect :value="selectId" @input="selectId = $event"></BaseSelect>
    <!-- 简化写法 -->
    <BaseSelect v-model="selectId"></BaseSelect>
  </div>
</template>

<script>
import BaseSelect from './components/BaseSelect.vue'
export default {
  data() {
    return {
      selectId: '102',
    }
  },
  components: {
    BaseSelect,
  },
}
</script>

<style>
</style>