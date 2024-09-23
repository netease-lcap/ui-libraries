<!-- 高级扩展 -->
<!--  除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果： `transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。 如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求，它接受一个`Boolean`，设置为`true`即可。 事实上，这是基于 [Vue-popper](https://github.com/element-component/vue-popper) 的扩展，你可以自定义任意 Vue-popper 中允许定义的字段。 当然 Tooltip 组件实际上十分强大，文末的API文档会做一一说明。 -->
<template>
  <div>
    <el-tooltip
      :disabled="disabled"
      content="点击关闭 tooltip 功能"
      placement="bottom"
      effect="light">
      <el-button @click="disabled = !disabled"
        >点击{{ disabled ? '开启' : '关闭' }} tooltip 功能</el-button
      >
    </el-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
    };
  },
};
</script>
