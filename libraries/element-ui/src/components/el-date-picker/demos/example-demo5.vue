<!-- 日期格式 -->
<!--  使用`format`指定输入框的格式；使用`value-format`指定绑定值的格式。 默认情况下，组件接受并返回`Date`对象。以下为可用的格式化字符串，以 UTC 2017年1月2日 03:04:05 为例： | 格式 | 含义 | 备注 | 举例 | |------|------|------|------|------| | `yyyy` | 年 | | 2017 | | `M`  | 月 | 不补0 | 1 | | `MM` | 月 | | 01 | | `W`  | 周 | 仅周选择器的 `format` 可用；不补0 | 1 | | `WW` | 周 | 仅周选择器的 `format` 可用 | 01 | | `d`  | 日 | 不补0 | 2 | | `dd` | 日 | | 02 | | `H`  | 小时 | 24小时制；不补0 | 3 | | `HH` | 小时 | 24小时制 | 03 | | `h`  | 小时 | 12小时制，须和 `A` 或 `a` 使用；不补0 | 3 | | `hh` | 小时 | 12小时制，须和 `A` 或 `a` 使用 | 03 | | `m`  | 分钟 | 不补0 | 4 | | `mm` | 分钟 | | 04 | | `s`  | 秒 | 不补0 | 5 | | `ss` | 秒 | | 05 | | `A`  | AM/PM | 仅 `format` 可用，大写 | AM | | `a`  | am/pm | 仅 `format` 可用，小写 | am | | `timestamp` | JS时间戳 | 仅 `value-format` 可用；组件绑定值为`number`类型 | 1483326245000 | | `[MM]` | 不需要格式化字符 | 使用方括号标识不需要格式化的字符 (如  [A] [MM])  | MM | -->
<template>
  <div>
    <div class="block">
      <span class="demonstration">默认为 Date 对象</span>
      <div class="demonstration">值：{{ value1 }}</div>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value2 }}</div>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">时间戳</span>
      <div class="demonstration">值：{{ value3 }}</div>
      <el-date-picker
        v-model="value3"
        type="date"
        placeholder="选择日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="timestamp">
      </el-date-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
    };
  },
};
</script>
