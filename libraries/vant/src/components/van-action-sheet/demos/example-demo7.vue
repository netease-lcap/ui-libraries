<template>
  <div>
    <van-cell is-link title="自定义面板" @click="show = true" />
    <van-action-sheet 
      v-model:show="show" 
      title="标题" 
      :dataSource="dataSource"
      nameField="title"
      loadingField="isLoading"
      @callBack="handleCallBack">
    </van-action-sheet>
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
