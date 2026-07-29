<template>
  <div style="height: 500px; position: relative;">
    <van-action-sheet 
      :show="true" 
      :actions="actions"
      title="动作面板"
      cancel-text="取消"
      description="动作面板的描述信息"
      :duration="0"
      :lock-scroll="false"
      overlay-class="modal-mask-class"
      :close-on-click-overlay="false"
      :close-on-click-action="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const actions = ref([
  { name: '选项1-禁用', disabled: true },
  { name: '选项2', icon: 'star-o', subname: '二级标题' },
  { name: '选项3', loading: true },
]);
</script>

<style>
.modal-mask-class {
  position: unset!important;
}
.modal-mask-class +.van-popup {
  position: absolute!important;
}
</style>