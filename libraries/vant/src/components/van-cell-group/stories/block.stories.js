import VanCellGroup from '../index';

export default {
  id: 'van-cell-group-blocks',
  title: '组件列表/CellGroup 单元格组/内置区块',
  component: VanCellGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      provide() {
        return {
          VUE_APP_DESIGNER: true,
        };
      },
      template: '<div style="width: 100%;"><story/></div>',
    }),
  ],
};

export const Default = {
  name: '基础示例',
  render: () => ({
    template: '<van-cell-group><van-cell><template #title>单元格标题</template><template #value>单元格内容</template></van-cell></van-cell-group>',
  }),
};
