<!-- 筛选方式 -->

<template>
  <div>
    <u-tree-select-new v-model="value1" valueField="value1" textField="text1" :data-source="dataSource" placeholder="包括" :filterable="true"
      matchMethod="includes">
    </u-tree-select-new>

    <u-tree-select-new v-model="value2" valueField="value1" textField="text1" :data-source="dataSource" placeholder="匹配开头" filterable
      matchMethod="startsWith" checkable clearable>
    </u-tree-select-new>

    <u-tree-select-new v-model="value3" valueField="value1" textField="text1" :data-source="dataSource"  placeholder="匹配结尾" filterable
      matchMethod="endsWith">
    </u-tree-select-new>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '1',
      value2: [],
      value3: '1',
      dataSource: [
        {
          text1: '节点 1', value1: '1', children: [
            { text1: '节点 1.1', value1: '1.1' },
            {
              text1: '节点 1.2', value1: '1.2', children: [
                { text1: '节点 1.2.1', value1: '1.2.1' },
                { text1: '节点 1.2.2', value1: '1.2.2' },
              ]
            },
            { text1: '节点 1.3', value1: '1.3' },
            { text1: '节点 1.4', value1: '1.4' },
          ]
        },
        { text1: '节点 2', value1: '2' },
        {
          text1: '节点 3', value1: '3', children: [
            { text1: '节点 3.1', value1: '3.1' },
            { text1: '节点 3.2', value1: '3.2' },
          ]
        },
      ],
    };
  },
}
</script>