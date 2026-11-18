import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// defineStore('唯一标志',配置对象/函数)
export const useCounterStore = defineStore('counter',()=>{
  // ref 定义的数据就是 state
  const count = ref(100)
  const msg=ref('hello pinia')

  // 普通函数就是 action
  const addCount=()=>{count.value++}
  const subCount=()=>{count.value--}

  // computed 定义的数据就是 getter
  const doubleCount=computed(()=>count.value*2)
  return {
    count,
    msg,
    doubleCount,
    addCount,
    subCount
  }
})
