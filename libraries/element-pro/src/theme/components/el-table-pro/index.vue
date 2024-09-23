<template>
  <div>
    <el-radio-group-pro v-model="size">
      <el-radio-pro value="small">小尺寸</el-radio-pro>
      <el-radio-pro value="medium">中尺寸</el-radio-pro>
      <el-radio-pro value="large">大尺寸</el-radio-pro>
    </el-radio-group-pro>
    <div style="margin: 10px 0;">
      <el-checkbox-pro v-model="bordered">是否显示边框</el-checkbox-pro>
      <el-checkbox-pro v-model="hover" style="margin: 0 25px">是否有 hover 态</el-checkbox-pro>
      <el-checkbox-pro v-model="showHeader">是否显示表头</el-checkbox-pro>
      <el-checkbox-pro v-model="stripe" style="margin: 0 25px">是否显示斑马纹</el-checkbox-pro>
      <el-checkbox-pro v-model="isEmptyData">是否置空数据</el-checkbox-pro>
    </div>
    <el-table-pro row-key="index" :dataSource="isEmptyData ? [] : data" :stripe="stripe" :bordered="bordered"
      :hover="hover" :size="size" :showHeader="showHeader" :sort="sort" @sort-change="sortChange"
      :showSortColumnBgColor="true">
      <el-table-column-pro 
        v-for="({ colKey, title, width, fixedPosition, sorter }) in columns" 
        :key="colKey"
        :title="title" 
        :colKey="colKey" 
        :width="width" 
        :sorter="sorter" 
        :fixed='fixedPosition'>
        <template #cell="cell">
          <div>{{ cell.item[colKey] }}</div>
        </template>
      </el-table-column-pro>
    </el-table-pro>
  </div>
</template>
<script>

export default {
  data() {
    const initialData = [];
    const total = 28;
    for (let i = 0; i < total; i++) {
      initialData.push({
        index: i + 1,
        applicant: ['贾明', '张三', '王芳'][i % 3],
        status: i % 3,
        channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
        matters: [
          '宣传物料制作费用',
          'algolia 服务报销',
          '相关周边制作费',
          '激励奖品快递费',
        ][i % 4],
        time: [2, 3, 1, 4][i % 4],
        createTime: [
          '2022-01-01',
          '2022-02-01',
          '2022-03-01',
          '2022-04-01',
          '2022-05-01',
        ][i % 4],
        applyTime: [
          '2022-01-01',
          '2022-02-01',
          '2022-03-01',
          '2022-04-01',
          '2022-05-01',
        ][i % 4],
        modifyTime: [
          '2022-01-01',
          '2022-02-01',
          '2022-03-01',
          '2022-04-01',
          '2022-05-01',
        ][i % 4],
        confirmTime: [
          '2022-01-01',
          '2022-02-01',
          '2022-03-01',
          '2022-04-01',
          '2022-05-01',
        ][i % 4],
      });
    }
    return {
      data: initialData,
      bordered: true,
      hover: true,
      showHeader: true,
      stripe: true,
      isEmptyData: false,
      size: 'small',
      columns: [
        { colKey: 'applicant', title: '申请人', width: '100', fixedPosition: 'left', },
        { colKey: 'status', title: '申请状态', width: '150', sorter: true },
        { colKey: 'channel', title: '签署方式', width: '200' },
        { colKey: 'email', title: '邮箱地址', ellipsis: true, width: '250' },
        { colKey: 'createTime', title: '创建时间', width: '350' },
        { colKey: 'applyTime', title: '申请时间', width: '350' },
        { colKey: 'modifyTime', title: '修改时间', width: '350' },
        { colKey: 'confirmTime', title: '确认时间', width: '350' },
      ],
      sort: {},
    }
  },
  methods: {
    sortChange(sortInfo) {
      this.sort = sortInfo;
      this.sortData(sortInfo);
    },
    sortData(sort) {
      if (sort) {
        this.data = this.data
          .concat()
          .sort((a, b) => (sort.descending ? b[sort.sortBy] - a[sort.sortBy] : a[sort.sortBy] - b[sort.sortBy]));
      } else {
        this.data = this.data.concat();
      }
    },
  },
};
</script>
