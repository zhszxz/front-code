<script setup>
import { computed } from 'vue'
import { currentUser, setUser } from '../store/ledger'

const initial = computed(() =>
  (currentUser.value || '?').trim().charAt(0).toUpperCase()
)

function switchUser() {
  if (confirm('切换账号?当前账号的数据会保留。')) setUser('')
}
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <div class="brand">🌾 农记</div>
      <nav class="links">
        <router-link class="link" to="/record">记账</router-link>
        <router-link class="link" to="/history">历史</router-link>
      </nav>
      <div class="user" title="点击切换账号" @click="switchUser">
        <span class="avatar">{{ initial }}</span>
        <span class="uname">{{ currentUser }}</span>
      </div>
    </div>
  </header>
</template>
