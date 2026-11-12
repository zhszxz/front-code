<template>
  <div>
    <h2>SonTwo组件</h2><br>
    从vuex中获取的值：{{ $store.state.count }}
    <button @click="add(-1)">值-1</button>
  </div>
</template>

<script>
export default {
  name: 'SonTwo',
  methods: {
    add (n) {
      this.$store.commit('addCount', n)
    }
  }
}
</script>

<style>

</style>
