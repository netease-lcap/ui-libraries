<template>
  <demo-section>

    <demo-block card title="选中省市区">
      <div>value: {{ sarea }}</div>
      <van-area
        label-field="地区选择"
        :value.sync="sarea"
        @confirm="onConfirm"
        @change="onChange"
      />
    </demo-block>

    <demo-block card title="传名称">
      <div>value: {{ sareaName }}</div>
        <van-area converter="name" label-field="地区名称" :value.sync="sareaName" @change="onChange"/>
    </demo-block>

    <demo-block card title="只读">
        <van-area :readonly="true"  converter="name" :value.sync="sareaName" @change="onChange">
          <template #title>标题</template>
        </van-area>
    </demo-block>
    <demo-block card title="禁用">
        <van-area :disabled="true"  converter="name" :value.sync="sareaName" @change="onChange">
          <template #title>标题</template>
        </van-area>
    </demo-block>

  </demo-section>
</template>

<script>
import AreaList from './area';
import AreaListEn from './area-en';

export default {
  i18n: {
    'zh-CN': {
      title2: '选中省市区',
      title3: '配置显示列',
      title4: '配置列占位提示文字',
      columnsPlaceholder: ['请选择', '请选择', '请选择'],
      areaList: AreaList,
    },
    'en-US': {
      title2: 'Initial Value',
      title3: 'Columns Number',
      title4: 'Columns Placeholder',
      columnsPlaceholder: ['Choose', 'Choose', 'Choose'],
      areaList: AreaListEn,
    },
  },

  data() {
    return {
      value: '330302',
      ara1111: '310113',
      sarea: '320600',
      sarea2: "140303",
      sareaName: '浙江省/杭州市/西湖区'
    };
  },
  methods: {
    onChange(...event) {
      console.log('onChange', ...event)
    },
    onConfirm(...event) {
      console.log('onConfirm', ...event)
    }
  }
};
</script>
