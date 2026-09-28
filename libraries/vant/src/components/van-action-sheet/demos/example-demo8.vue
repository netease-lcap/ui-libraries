<template>
  <div>
    <van-cell is-link title="自定义选项" @click="show = true" />
    <!-- <van-action-sheet 
      v-model:show="show" 
      title="标题" 
      :dataSource="dataSource"
      nameField="title"
      loadingField="isLoading"
      @callBack="handleCallBack">
      <template #action="{ action, index }">
        <van-text>{{ action.title }}: {{ index }}</van-text>
      </template>
</van-action-sheet> -->
    <van-action-sheet nameField="" subNameField="" colorField="" iconField="" loadingFiled="" disabledField=""
      title="aa" key="component-aa9f81ae89124745adab2554686912c8" :show="true" :dataSource="[{},{},{}]">
      <template #description>
        <div data-nodepath="20f9455adddb4fdbadabd2556c684f53">
          <EmptySlot data-emptyslot-nodepath="20f9455adddb4fdbadabd2556c684f53"></EmptySlot>
        </div>
      </template>
      <template #cancel>
        <div data-nodepath="0ab7d3cb6f074256b3dd89baac04ba0c">
          <EmptySlot data-emptyslot-nodepath="0ab7d3cb6f074256b3dd89baac04ba0c"></EmptySlot>
        </div>
      </template></van-action-sheet>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const show = ref(false);

const dataSource = ref([]);

const handleCallBack = (action) => {
  console.log('🍊点击了选项', action);
};

const getDataSource = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: '选项1', color: 'red', subName: '选项1-subname', icon: 'cart-o', isLoading: false, disabled: false },
        { title: '选项2', color: 'yellowgreen', subName: '选项2-subname', icon: 'shop-o', isLoading: true, disabled: false },
        { title: '选项3', color: 'blue', subName: '选项3-subname', icon: 'star-o', isLoading: false, disabled: true },
      ]);
    }, 1000);
  });
};

onMounted(() => {
  getDataSource().then((res) => {
    dataSource.value = res;
  });
});

</script>

<style>
.content {
  padding: 16px 16px 160px;
}
</style>
