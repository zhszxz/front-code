import { reactive, computed } from 'vue'
import { toJin } from '../lib/utils'

const TX_KEY = 'produce-ledger:transactions'
const USER_KEY = 'produce-ledger:user'

function loadTx() {
  let txs
  try {
    txs = JSON.parse(localStorage.getItem(TX_KEY)) || []
  } catch {
    txs = []
  }
  // 迁移:旧数据补齐 deleted/status,并把"斤+两"双字段统一为单字段小数斤
  for (const t of txs) {
    if (t.deleted === undefined) t.deleted = false
    if (!t.status) t.status = 'done'
    if (Object.prototype.hasOwnProperty.call(t, 'tareJin')) {
      t.tare = toJin(t.tareJin, t.tareLiang)
      delete t.tareJin
      delete t.tareLiang
    }
    for (const w of t.weighings || []) {
      if (!w) continue
      if (Object.prototype.hasOwnProperty.call(w, 'grossJin')) {
        w.gross = toJin(w.grossJin, w.grossLiang)
        delete w.grossJin
        delete w.grossLiang
      }
      if (Object.prototype.hasOwnProperty.call(w, 'tareJin')) {
        w.tare = toJin(w.tareJin, w.tareLiang)
        delete w.tareJin
        delete w.tareLiang
      }
      if (!Object.prototype.hasOwnProperty.call(w, 'overrideTare')) {
        w.overrideTare = true
      }
    }
  }
  return txs
}

const state = reactive({
  user: localStorage.getItem(USER_KEY) || '',
  transactions: loadTx()
})

export const currentUser = computed(() => state.user)

export function setUser(name) {
  state.user = (name || '').trim()
  if (state.user) localStorage.setItem(USER_KEY, state.user)
  else localStorage.removeItem(USER_KEY)
}

// 正常交易(未删除),按日期倒序
export const myTransactions = computed(() =>
  state.transactions
    .filter((t) => t.userId === state.user && !t.deleted)
    .sort((a, b) => (b.date > a.date ? 1 : -1) || (b.createdAt - a.createdAt))
)

// 回收站(已删除),按删除时间倒序
export const deletedTransactions = computed(() =>
  state.transactions
    .filter((t) => t.userId === state.user && t.deleted)
    .sort((a, b) => (b.deletedAt || 0) - (a.deletedAt || 0))
)

export function saveTransaction(tx) {
  state.transactions.push(tx)
  persist()
}

export function updateTransaction(id, tx) {
  const i = state.transactions.findIndex((t) => t.id === id)
  if (i !== -1) {
    state.transactions[i] = tx
    persist()
  }
}

// 删除 → 移入回收站(软删除)
export function trashTransaction(id) {
  const t = state.transactions.find((x) => x.id === id)
  if (t) {
    t.deleted = true
    t.deletedAt = Date.now()
    persist()
  }
}

// 从回收站恢复
export function restoreTransaction(id) {
  const t = state.transactions.find((x) => x.id === id)
  if (t) {
    t.deleted = false
    delete t.deletedAt
    persist()
  }
}

// 彻底删除单条
export function purgeTransaction(id) {
  const i = state.transactions.findIndex((x) => x.id === id)
  if (i !== -1) {
    state.transactions.splice(i, 1)
    persist()
  }
}

// 清空回收站
export function emptyTrash() {
  state.transactions = state.transactions.filter((x) => !x.deleted)
  persist()
}

export function getTransaction(id) {
  return state.transactions.find((t) => t.id === id)
}

function persist() {
  localStorage.setItem(TX_KEY, JSON.stringify(state.transactions))
}
