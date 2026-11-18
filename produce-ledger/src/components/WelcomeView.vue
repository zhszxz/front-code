<script setup>
import { ref } from 'vue'
import { setUser } from '../store/ledger'

const name = ref('')

function enter() {
  if (name.value.trim()) setUser(name.value)
}
</script>

<template>
  <div class="welcome">
    <div class="welcome-card card">
      <div class="logo">🌾</div>
      <h1>农记</h1>
      <p class="sub">面向农村的农产品出售记账</p>
      <form @submit.prevent="enter">
        <label class="field">
          <span class="field-label">你的名字 / 账号</span>
          <input
            class="input"
            v-model="name"
            placeholder="如:老王"
            autofocus
          />
        </label>
        <button class="btn btn-primary btn-block" type="submit" :disabled="!name.trim()">
          进入记账
        </button>
      </form>
      <p class="hint">每个人的账分开保存,互不影响。</p>
    </div>
  </div>
</template>
