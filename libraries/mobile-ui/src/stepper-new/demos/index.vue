<template>
  <demo-section>
    <demo-block>
      <van-cell center title="value:"> {{value}} </van-cell>
      <van-cell center title="精度:">
        <van-stepper-new
          :showPlus="true"
          :showMinus="true"
          :value.sync="precision"
          :decimalLength="0">
        </van-stepper-new>
      </van-cell>

    </demo-block>

    <demo-block title="格式化">
      <van-cell v-if="false" center title="小数位数10,省略小数位数">
        <van-stepper-new
          :value.sync="value"
          :decimalLength="precision"
          :decimal-places="{places:10, omit:true}"
          :highPrecision="true">
        </van-stepper-new>
      </van-cell>

      <van-cell v-if="true" center title="小数位数10,不省略小数位数">
        <van-stepper-new
          :value.sync="value"
          :decimalLength="precision"
          :decimal-places="{ places: 10, omit:false }"
          :highPrecision="true">
        </van-stepper-new>
      </van-cell>

      <van-cell v-if="false" center title="单位">
        <van-stepper-new :value.sync="value" unitType="suffix" unitValue="元" />
      </van-cell>

      <van-cell v-if="false" center title="千分位">
        <van-stepper-new :value.sync="value" :thousandths="true" />
      </van-cell>

      <van-cell v-if="false" center title="百分号">
        <van-stepper-new :value.sync="value" :percentSign="true" />
      </van-cell>

      <van-cell v-if="true" center title="小数3位">
        <van-stepper-new :value.sync="value" :decimalPlacesValue="3" :decimalPlacesOmitZero="false" />
      </van-cell>


      <van-cell v-if="true" center title="不限制小数位">
        <van-stepper-new :value.sync="value" />
      </van-cell>

      <van-cell v-if="false" center title="高级格式化">
        <van-stepper-new :value.sync="value" :advancedFormatEnable="true" advancedFormatValue="#,##0.00" />
      </van-cell>
    </demo-block>

    <demo-block v-if="false" title="基础">
      <van-cell center :title="t('basicUsage')">
        <van-stepper-new :value.sync="value" />
      </van-cell>

      <van-cell center :title="t('basicUsage')">
        <van-stepper-new v-model="stepper1" />
      </van-cell>

      <van-cell center :title="t('step')">
        <van-stepper-new v-model="stepper2" step="2" />
      </van-cell>

      <van-cell center :title="t('range')">
        <van-stepper-new v-model="stepper3" :min="5" :max="8" />
      </van-cell>

      <van-cell center :title="t('integer')">
        <van-stepper-new v-model="stepper4" integer />
      </van-cell>

      <van-cell center :title="t('disabled')">
        <van-stepper-new v-model="stepper5" disabled />
      </van-cell>

      <van-cell center :title="t('disableInput')">
        <van-stepper-new v-model="disabledInput" disable-input />
      </van-cell>

      <van-cell center :title="t('customSize')">
        <van-stepper-new v-model="stepper7" button-size="32px" input-width="40px" />
      </van-cell>

      <van-cell center :title="t('asyncChange')">
        <van-stepper-new :value="stepper6" async-change @change="onChange" />
      </van-cell>

      <van-cell v-if="!isWeapp" center :title="t('roundTheme')">
        <van-stepper-new
          v-model="stepperRound"
          theme="round"
          button-size="22"
          disable-input
        />
      </van-cell>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      step: '步长设置',
      range: '限制输入范围',
      integer: '限制输入整数',
      roundTheme: '圆角风格',
      asyncChange: '异步变更',
      customSize: '自定义大小',
      disableInput: '禁用输入框',
      decimalLength: '固定小数位数',
    },
    'en-US': {
      step: 'Step',
      range: 'Range',
      integer: 'Integer',
      roundTheme: 'Round Theme',
      asyncChange: 'Async Change',
      customSize: 'Custom Size',
      disableInput: 'Disable Input',
      decimalLength: 'Decimal Length',
    },
  },

  data() {
    return {
      precision: 2,
      value: null,

      stepper1: 1,
      stepper2: 1,
      stepper3: 1,
      stepper4: 1,
      stepper5: 1,
      stepper6: 1,
      stepper7: 1,
      stepper8: 1,
      stepperRound: 1,
      disabledInput: 1,
    };
  },

  methods: {
    onChange(value) {
      this.$toast.loading({ forbidClick: true });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.stepper6 = value;
        this.$toast.clear();
      }, 500);
    },
  },
};
</script>
