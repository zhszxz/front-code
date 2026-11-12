<template>
  <div class="my-tag">
    <input 
    v-if="isEdit" 
    v-focus 
    @blur="isEdit = false" 
    :value="value" 
    @keyup.enter="handleEnter"
    type="text" 
    class="input" 
    placeholder="请输入文本">

    <div v-else @dblclick="dblClick" class="text">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    dblClick () {
      this.isEdit = true;
    },
    handleEnter(e){
      if(!e.target.value.trim()){
        return
      }
      this.$emit('input', e.target.value)
      this.isEdit = false
    }
  }
}
</script>

<style lang="less" scoped>
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
</style>