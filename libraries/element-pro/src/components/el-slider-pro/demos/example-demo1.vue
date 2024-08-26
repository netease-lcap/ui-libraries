<!-- 基础示例 -->
<template>
    <div>
      <div class="block">
        <el-slider-pro :value.sync="value" @change="handleChange" @changeEnd="handleChangeEnd" :showStep="true" :step="20" label="${value}%"/>
        {{ value }}
      </div>
      <div class="block" style="margin-top:50px">
        <el-slider-pro :tooltipProps="{ placement: 'left', showArrow:false }" layout="vertical" style="height:200px" :label="false"/>
      </div>
      <div class="block" style="margin-top:50px">
        <el-slider-pro :label="renderLabel" :range="true"/>
      </div>

      <div class="block" style="margin-top:50px">
        <el-button @click="showLabelTooltip=!showLabelTooltip">展示tooltip</el-button>
        <el-slider-pro :showLabelTooltip="showLabelTooltip" unit="%"/>
        {{ showLabelToolTip }}
      </div>
      <div class="block" style="margin-top:50px">
        <el-slider-pro :marks="marks1"/>
      </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        value: 12,
        showLabelTooltip: null,
        // marks1: {
        //     0: '0°C',
        //     20: '20°C',
        //     40: '40°C',
        //     60: '60°C',
        //     80: '80°C',
        //     100: '100°C',
        // },
        marks1: [0,20,40,60,80,100]
      };
    },
    methods: {
        handleChange(value) {
            console.log('the change end value is:', value);
        },
        handleChangeEnd(endValue) {
            console.log('the change end value is:', endValue);
        },
        renderLabel(h, { value, position }) {
            console.log(`the position is ${position}`);
            return `${value}%`;
        }
    },
  };
  </script>
  