<!-- 函数数据源懒加载回显调试 -->
<template>
  <div :style="{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '640px' }">
    <section>
      <h4 :style="{ margin: '0 0 8px' }">场景 1：初始值回显（子节点 value=1.1）</h4>
      <p :style="{ margin: '0 0 8px', color: '#666', fontSize: '12px' }">
        initialLoad=false，仅通过 loadUntilSelectedItem 逐级加载，验证选中项文本能否回显。
      </p>
      <u-tree-select-new
        ref="echoSelect"
        v-model="echoValue"
        :data-source="load"
        text-field="text"
        value-field="value"
        placeholder="请选择"
        clearable
        :style="{ width: '320px' }"
        @select="onEchoSelect"
        @load="onEchoLoad"
      />
      <debug-panel title="场景 1 调试信息" :info="echoDebugInfo" />
    </section>

    <section>
      <h4 :style="{ margin: '0 0 8px' }">场景 2：展开后手动选择</h4>
      <p :style="{ margin: '0 0 8px', color: '#666', fontSize: '12px' }">
        initialLoad=false，需先点击展开加载子级，再选择节点，验证选中后文本回显。
      </p>
      <u-tree-select-new
        ref="manualSelect"
        v-model="manualValue"
        :data-source="load"
        :initial-load="false"
        text-field="text"
        value-field="value"
        placeholder="请展开后选择"
        clearable
        :style="{ width: '320px' }"
        @select="onManualSelect"
        @load="onManualLoad"
      />
      <debug-panel title="场景 2 调试信息" :info="manualDebugInfo" />
    </section>

    <section :style="{ fontSize: '12px', color: '#999' }">
      <div>mock 数据结构：</div>
      <div>根节点 → 节点 1 (value=1) → 节点 1.1 (value=1.1) / 节点 1.2 (value=1.2)</div>
    </section>
  </div>
</template>

<script>
const mockRequest = (data, timeout = 300) => new Promise((resolve) => setTimeout(() => resolve(data), timeout));

const DebugPanel = {
  name: 'debug-panel',
  props: {
    title: String,
    info: Object,
  },
  template: `
    <pre :style="{
      margin: '8px 0 0',
      padding: '12px',
      background: '#f7f8fa',
      border: '1px solid #ebedf0',
      borderRadius: '4px',
      fontSize: '12px',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    }">{{ title }}
{{ formattedInfo }}</pre>
  `,
  computed: {
    formattedInfo() {
      return Object.entries(this.info || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    },
  },
};

export default {
  components: {
    DebugPanel,
  },
  data() {
    return {
      echoValue: '1.1',
      manualValue: null,
      echoLoadCount: 0,
      manualLoadCount: 0,
      echoSelectEvent: '-',
      manualSelectEvent: '-',
    };
  },
  computed: {
    echoDebugInfo() {
      const vm = this.$refs.echoSelect;
      return this.buildDebugInfo(vm, {
        value: this.echoValue,
        loadCount: this.echoLoadCount,
        lastSelectEvent: this.echoSelectEvent,
      });
    },
    manualDebugInfo() {
      const vm = this.$refs.manualSelect;
      return this.buildDebugInfo(vm, {
        value: this.manualValue,
        loadCount: this.manualLoadCount,
        lastSelectEvent: this.manualSelectEvent,
      });
    },
  },
  methods: {
    load(params) {
      console.log('load', params);
      if (!params.node) {
        return mockRequest([
          { text: '节点 1', value: '1' },
          { text: '节点 2', value: '2', isLeaf: true },
        ]);
      }
      if (params.node.value === '1') {
        return mockRequest([
          { text: '节点 1.1', value: '1.1', isLeaf: true },
          { text: '节点 1.2', value: '1.2', isLeaf: true },
        ]);
      }
      return mockRequest([]);
    },
    buildDebugInfo(vm, extra) {
      const selectedItem = vm && vm.selectedItem;
      return {
        ...extra,
        selectedItemText: selectedItem ? selectedItem.text : '(空)',
        selectedItemFound: selectedItem ? '是' : '否',
        dataSourceObjSize: vm && vm.dataSourceObj ? Object.keys(vm.dataSourceObj).length : 0,
      };
    },
    onEchoSelect(event) {
      this.echoSelectEvent = JSON.stringify({
        value: event && event.value,
        nodeText: event && event.node && event.node.text,
      });
    },
    onManualSelect(event) {
      this.manualSelectEvent = JSON.stringify({
        value: event && event.value,
        nodeText: event && event.node && event.node.text,
      });
    },
    onEchoLoad() {
      this.echoLoadCount += 1;
    },
    onManualLoad() {
      this.manualLoadCount += 1;
    },
  },
};
</script>
