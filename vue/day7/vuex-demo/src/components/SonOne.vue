<template>
  <div>
    <h2>SonOne组件</h2><br>
    <!-- 模板中获取state数据
     方式一 : $store.state.变量名(不推荐)
     方式二 : 转为计算属性
    -->
    <!-- 从vuex中获取的值：{{ $store.state.count }} -->
     从vuex中获取的值：{{ count }}
    <button @click="addCount(1)">值+1</button>
    <button @click="addCount(5)">值+5</button>
    <button @click="setTitle('666')">一秒后修改标题为666</button><br>

    <!-- 获取子模块state数据 -->
    <!-- 方式一: $store.state.模块名.变量名 -->
    <!-- <div>{{ $store.state.user.userInfo.name }}</div>
    <div>{{ $store.state.setting.theme }}</div> -->

    <!-- 方式二: 使用mapState辅助函数 -->
    <!-- <div>{{ user }}</div>
    <div>{{ setting }}</div> -->
    <div>{{ userInfo }} - {{ theme }}</div>
    <button @click="updateUser">更新用户信息</button>
    <button @click="updateTheme">更新主题</button>

    <!-- 访问子模块 getters -->
    <div>{{ $store.getters['user/UpperCaseName'] }}</div>
    <div>{{ UpperCaseName() }}</div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'SonOne',
  computed: {
    ...mapState(['count', 'title']),
    // 将子模块 state 整体映射为计算属性
    ...mapState(['user', 'setting']),
    // 将子模块 state 具体变量映射为计算属性,需要开启命名空间
    ...mapState('user', ['userInfo']),
    ...mapState('setting', ['theme'])
  },
  methods: {
    // addCount (n) {
    //   // 组件中提交需要调用的mutations方法名和参数列表
    //   this.$store.commit('addCount', n)
    // }

    // 辅助函数简化
    ...mapMutations(['addCount']),

    // setTitle (title) {
    //   this.$store.dispatch('setTitle', title)
    // }

    // 辅助函数简化
    ...mapActions(['setTitle']),

    ...mapGetters('user', ['UpperCaseName']),

    updateUser () {
      this.$store.commit('user/setUser', { name: 'lisi', age: 40 })
    },
    updateTheme () {
      this.$store.commit('setting/setTheme', 'dark')
    }
  }
}
</script>

<style>

</style>
