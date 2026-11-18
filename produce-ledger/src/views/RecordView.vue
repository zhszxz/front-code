<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WeighingRow from '../components/WeighingRow.vue'
import SummaryBar from '../components/SummaryBar.vue'
import { saveTransaction, updateTransaction, getTransaction, currentUser } from '../store/ledger'
import { summarize, isValidWeighing, toInt, todayStr, uid } from '../lib/utils'

const route = useRoute()
const router = useRouter()
const PRODUCTS = ['苹果', '西瓜', '桃子', '葡萄', '梨']

function emptyWeighing() {
  return { gross: null, tare: null, note: '', overrideTare: false }
}

const editingId = ref(route.params.id ? String(route.params.id) : null)
const initialTx = editingId.value ? getTransaction(editingId.value) : null

const form = reactive({
  productName: initialTx?.productName || '',
  date: initialTx?.date || todayStr(),
  unitPrice: initialTx?.unitPrice ?? null,
  lossPercent: initialTx?.lossPercent ?? 0,
  tare: initialTx?.tare ?? null,
  weighings: initialTx?.weighings?.map((w) => ({ ...w })) || [emptyWeighing()]
})

const editingTx = computed(() => (editingId.value ? getTransaction(editingId.value) : null))
const editingDone = computed(() => editingTx.value?.status === 'done')

const globalTare = computed(() => Number(form.tare) || 0)

// 有效称:毛重>0 且 去皮后净重>0,其余不参与汇总(整数判断,精确)
const validWeighings = computed(() => {
  const gQ = toInt(form.tare)
  return form.weighings.filter((w) => isValidWeighing(w, gQ))
})

const unitPrice = computed(() => Number(form.unitPrice) || 0)
const lossRate = computed(() =>
  Math.min(100, Math.max(0, Number(form.lossPercent) || 0))
)

// 汇总:整数运算,小数返回
const summary = computed(() =>
  summarize(form.weighings, form.tare, lossRate.value, unitPrice.value)
)
const count = computed(() => summary.value.count)
const totalGross = computed(() => summary.value.gross)
const totalNet = computed(() => summary.value.net)
const sellable = computed(() => summary.value.sellable)
const totalPrice = computed(() => summary.value.price)

const canSave = computed(
  () =>
    !!form.productName.trim() &&
    unitPrice.value > 0 &&
    validWeighings.value.length > 0
)

const showDraftButton = computed(() => !editingDone.value)
const primaryLabel = computed(() => (editingDone.value ? '保存修改' : '完成'))

const toast = ref('')
let toastTimer
function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 2000)
}

function addWeighing() {
  form.weighings.push(emptyWeighing())
}

function removeWeighing(i) {
  if (form.weighings.length === 1) {
    form.weighings[0] = emptyWeighing()
  } else {
    form.weighings.splice(i, 1)
  }
}

function batchAdd() {
  const n = parseInt(prompt('要批量添加几称?(1-100)', '10'), 10)
  if (!n || n < 1 || n > 100) return
  for (let i = 0; i < n; i++) form.weighings.push(emptyWeighing())
}

function buildTx(status) {
  return {
    id: editingId.value || uid(),
    userId: currentUser.value,
    productName: form.productName.trim(),
    date: form.date,
    unitPrice: unitPrice.value,
    lossPercent: lossRate.value,
    tare: Number(form.tare) || 0,
    status,
    weighings: validWeighings.value.map((w) => ({ ...w })),
    createdAt: editingTx.value?.createdAt ?? Date.now()
  }
}

function draftSave() {
  if (!canSave.value) return
  const tx = buildTx('draft')
  if (editingId.value) {
    updateTransaction(editingId.value, tx)
  } else {
    saveTransaction(tx)
    editingId.value = tx.id
    router.replace(`/record/${tx.id}`)
  }
  showToast('已暂存,可继续编辑')
}

function finishSave() {
  if (!canSave.value) return
  const tx = buildTx('done')
  if (editingId.value) {
    updateTransaction(editingId.value, tx)
  } else {
    saveTransaction(tx)
  }
  router.push('/history')
}
</script>

<template>
  <div class="page">
    <div class="hero">
      <h1>{{ editingId ? '编辑交易' : '新建交易' }}</h1>
      <p>{{ editingDone ? '修改历史交易并保存' : '逐称录入,自动去皮、折损与计价' }}</p>
    </div>

    <div class="card">
      <h2 class="sec-title">交易信息</h2>
      <div class="meta-grid">
        <label class="field">
          <span class="field-label">品名</span>
          <input class="input" list="products" v-model="form.productName" placeholder="如:苹果" />
          <datalist id="products">
            <option v-for="p in PRODUCTS" :key="p" :value="p" />
          </datalist>
        </label>
        <label class="field">
          <span class="field-label">日期</span>
          <input class="input" type="date" v-model="form.date" />
        </label>
        <label class="field">
          <span class="field-label">单价(元/斤)</span>
          <input class="input" type="number" inputmode="decimal" min="0" step="0.01"
            v-model="form.unitPrice" placeholder="如:3.5" />
        </label>
        <label class="field">
          <span class="field-label">折损(%)<span style="opacity: 0.6"> 可选</span></span>
          <input class="input" type="number" inputmode="decimal" min="0" max="100" step="0.1"
            v-model="form.lossPercent" placeholder="0" />
        </label>
        <label class="field span2">
          <span class="field-label">去皮(全局,斤)<span style="opacity: 0.6"> 每称可单独覆盖</span></span>
          <input class="input" type="number" inputmode="decimal" min="0" step="0.01"
            v-model="form.tare" placeholder="如 2" />
        </label>
      </div>
    </div>

    <div class="card">
      <div class="sec-title" style="display: flex; justify-content: space-between; align-items: center">
        <span>每一称</span>
        <span style="font-size: 13px; color: #86868b; font-weight: 500">
          有效 {{ count }} 称 / 共 {{ form.weighings.length }} 行
        </span>
      </div>

      <WeighingRow
        v-for="(w, i) in form.weighings"
        :key="i"
        :model-value="w"
        :index="i"
        :global-tare="globalTare"
        @remove="removeWeighing(i)"
      />

      <div class="add-actions">
        <button class="btn btn-plain add-main" @click="addWeighing">＋ 添加一称</button>
        <button class="btn btn-ghost btn-sm add-batch" @click="batchAdd">批量添加</button>
      </div>
    </div>

    <SummaryBar
      :count="count"
      :total-gross="totalGross"
      :total-net="totalNet"
      :sellable="sellable"
      :total-price="totalPrice"
      :can-save="canSave"
      :show-draft="showDraftButton"
      :primary-label="primaryLabel"
      @save="finishSave"
      @draft="draftSave"
    />

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>
