<template>
  <demo-section>
    <demo-block>
        <van-cascader
          v-model="base.value2"
          :title="t('selectArea')"
          :dataSource="[{ 'text': '浙江省', 'value': '330000' }, { 'text': '杭州市', 'value': '330100', 'parentId': '330000' }, { 'text': '宁波市', 'value': '330200', 'parentId': '330000' },  { 'text': '江苏省', 'value': '320000' }]"

          :tree-display="true"

          :filterable="true"
          :closeOnClickOverlay="true"
          @close="base.show = false"
          @finish="onFinish1('base', $event)"
          @change="onChange"
        >
        <template #title><van-text text="地区"></van-text></template>
      </van-cascader>
    </demo-block>

    <demo-block card title="只读">
        <van-cascader
          v-model="base.value2"
          :title="t('selectArea')"
          :dataSource="[{ 'text': '浙江省', 'value': '330000' }, { 'text': '杭州市', 'value': '330100', 'parentId': '330000' }, { 'text': '宁波市', 'value': '330200', 'parentId': '330000' }, { 'text': '江苏省', 'value': '320000' }]"

          :tree-display="true"

          :filterable="true"
          :closeOnClickOverlay="true"
          @close="base.show = false"
          @finish="onFinish1('base', $event)"
          readonly
        >
        <template #title><van-text text="地区"></van-text></template>
      </van-cascader>
    </demo-block>

    <demo-block card title="禁用">
        <van-cascader
          v-model="base.value2"
          :title="t('selectArea')"
          :dataSource="[{ 'text': '浙江省', 'value': '330000' }, { 'text': '杭州市', 'value': '330100', 'parentId': '330000' }, { 'text': '宁波市', 'value': '330200', 'parentId': '330000' }, { 'text': '江苏省', 'value': '320000' }]"

          :tree-display="true"

          :filterable="true"
          :closeOnClickOverlay="true"
          @close="base.show = false"
          @finish="onFinish1('base', $event)"
          disabled
        >
        <template #title><van-text text="地区"></van-text></template>
      </van-cascader>
    </demo-block>
  </demo-section>
</template>

<script>
import zhCNOptions from './area-zh-CN';
import enUSOptions from './area-en-US';
import { deepClone } from '../../utils/deep-clone';

export default {
  i18n: {
    'zh-CN': {
      area: '地区',
      options: zhCNOptions,
      selectArea: '请选择所在地区',
      customColor: '自定义颜色',
      asyncOptions: '异步加载选项',
      asyncOptions1: [
        {
          text: '浙江省',
          value: '330000',
          children: [],
        },
      ],
      asyncOptions2: [
        { text: '杭州市', value: '330100' },
        { text: '宁波市', value: '330200' },
      ],
      customFieldNames: '自定义字段名',
    },
  },

  data() {
    return {
      valuepopup: false,
      optionstesttt: [{"text":"浙江省","value":"330000","children":[{"text":"杭州市","value":"330100","children":[{"text":"上城区","value":"330102"},{"text":"下城区","value":"330103"},{"text":"江干区","value":"330104"}]},{"text":"宁波市","value":"330200","children":[{"text":"海曙区","value":"330203"},{"text":"江北区","value":"330205"},{"text":"北仑区","value":"330206"}]},{"text":"温州市","value":"330300","children":[{"text":"鹿城区","value":"330302"},{"text":"龙湾区","value":"330303"},{"text":"瓯海区","value":"330304"}]}]},{"text":"江苏省","value":"320000","children":[{"text":"南京市","value":"320100","children":[{"text":"玄武区","value":"320102"},{"text":"秦淮区","value":"320104"},{"text":"建邺区","value":"320105"}]},{"text":"无锡市","value":"320200","children":[{"text":"锡山区","value":"320205"},{"text":"惠山区","value":"320206"},{"text":"滨湖区","value":"320211"}]},{"text":"徐州市","value":"320300","children":[{"text":"鼓楼区","value":"320302"},{"text":"云龙区","value":"320303"},{"text":"贾汪区","value":"320305"}]}]}],
      base: {
        show: false,
        show2: false,
        value2: '',
        value: '',
        result: '',
      },
      customColor: {
        show: false,
        value: null,
        result: '',
      },
      async: {
        show: false,
        value: null,
        result: '',
        options: [],
      },
      customFieldNames: {
        show: false,
        value: null,
        result: '',
      },
      fieldNames: {
        text: 'name',
        value: 'code',
        children: 'items',
      },
    };
  },

  computed: {
    customFieldOptions() {
      const options = deepClone(this.t('options'));
      const adjustFieldName = (item) => {
        if ('text' in item) {
          item.name = item.text;
          delete item.text;
        }
        if ('value' in item) {
          item.code = item.value;
          delete item.value;
        }
        if ('children' in item) {
          item.items = item.children;
          delete item.children;
          item.items.forEach(adjustFieldName);
        }
      };

      options.forEach(adjustFieldName);
      return options;
    },
  },

  created() {
    this.async.options = this.t('asyncOptions1');
  },

  methods: {
    loadDynamicOptions({ value }) {
      if (value === '330000') {
        setTimeout(() => {
          this.async.options[0].children = this.t('asyncOptions2');
        }, 500);
      }
    },

    onFinish1(type, { value, selectedOptions }) {
      console.log(arguments);

      const result = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');

      this[type] = {
        ...this[type],
        value,
        result,
      };
      console.log('onFinish1', this.base.value);
    },

    onFinish(type, { value, selectedOptions }) {
      const result = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');

      this[type] = {
        ...this[type],
        show: false,
        value,
        result,
      };
    },
    onChange(value) {
      console.log('onChange', arguments);
    },
  },
};
</script>
