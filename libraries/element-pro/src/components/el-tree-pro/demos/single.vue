<template>
  <div direction="vertical">
    <div>
      <div>value: {{ value }}</div>
      <div>expanded: {{ expanded }}</div>
    </div>
    <el-tree-pro
      :value.sync="value"
      :expanded.sync="expanded"

      :checkable="false"

      :expand-on-click-node="false"

      :data-source="items"
      value-field="value"
      text-field="label"
      children-field="children"

      @click="handleClick"
    >
      <template #leaf="current">
        <span>custom {{ current.item?.label }}</span>
      </template>
    </el-tree-pro>
  </div>
</template>

<script>
// 注意这个示例，同步属性的赋值方式与 vue3 api 不同
export default {
  data() {
    return {
      value: undefined,
      expanded: undefined,
      items: [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',

            },
            {
              value: '2.2',
              label: '2.2',

            },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(data) {
      console.log('click', data);
    },
  },
};
</script>
