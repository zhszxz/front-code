<!-- vue 根组件文件 -->
 <!-- 结构 -->
<template>
  <div class="app">
    <!-- 头部组件 -->
    <HmHeader></HmHeader>
    <!-- 主体组件 -->
    <HmMain></HmMain>
    <!-- 底部组件 -->
    <HmFooter></HmFooter>
  </div>
</template>

<!-- 行为 -->
<script>
// 局部注册组件，注册后只能在当前组件中使用
// 引入组件
import HmHeader from "./components/HmHeader.vue";
import HmMain from "./components/HmMain.vue";
import HmFooter from "./components/HmFooter.vue";
// 注册组件
export default {
  components: {
    // 组件名:组件对象
    HmHeader: HmHeader,
    HmMain,
    HmFooter,
  },
};
</script>

<!-- 样式 -->
<style>
.app {
  width: 600px;
  height: 600px;
  background-color: rgb(129, 201, 239);
}
</style>