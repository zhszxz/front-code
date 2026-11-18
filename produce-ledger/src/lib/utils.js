// 斤:单字段小数,1 斤 = 10 两(如 50.5 斤 = 50斤5两)

// 旧数据迁移用:把"斤 + 两"双字段合并为小数的斤
export function toJin(jin, liang) {
  return (Number(jin) || 0) + (Number(liang) || 0) / 10
}

// ===== 单称显示(小数) =====
export function grossOf(w) {
  return Number(w.gross) || 0
}

export function tareOf(w) {
  return Number(w.tare) || 0
}

export function effectiveTare(w, globalTare) {
  return w.overrideTare ? tareOf(w) : (Number(globalTare) || 0)
}

// ===== 精确计算(整数最小单位) =====
// 重量用"钱"(×100,即 0.01 斤);金额用"分"(×100,即 0.01 元)
export function toInt(x) {
  return Math.round((Number(x) || 0) * 100)
}

export function grossQian(w) {
  return toInt(w.gross)
}

export function effectiveTareQian(w, globalTareQian) {
  return w.overrideTare ? toInt(w.tare) : (Number(globalTareQian) || 0)
}

export function netQian(w, globalTareQian) {
  return grossQian(w) - effectiveTareQian(w, globalTareQian)
}

export function isValidWeighing(w, globalTareQian) {
  return grossQian(w) > 0 && netQian(w, globalTareQian) > 0
}

// 折损后(钱) = 总净重(钱) × (1000 − 折损%×10) / 1000
export function afterLossQian(netQianVal, lossPercent) {
  const l = Math.round((Number(lossPercent) || 0) * 10)
  return Math.round((netQianVal * (1000 - l)) / 1000)
}

// 总价(分) = 折损后(钱) × 单价(分) / 100
export function priceInFen(sellableQian, unitPrice) {
  return Math.round((sellableQian * toInt(unitPrice)) / 100)
}

export function qianToJin(q) {
  return q / 100
}

export function fenToYuan(f) {
  return f / 100
}

export function sumOf(list, fn) {
  return list.reduce((s, x) => s + fn(x), 0)
}

// 一笔交易的完整汇总:整数运算,小数返回(供显示)
export function summarize(weighings, globalTare, lossPercent, unitPrice) {
  const gQ = toInt(globalTare)
  const valid = weighings.filter((w) => isValidWeighing(w, gQ))
  const grossQ = sumOf(valid, grossQian)
  const tareQ = sumOf(valid, (w) => effectiveTareQian(w, gQ))
  const netQ = grossQ - tareQ
  const sellableQ = afterLossQian(netQ, lossPercent)
  const priceF = priceInFen(sellableQ, unitPrice)
  return {
    count: valid.length,
    grossQ,
    tareQ,
    netQ,
    sellableQ,
    priceF,
    gross: qianToJin(grossQ),
    tare: qianToJin(tareQ),
    net: qianToJin(netQ),
    sellable: qianToJin(sellableQ),
    price: fenToYuan(priceF)
  }
}

export function round2(x) {
  return Math.round((x + Number.EPSILON) * 100) / 100
}

// 斤:最多 2 位小数,去掉末尾 0
export function fmtJin(x) {
  return String(round2(x))
}

// 金额:固定 2 位小数
export function fmtMoney(x) {
  return round2(x).toFixed(2)
}

// 折损系数(1 − 折损/100),3 位小数显示(避免 0.975 被显示成 0.97)
export function fmtLossFactor(lossPercent) {
  const f = 1 - (Number(lossPercent) || 0) / 100
  return String(Math.round(f * 1000) / 1000)
}

export function todayStr() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function fmtDate(iso) {
  if (!iso) return ''
  const [y, m, d] = String(iso).split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
