<template>
  <div>
    <el-tabs type="card" closable @tab-remove="el_tabs_30_tabremove">
      <el-tab-pane  label="标签一222" name="1">
        {{ 1 }}
      </el-tab-pane>
      <el-tab-pane  label="333" name="2">
 
        {{ 2 }}
      </el-tab-pane>
      <el-tab-pane label="444" name="3">
 
        {{ 2 }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TabPaneName } from 'element-plus';

let tabIndex = 2;
const editableTabsValue = ref('2');
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content2',
  },
]);

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  });
  editableTabsValue.value = newTabName;
};
const el_tabs_30_tabremove = (targetName: TabPaneName) => {
  console.log(targetName);
  return;
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
