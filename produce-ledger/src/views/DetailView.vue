<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTransaction } from '../store/ledger'
import {
  grossOf,
  effectiveTare,
  summarize,
  fmtJin,
  fmtMoney,
  fmtDate,
  fmtLossFactor
} from '../lib/utils'

const route = useRoute()
const router = useRouter()
const tx = computed(() => getTransaction(route.params.id))

const globalTare = computed(() => Number(tx.value?.tare) || 0)

const rows = computed(() => {
  if (!tx.value) return []
  const g = globalTare.value
  return tx.value.weighings.map((w, i) => {
    const gross = grossOf(w)
    const tare = effectiveTare(w, g)
    return {
      i,
      gross,
      tare,
      net: gross - tare,
      note: w.note,
      override: !!w.overrideTare
    }
  })
})

const summary = computed(() =>
  tx.value
    ? summarize(tx.value.weighings, tx.value.tare, tx.value.lossPercent, tx.value.unitPrice)
    : null
)

const totalGross = computed(() => summary.value?.gross ?? 0)
const totalTare = computed(() => summary.value?.tare ?? 0)
const totalNet = computed(() => summary.value?.net ?? 0)
const loss = computed(() => Number(tx.value?.lossPercent) || 0)
const sellable = computed(() => summary.value?.sellable ?? 0)
const unitPrice = computed(() => Number(tx.value?.unitPrice) || 0)
const totalPrice = computed(() => summary.value?.price ?? 0)

const grossList = computed(() => rows.value.map((r) => fmtJin(r.gross)).join(' + ') || '0')
const tareList = computed(() => rows.value.map((r) => fmtJin(r.tare)).join(' + ') || '0')
</script>

<template>
  <div v-if="tx" class="page">
    <button class="btn btn-ghost back" @click="router.back()">‹ 返回历史</button>

    <div class="card">
      <div class="tx-title">{{ tx.productName }}</div>
      <div class="tx-meta">{{ fmtDate(tx.date) }} · 共 {{ rows.length }} 称</div>
    </div>

    <div class="card">
      <h2 class="sec-title">每一称明细</h2>
      <table class="tbl">
        <thead>
          <tr>
            <th>称</th>
            <th>备注</th>
            <th class="num">毛重(斤)</th>
            <th class="num">去皮(斤)</th>
            <th class="num">净重(斤)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.i">
            <td>第 {{ r.i + 1 }} 称</td>
            <td>{{ r.note || '—' }}</td>
            <td class="num">{{ fmtJin(r.gross) }}</td>
            <td class="num">{{ fmtJin(r.tare) }}{{ r.override ? ' ⚙' : '' }}</td>
            <td class="num">{{ fmtJin(r.net) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="globalTare > 0" class="tbl-note">
        去皮:全局 {{ fmtJin(globalTare) }} 斤,带 ⚙ 的为该称单独设置。
      </p>
    </div>

    <div class="card">
      <h2 class="sec-title">计算公式</h2>
      <div class="formula">
        <div class="f-step">
          <b>① 总毛重</b> = {{ grossList }} = <b>{{ fmtJin(totalGross) }} 斤</b>
        </div>
        <div class="f-step">
          <b>② 总去皮</b> = {{ tareList }} = <b>{{ fmtJin(totalTare) }} 斤</b>
        </div>
        <div class="f-step">
          <b>③ 总净重</b> = {{ fmtJin(totalGross) }} − {{ fmtJin(totalTare) }} =
          <b>{{ fmtJin(totalNet) }} 斤</b>
        </div>
        <div v-if="loss > 0" class="f-step">
          <b>④ 折损</b> {{ loss }}% → 计价斤数 = {{ fmtJin(totalNet) }} ×
          {{ fmtLossFactor(loss) }} = <b>{{ fmtJin(sellable) }} 斤</b>
        </div>
        <div v-else class="f-step">
          <b>④ 折损</b> 无 → 计价斤数 = <b>{{ fmtJin(sellable) }} 斤</b>
        </div>
        <div class="f-step">
          <b>⑤ 总价</b> = {{ fmtJin(sellable) }} 斤 × {{ fmtMoney(unitPrice) }} 元/斤 =
          <b>¥{{ fmtMoney(totalPrice) }}</b>
        </div>
      </div>
      <div class="f-result">
        最终总价
        <span class="big">¥{{ fmtMoney(totalPrice) }}</span>
      </div>
    </div>
  </div>

  <div v-else class="page">
    <div class="card empty">
      <div class="big">🔍</div>
      <p>没有找到这笔交易</p>
    </div>
  </div>
</template>
