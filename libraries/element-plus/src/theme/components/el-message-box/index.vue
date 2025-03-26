<template>
  <div>
  <div ref="appendEl"  style="position: relative; width: 100%; height: 200px"></div>
    <el-message-box
      :visible="visible" 
      v-if="mounted"
      type="confirm" 
      iconType="info" 
      title="提示" 
      modalClass="box-mask-class"
      :appendTo="appendElRef"
      :closeOnClickModal="false"
      :closeOnPressEscape="false"
      :closeOnHashChange="false"
      :lockScroll="false"
      :beforeClose="handleBeforeClose">
      <template #default><el-text text="确认内容lalalla"></el-text></template>
    </el-message-box>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue';

const appendEl = ref(null);
const mounted = ref(false);
const appendElRef = ref(null);
const visible = ref(true);

onMounted(async () => {
  await nextTick();
  appendElRef.value = appendEl.value;
  mounted.value = true;
});

const handleBeforeClose = (action, instance, done) => {
  // 返回 false 或不调用 done() 来阻止关闭
  return false;
};
</script>
<style>
.box-mask-class {
  position: unset !important;
}

.box-mask-class .el-overlay-message-box {
  position: unset !important;
}
</style>