import Component from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';
import ExampleDemo2 from '../demos/example-demo2.vue';
import ExampleDemo3 from '../demos/example-demo3.vue';

export default {
  id: 'el-menu-examples',
  title: '组件列表/MENU 导航菜单/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  适用广泛的基础用法。 */
export const Example1 = {
  name: '顶栏',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  垂直菜单，可内嵌子菜单。 */
export const Example2 = {
  name: '侧栏',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo2,
    },
    template: '<example-demo></example-demo>',
  }),
};

/*  */
export const Example3 = {
  name: '折叠',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo3,
    },
    template: '<example-demo></example-demo>',
  }),
};

export const Example4 = {
  name: '数据源',
  render: () => ({
    setup() {
      const dataSource = () => new Promise((res) => {
          setTimeout(() => {
            res([
              {
                entity1: {
                  id: 0,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单5',
                  icon: 'Menu',
                  fid: 1,
                },
              },
              {
                entity1: {
                  id: 1,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单6',
                  fid: 2,
                },
              },
              {
                entity1: {
                  id: 3,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单3',
                  fid: 0,
                },
              },
              {
                entity1: {
                  id: 7,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单2',
                  fid: 1,
                },
              },
              {
                entity1: {
                  id: 8,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单1.1',
                  fid: 2,
                },
              },
              {
                entity1: {
                  id: 9,
                  createdTime: null,
                  updatedTime: null,
                  createdBy: null,
                  updatedBy: null,
                  property1: '菜单4',
                  fid: 0,
                },
              },
            ]);
          }, 1000);
        });
      return {
        dataSource,
      };
    },
    template: '<el-menu :dataSource="dataSource" valueField="entity1.id" textField="entity1.property1" parentField="entity1.fid" ></el-menu>',
  }),
};
