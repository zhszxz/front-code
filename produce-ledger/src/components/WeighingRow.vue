<script setup>
import { computed } from 'vue'
import { grossOf, effectiveTare, fmtJin } from '../lib/utils'

const props = defineProps({
  modelValue: { type: Object, required: true },
  index: { type: Number, required: true },
  globalTare: { type: Number, default: 0 }
})

defineEmits(['remove'])

const gross = computed(() => grossOf(props.modelValue))
const tare = computed(() => effectiveTare(props.modelValue, props.globalTare))
const net = computed(() => gross.value - tare.value)
const hasData = computed(() => gross.value > 0)
const invalid = computed(() => gross.value < 0 || (gross.value > 0 && net.value <= 0))
const invalidReason = computed(() =>
  gross.value < 0 ? '毛重为负,不计入' : '净重 ≤ 0,不计入'
)

function toggleOverride(val) {
  props.modelValue.overrideTare = val
  // 从全局去皮值开始,方便在此基础上修改
  if (val && props.modelValue.tare == null) {
    props.modelValue.tare = props.globalTare
  }
}
</script>

<template>
  <div class="w-row" :class="{ invalid }">
    <div class="w-head">
      <span class="w-seq">第 {{ index + 1 }} 称</span>
      <span v-if="invalid" class="w-badge bad">{{ invalidReason }}</span>
      <span v-else-if="hasData" class="w-net">净重 {{ fmtJin(net) }} 斤</span>
      <button class="w-del" type="button" aria-label="删除" @click="$emit('remove')">✕</button>
    </div>

    <div class="w-fields">
      <label class="mini">
        <span>毛重(斤)</span>
        <input class="input" type="number" inputmode="decimal" min="0" step="0.01"
          v-model="modelValue.gross" placeholder="如 50.5" />
      </label>

      <div class="tare-ctrl">
        <label class="tare-check">
          <input type="checkbox" :checked="modelValue.overrideTare"
            @change="toggleOverride($event.target.checked)" />
          <span>本称单独去皮</span>
        </label>
        <span v-if="!modelValue.overrideTare" class="tare-hint">
          用全局去皮 {{ fmtJin(globalTare) }} 斤
        </span>
      </div>

      <label v-if="modelValue.overrideTare" class="mini">
        <span>去皮(斤)</span>
        <input class="input" type="number" inputmode="decimal" min="0" step="0.01"
          v-model="modelValue.tare" placeholder="如 2" />
      </label>

      <label class="mini note">
        <span>备注(可选)</span>
        <input class="input" type="text" v-model="modelValue.note" placeholder="如:3 号袋" />
      </label>
    </div>
  </div>
</template>
