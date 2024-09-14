<template>
  <div direction="vertical">
    <div>值模式： {{ valueMode  }}</div>
    <div>
      <div>value: {{ value }}</div>
      <div>expanded: {{ expanded }}</div>
    </div>
    <el-tree-pro
      :value.sync="value"
      :expanded.sync="expanded"

      :checkable="true"

      :expand-on-click-node="false"
      :valueMode="valueMode"

      :data-source="items"
      value-field="id"
      text-field="name"
      parent-field="pid"
      children-field="children"

      @click="handleClick"
    >
      <template #leaf="current">
        <span>custom {{ log(current) }}</span>
      </template>
    </el-tree-pro>
  </div>
</template>

<script>
// 注意这个示例，同步属性的赋值方式与 vue3 api 不同
export default {
  data() {
    return {
      valueMode: 'parentFirst', // onlyLeaf/parentFirst/all
      value: undefined,
      expanded: undefined,
      items: [
        {
          id: '1',
          name: '1',
          children: [
            {
              id: '1.1',
              name: '1.1',
              children: [
                {
                  id: '1.1.1',
                  name: '1.1.1',
                  children: [
                    {
                      id: '1.1.1.1',
                      name: '1.1.1.1',
                    },
                    {
                      id: '1.1.1.2',
                      name: '1.1.1.2',
                    },
                  ],
                },
                {
                  id: '1.1.2',
                  name: '1.1.2',
                  children: [
                    {
                      id: '1.1.2.1',
                      name: '1.1.2.1',
                    },
                    {
                      id: '1.1.2.2',
                      name: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              id: '1.2',
              name: '1.2',
              children: [
                {
                  id: '1.2.1',
                  name: '1.2.1',
                  children: [
                    {
                      id: '1.2.1.1',
                      name: '1.2.1.1',
                    },
                    {
                      id: '1.2.1.2',
                      name: '1.2.1.2',
                    },
                  ],
                },
                {
                  id: '1.2.2',
                  name: '1.2.2',
                  children: [
                    {
                      id: '1.2.2.1',
                      name: '1.2.2.1',
                    },
                    {
                      id: '1.2.2.2',
                      name: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '2',
          name: '2',
          children: [
            {
              id: '2.1',
              name: '2.1',

            },
            {
              id: '2.2',
              name: '2.2',

            },
          ],
        },
        {
          id: '1.3',
          name: '1.3',
          pid: '1',
        }
      ],
    };
  },
  methods: {
    handleClick(data) {
      console.log('click', data);
    },
    log(data) {
      console.log('data:', data);
      return data?.item?.name;
    },
  },
};
</script>
