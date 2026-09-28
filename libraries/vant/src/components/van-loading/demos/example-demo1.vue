<template>
  <!-- 表格内容（数据加载完成后显示） -->
  <div>
    <button @click="loading = !loading">点击切换loading展示</button>
    <van-loading :isLoading="loading" type="spinner" size="20">
      <div v-for="item in tableData" :key="item.id" style="width: 200px; height: 100px; background-color: blueviolet;">
        <van-text :text="item.name" />
        <van-text :text="item.age" />
        <van-text :text="item.address" />
      </div>
    </van-loading>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon as VanIcon } from 'vant';

const loading = ref(true); // 初始加载状态
const tableData = ref([]); // 表格数据
// 模拟数据请求
onMounted(async () => {
  try {
    // 显示加载状态
    loading.value = true;

    // 模拟接口请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 获取数据成功
    tableData.value = [
      { name: '张三', age: 28, address: '上海市' },
      { name: '李四', age: 32, address: '北京市' },
      { name: '王五', age: 45, address: '广州市' }
    ];
  } catch (error) {
    console.error('数据加载失败:', error);
  } finally {
    // 隐藏加载状态
    loading.value = false;
  }
});
</script>