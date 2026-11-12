<template>
  <div class="count-box">
    <button class="minus" :disabled="value <= 1" @click="updateCount(-1)">-</button>
    <input class="count-input" type="number" :value="value" @change="handleChange"/>
    <button class="plus" @click="updateCount(1)">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    updateCount (val) {
      if (this.value + val < 1) {
        return
      }
      this.$emit('input', this.value + val)
    },
    handleChange (e) {
      const val = parseInt(e.target.value, 10)
      if (Number.isNaN(val) || val < 1) {
        e.target.value = this.value
        return
      }
      e.target.value = val
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
}

.minus,
.plus {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  outline: none;
  border: none;
  background-color: #efefef;
}

.minus:disabled {
  color: #c8c9cc;
  cursor: not-allowed;
}

.count-input {
  width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  outline: none;
  border: none;
  margin: 0 5px;
  background-color: #efefef;
}
</style>
