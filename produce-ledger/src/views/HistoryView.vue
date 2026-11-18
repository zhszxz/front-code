<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { myTransactions, deletedTransactions, trashTransaction } from '../store/ledger'
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

function openDetail(tx) {
  router.push(`/history/${tx.id}`)
}

function editTx(tx) {
  router.push(`/record/${tx.id}`)
}

function remove(tx) {
  if (confirm(`删除「${tx.productName}」?可到回收站恢复。`)) {
    trashTransaction(tx.id)
    showToast('已移入回收站')
  }
}
</script>

<template>
  <div class="page">
    <div class="hero">
      <h1>历史交易</h1>
      <p>共 {{ myTransactions.length }} 笔</p>
      <router-link class="btn btn-ghost btn-sm" style="margin-top: 12px" to="/trash">
        🗑 回收站<template v-if="deletedTransactions.length"> ({{ deletedTransactions.length }})</template>
      </router-link>
    </div>

    <div v-if="myTransactions.length === 0" class="card empty">
      <div class="big">📒</div>
      <p>还没有交易记录</p>
      <router-link class="btn btn-primary" style="margin-top: 16px" to="/record">
        去记第一笔
      </router-link>
    </div>

    <div v-else>
      <div v-for="tx in myTransactions" :key="tx.id" class="card tx-card" @click="openDetail(tx)">
        <div class="main">
          <div class="tx-title">
            {{ tx.productName }}<span v-if="tx.status === 'draft'" class="draft-tag">草稿</span>
          </div>
          <div class="tx-meta">
            {{ fmtDate(tx.date) }} · {{ txCount(tx) }} 称 · 净重 {{ fmtJin(txNet(tx)) }} 斤
          </div>
        </div>
        <div class="tx-price">¥{{ fmtMoney(txPrice(tx)) }}</div>
        <div class="tx-actions">
          <button class="btn btn-ghost btn-sm" @click.stop="editTx(tx)">编辑</button>
          <button class="btn btn-plain btn-sm" @click.stop="remove(tx)">删除</button>
        </div>
      </div>
    </div>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>
