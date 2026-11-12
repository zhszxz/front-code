<template>
  <div class="son" style="border:3px solid #000;margin:10px">
    <!-- 3.直接使用props的值 -->
    我是Son组件 {{title}}
  </div>
</template>

<script>
export default {
  name: 'Son-Child',
  // 2.子组件接收父组件传递过来的数据
  props:['title']
}
</script>

<style>

</style>