<script setup>
import { fmtJin, fmtMoney } from '../lib/utils'

defineProps({
  count: { type: Number, default: 0 },
  totalGross: { type: Number, default: 0 },
  totalNet: { type: Number, default: 0 },
  sellable: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  canSave: { type: Boolean, default: false },
  showDraft: { type: Boolean, default: true },
  primaryLabel: { type: String, default: '完成' }
})

defineEmits(['save', 'draft'])
</script>

<template>
  <div class="summary">
    <div class="summary-inner">
      <div class="sum-items">
        <div class="sum-item">
          <span class="k">称数</span>
          <span class="v">{{ count }}</span>
        </div>
        <div class="sum-item">
          <span class="k">总毛重</span>
          <span class="v">{{ fmtJin(totalGross) }}<i>斤</i></span>
        </div>
        <div class="sum-item">
          <span class="k">总净重</span>
          <span class="v">{{ fmtJin(totalNet) }}<i>斤</i></span>
        </div>
        <div class="sum-item">
          <span class="k">折损后</span>
          <span class="v">{{ fmtJin(sellable) }}<i>斤</i></span>
        </div>
        <div class="sum-item price">
          <span class="k">总价</span>
          <span class="v">¥{{ fmtMoney(totalPrice) }}</span>
        </div>
      </div>
      <div class="summary-actions">
        <button v-if="showDraft" class="btn btn-plain" :disabled="!canSave" @click="$emit('draft')">
          暂存
        </button>
        <button class="btn btn-primary" :disabled="!canSave" @click="$emit('save')">
          {{ primaryLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
