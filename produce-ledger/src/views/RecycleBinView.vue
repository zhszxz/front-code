<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deletedTransactions, restoreTransaction, purgeTransaction, emptyTrash } from '../store/ledger'
import { fmtDate, fmtJin, fmtMoney, summarize } from '../lib/utils'

const router = useRouter()

const toast = ref('')
let toastTimer
function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 2000)
}

function txCount(tx) {
  return tx.weighings.length
}

function txNet(tx) {
  return summarize(tx.weighings, tx.tare, tx.lossPercent, tx.unitPrice).net
}

function txPrice(tx) {
  return summarize(tx.weighings, tx.tare, tx.lossPercent, tx.unitPrice).price
}

function restore(tx) {
  restoreTransaction(tx.id)
  showToast(`已恢复「${tx.productName}」`)
}

function purge(tx) {
  if (confirm(`彻底删除「${tx.productName}」?此操作不可恢复。`)) {
    purgeTransaction(tx.id)
    showToast('已彻底删除')
  }
}

function clearAll() {
  if (confirm('清空回收站?所有已删除的交易将被彻底删除,不可恢复。')) {
    emptyTrash()
    showToast('回收站已清空')
  }
}
</script>

<template>
  <div class="page">
    <div class="hero">
      <h1>回收站</h1>
      <p>误删的交易可在这里恢复</p>
    </div>

    <div v-if="deletedTransactions.length === 0" class="card empty">
      <div class="big">🗑️</div>
      <p>回收站是空的</p>
      <router-link class="btn btn-primary" style="margin-top: 16px" to="/history">返回历史</router-link>
    </div>

    <div v-else>
      <div class="trash-toolbar">
        <button class="btn btn-ghost btn-sm" @click="router.push('/history')">‹ 返回历史</button>
        <button class="btn btn-plain btn-sm" @click="clearAll">清空回收站</button>
      </div>

      <div v-for="tx in deletedTransactions" :key="tx.id" class="card trash-card">
        <div class="main">
          <div class="tx-title">{{ tx.productName }}<span class="deleted-tag">已删除</span></div>
          <div class="tx-meta">
            {{ fmtDate(tx.date) }} · {{ txCount(tx) }} 称 · 净重 {{ fmtJin(txNet(tx)) }} 斤
          </div>
        </div>
        <div class="tx-price">¥{{ fmtMoney(txPrice(tx)) }}</div>
        <div class="tx-actions">
          <button class="btn btn-ghost btn-sm" @click="restore(tx)">恢复</button>
          <button class="btn btn-plain btn-sm" @click="purge(tx)">彻底删除</button>
        </div>
      </div>
    </div>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>
