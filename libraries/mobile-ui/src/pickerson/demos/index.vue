<template>
  <demo-section>
    <demo-block card title="列表多选">
      <div>pickerValue: {{ pickerValue }}</div>
      <van-pickerson
        :clearable="false"
        :multiple="false"
        :enable-select-all="true"
        :enable-selected-count="false"
        type="list"
        ref="pickerson1"

        title="标题"
        :show-toolbar="true"
        :value.sync="pickerValue"
        :data-source="load"
        :pageable="true"
        :pageSize="10"
        :filterable="true"
        @confirm="confirm111"
        @change="change111">
        <template #title>
            <van-text ref="text19" text="标题"></van-text>
        </template>
      </van-pickerson>
    </demo-block>

    <van-button @click="reload">reload</van-button>

    <demo-block card title="列表静态数据">
      <van-pickerson
        :ref="`pickerson2`"
        title="标题"
        :show-toolbar="true"
        :data-source="list"
        :value.sync="pickerValue"
        :pageable="true"
        :pageSize="10"
        :multiple="true"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="只读">
      <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true"
        :readonly="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="禁用">
      <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true"
        :disabled="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="预览模式">
      <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        value-field="value"
        text-field="text"
        :data-source="[{ text: '选项1', value: 1 }, { text: '选项2', value: 2 }, { text: '选项3', value: 3 }]"
        type="list"
        :enable-select-all="true"
        :enable-selected-count="true"
        preview>
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="临时测试">
        <van-pickerson
        title="标题"
        :show-toolbar="true"
        :value="1"
        :data-source="[1, 2, 3, 4, 5]"
        :close-on-click-overlay="true">
          <template #title>
                <van-text :ref="`text10`" text="标题"></van-text>
          </template>
      </van-pickerson>
    </demo-block>

    <demo-block card title="测试">

      <van-pickerson :ref="`pickerson_1`" :title="`标题`" :showToolbar="true" :pageSize="50" v-dependencies.reload="[]" :dataSource="list" :textField="`text`"
          :valueField="`value`" :type="`list`" :inputAlign="`left`" :filterable="true" :value.sync="pickerValue">
          <template #picker-bottom :ref="`template_1`">
              <van-picker-action-slot :ref="`picker_action_slot_1`" :targetMethod="`cancel`">
                  <van-button :ref="`button_1`" :type="`info_secondary`" :size="`normal`" :text="`取消`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
              <van-picker-action-slot :ref="`picker_action_slot_2`" :targetMethod="`confirm`">
                  <van-button :ref="`button_2`" :type="`info`" :size="`normal`" :text="`确认`" :squareroud="`round`"></van-button>
              </van-picker-action-slot>
          </template>
          <template #picker-top :ref="`template_2`">
              <van-picker-action-slot :ref="`picker_action_slot_3`" :targetMethod="`cancel`">
                  <van-iconv :ref="`iconv_1`" :name="`left-arrow`" :icotype="`only`"></van-iconv>
              </van-picker-action-slot>
              <van-picker-action-slot :ref="`picker_action_slot_4`" :targetMethod="`confirm`"></van-picker-action-slot>
          </template>
          <template #pannel-title :ref="`template_3`">
              <van-text :ref="`text_1`" :text="`标题`"></van-text>
          </template>
          <template #title :ref="`template_4`">
              <van-text :ref="`text_2`" :text="`标题`"></van-text>
          </template>
          <template #option="current" :ref="`template_5`"></template>
      </van-pickerson>
    </demo-block>
  </demo-section>
</template>

<script>
const data = [
  { 'text': '浙江省', 'value': '330000' },
  { 'text': '杭州市', 'value': '330100', 'parentId': '330000' },
  { 'text': '宁波市', 'value': '330200', 'parentId': '330000' },
  { 'text': '江苏省', 'value': '320000' },
  { 'text': '江苏省1', 'value': '320001' },
  { 'text': '江苏省2', 'value': '320002' },
  { 'text': '江苏省3', 'value': '320003' },
  { 'text': '江苏省4', 'value': '320004' },
  { 'text': '江苏省5', 'value': '320005' },
  { 'text': '江苏省6', 'value': '320006' },
  { 'text': '江苏省7', 'value': '320007' },
  { 'text': '江苏省8', 'value': '320008' },
  { 'text': '江苏省9', 'value': '320009' },
  { 'text': '江苏省14', 'value': '3200010' },
  { 'text': '江苏省24', 'value': '3201000' },
  { 'text': '江苏省34', 'value': '320000000' },
  { 'text': '江苏省44', 'value': '320100220' },
  { 'text': '江苏省54', 'value': '32011000' },
  { 'text': '江苏省64', 'value': '320111000' },
  { 'text': '江苏省74', 'value': '3210111000' },
  { 'text': '江苏省84', 'value': '3120000' },
  { 'text': '江苏省94', 'value': '32100010' },
  { 'text': '江苏省114', 'value': '31201000' },
  { 'text': '江苏省124', 'value': '32110111000' },
  { 'text': '江苏省134', 'value': '32001100' },
  { 'text': '江苏省144', 'value': '320110010' },
  { 'text': '江苏省154', 'value': '32001111100' },
]

export default {
  data() {
    return {
      son: '温州',
      showPicker: false,
      fieldValue: '',
      pupupd: true,
      list: data,
      pickerValue: ['32001111100'],
    };
  },

  computed: {
    columns() {
      const column = this.t('column3');
      return [
        {
          values: Object.keys(column),
          className: 'column1',
        },
        {
          values: column[Object.keys(column)[0]],
          className: 'column2',
          defaultIndex: 2,
        },
      ];
    },
  },

  methods: {
    onChange1(picker, value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onChange2(picker, values) {
      picker.setColumnValues(1, this.t('column3')[values[0]]);
    },

    onConfirm(value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onCancel() {
      this.$toast(this.t('cancel'));
    },

    onClickField() {
      this.showPicker = true;
    },

    onConfirm2(value) {
      this.showPicker = false;
      this.fieldValue = value;
    },
    onConfirm222(value) {
      console.log(value);
    },
    onCancel2() {
      this.showPicker = false;
    },
    confirm111(value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`confirm 当前值：${value}, 当前索引：${index}`);
    },
    change111(picker, value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`change 当前值：${value}, 当前索引：${index}`);
    },
    load(params) {
      const { page, size, filterText } = params;

      let arr = data.filter(item => item.text.includes(filterText))

      return {
        total: arr.length,
        list: arr.slice((page - 1) * size, page * size)
      }
    },
    reload() {
      this.$refs.pickerson1.reload()
    }
  },
};
</script>
