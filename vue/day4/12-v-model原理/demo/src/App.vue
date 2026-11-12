<template>
  <div class="app">
    <input type="text" v-model="msg1" />
    <br />
    <!-- v-model的底层：value（数据修改更新视图）和 @input（视图修改更新数据），从而实现双向绑定 -->
    <input type="text" :value="msg2" @input="msg2 = $event.target.value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg1: '',
      msg2: '',
    }
  },
}
</script>

<style>
</style>