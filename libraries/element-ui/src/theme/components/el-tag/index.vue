<template>
  <div>
    <el-flex alignment="center" style="margin-bottom: 20px">
      <el-text size="small">Light带描边：</el-text>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        closable
        hit>
        {{ item.label }}
      </el-tag>
    </el-flex>
    <el-flex alignment="center" style="margin-bottom: 20px">
      <el-text size="small">Light无描边：</el-text>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        closable>
        {{ item.label }}
      </el-tag>
    </el-flex>
    <el-flex alignment="center" style="margin-bottom: 20px">
      <el-text size="small">Dark无描边：</el-text>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark"
        closable>
        {{ item.label }}
      </el-tag>
    </el-flex>
    <el-flex alignment="center">
      <el-text size="small">Plain无描边：</el-text>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="plain"
        closable>
        {{ item.label }}
      </el-tag>
    </el-flex>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' },
      ],
    };
  },
};
</script>