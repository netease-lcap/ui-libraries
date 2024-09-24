<!-- 自定义模板 -->
<!--  可以自定义备选项 -->
<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cities: [
        {
          value: 'Beijing',
          label: '北京',
        },
        {
          value: 'Shanghai',
          label: '上海',
        },
        {
          value: 'Nanjing',
          label: '南京',
        },
        {
          value: 'Chengdu',
          label: '成都',
        },
        {
          value: 'Shenzhen',
          label: '深圳',
        },
        {
          value: 'Guangzhou',
          label: '广州',
        },
      ],
      value: '',
    };
  },
};
</script>
