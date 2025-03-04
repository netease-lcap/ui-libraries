<!-- 生成一个组件，透传所有的属性给 element plus tree -->
<script setup>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

const props = defineProps({
  // 主要属性
  value: {}, // 选中值
  defaultValue: { default: [] }, // 默认选中值
  allowDrop: {}, // 判断节点是否可以执行 drop 操作
  checkProps: { type: Object }, // checkbox 组件的透传属性
  checkStrictly: { type: Boolean, default: false }, // 父子节点选中状态不关联
  draggable: { type: Boolean }, // 节点是否可拖拽
  empty: { type: String, default: '' }, // 空态文本
  expanded: { type: Array, default: () => [] }, // 展开的节点值
  filter: { type: Function }, // 节点过滤方法
  icon: { type: String }, // 节点图标
  keys: { type: Object }, // 字段别名定义
  label: { default: false }, // 自定义节点内容
  lazy: { type: Boolean, default: false }, // 是否延迟加载
  load: { type: Function }, // 加载子数据的方法
  scroll: { type: Object }, // 懒加载和虚拟滚动配置
  valueMode: { type: String, default: 'onlyLeaf' }, // 选中值模式

  // 数据属性
  dataSource: {}, // 树数据
  valueField: { type: Function }, // 值字段
  parentField: { type: Function }, // 父级值字段
  childrenField: { type: Function }, // 子级值字段
  textField: { type: Function }, // 文本字段

  // 交互属性
  checkable: { type: Boolean, default: false }, // 是否可多选
  disableCheck: { type: Boolean, default: false }, // 禁用复选框
  disabled: { type: Boolean }, // 是否禁用树操作
  expandAll: { type: Boolean, default: false }, // 是否展开全部节点
  expandLevel: { type: Number, default: 0 }, // 默认展开的级别
  expandMutex: { type: Boolean, default: false }, // 同级别展开互斥
  expandOnClickNode: { type: Boolean, default: false }, // 点击节点支持展开收起
  expandParent: { type: Boolean, default: false }, // 自动展开父节点
  hover: { type: Boolean }, // 节点是否有悬浮状态
  line: { type: Boolean, default: false }, // 是否显示连接线
  transition: { type: Boolean, default: true }, // 是否使用过渡动画
  allowFoldNodeOnFilter: { type: Boolean, default: false }, // 是否允许在过滤时折叠节点

  // 样式属性
  height: [String, Number], // 树的高度
  maxHeight: [String, Number], // 树的最大高度
})

const emit = defineEmits([
  'change', // 节点选中状态变化
  'click', // 节点点击
  'expand', // 节点展开或收起
])

// 处理事件
const handleChange = (value) => {
  emit('change', value)
}

const handleNodeClick = (node) => {
  emit('click', {
    node: {
      actived: node.actived,
      checked: node.checked,
      data: node.data,
      disabled: node.disabled,
      expanded: node.expanded,
      indeterminate: node.indeterminate,
      loading: node.loading,
      value: node.value,
      label: node.label,
    }
  })
}

const handleExpand = (node) => {
  emit('expand', node)
}

</script>

<template>
  <el-tree
    v-bind="$attrs"
    :data="dataSource"
    :node-key="valueField"
    :props="{
      children: childrenField,
      label: textField,
      disabled: disableCheck,
      ...keys
    }"
    :default-checked-keys="defaultValue"
    :show-checkbox="checkable"
    :check-strictly="checkStrictly"
    :default-expand-all="expandAll"
    :expand-on-click-node="expandOnClickNode"
    :draggable="draggable"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :lazy="lazy"
    :load="load"
    :filter-node-method="filter"
    :accordion="expandMutex"
    :indent="24"
    :icon="icon"
    :empty-text="empty"
    :height="height"
    :max-height="maxHeight"
    @check="handleChange"
    @node-click="handleNodeClick"
    @node-expand="handleExpand"
  >
    <template #default="{ node, data }">
      <slot name="leaf" :current="{ node, data }" />
    </template>
  </el-tree>
  
</template>