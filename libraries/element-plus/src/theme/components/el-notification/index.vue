<template>
  <div>
    <div ref="appendEl"  style="position: relative; width: 100%; height: 200px; overflow: visible;"></div>
    <el-notification 
      v-if="mounted"
      title="提示" 
      :visible="visible"
      type="info" 
      :duration="0"
      :showClose="false" 
      :appendTo="appendElRef">
      <template #default><el-text text="消息内容"></el-text></template>
    </el-notification>
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
</script>

<style>
.el-notification {
  position: absolute !important;
  top: 16px !important;
  right: 16px !important;
}
</style>