<template>
  <div>
    <h1>
      根组件
      -- {{ $store.state.title }}
      -- {{ $store.state.count }}
    </h1>
    <button @click="setTitle">改标题</button><br>
    <input type="text" v-bind:value="count" @input="handleInput">
    <SonOne></SonOne>
    <SonTwo></SonTwo>
  </div>
</template>

<script>
import SonOne from './components/SonOne.vue'
import SonTwo from './components/SonTwo.vue'
export default {
  name: 'App',
  components: {
    SonOne,
    SonTwo
  },
  methods: {
    setTitle () {
      this.$store.commit('setTitle', '新的标题')
    },
    handleInput (e) {
      const value = +e.target.value
      if (isNaN(value)) {
        return
      }
      this.$store.commit('setCount', value)
    }
  },
  created () {
    console.log(this.$router)
    console.log(this.$store)
  },
  // 计算属性
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style lang="less">
</style>
