<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { ElSteps, ElStep } from 'element-plus'
import { EpPropMergeType } from 'element-plus/es/utils/index.mjs'

const props = defineProps({
  // 数据属性
  dataSource: {
    type: [Array, Object, Function],
    default: undefined
  },
  dataSchema: {
    type: Object,
    default: undefined
  },
  nameField: {
    type: Function,
    default: (item: any) => item.name
  },
  active: {
    type: [Number, String],
    default: 0
  },

  // 主要属性
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  },
  processStatus: {
    type: String,
    validator: (value: string) => ['wait', 'process', 'finish', 'error', 'success'].includes(value)
  },
  finishStatus: {
    type: String,
    default: 'finish',
    validator: (value: string) => ['wait', 'process', 'finish', 'error', 'success'].includes(value)
  },

  // 样式属性
  space: {
    type: [Number, String],
    default: undefined
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  simple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:active', 'change'])
const slots = useSlots()

// 处理数据源
const stepList = computed(() => {
  if (!props.dataSource) return []
  
  // 处理函数类型的数据源
  if (typeof props.dataSource === 'function') {
    const result = props.dataSource()
    if (Array.isArray(result)) return result
    return result.list || []
  }
  
  // 处理数组和对象类型的数据源
  if (Array.isArray(props.dataSource)) return props.dataSource
  return props.dataSource.list || []
})

// 处理当前激活步骤
const currentActive = computed({
  get() {
    if (typeof props.active === 'number') return props.active
    if (typeof props.active === 'string') {
      const index = stepList.value.findIndex(item => props.nameField(item) === props.active)
      return index === -1 ? 0 : index
    }
    return 0
  },
  set(value) {
    const newValue = typeof props.active === 'string' 
      ? props.nameField(stepList.value[value])
      : value
    emit('update:active', newValue)
    emit('change', newValue)
  }
})

// 暴露方法
const stepsRef = ref()
defineExpose({
  prev: () => {
    if (currentActive.value > 0) {
      currentActive.value--
    }
  },
  next: () => {
    if (currentActive.value < stepList.value.length - 1) {
      currentActive.value++
    }
  },
  reload: () => {
    // 实现重新加载逻辑
  }
})
// 将 direction 从 String 类型改成符合规范的类型
const direction_ = props.direction as EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown> | undefined
// processStatus 和 finishStatus 也要改一下
const processStatus_ = props.processStatus as EpPropMergeType<StringConstructor, "finish" | "wait" | "process" | "error" | "success", unknown> | undefined
const finishStatus_ = props.finishStatus as EpPropMergeType<StringConstructor, "finish" | "wait" | "process" | "error" | "success", unknown> | undefined
</script>

<template>
  <el-steps
    ref="stepsRef"
    v-bind="$attrs"
    :active="currentActive"
    :direction="direction_"
    :process-status="processStatus_"
    :finish-status="finishStatus_"
    :space="space"
    :align-center="alignCenter"
    :simple="simple"
  >
    <template v-if="dataSource">
      <el-step
        v-for="(item, index) in stepList"
        :key="index"
        :name="nameField(item)"
      >
        <template #title v-if="$slots.title">
          <slot
            name="title"
            :item="item"
            :index="index"
            :row-index="index"
          />
        </template>
        <template #description v-if="$slots.description">
          <slot
            name="description"
            :item="item"
            :index="index"
            :row-index="index"
          />
        </template>
      </el-step>
    </template>
    <template v-else>
      <slot />
    </template>
  </el-steps>
</template>