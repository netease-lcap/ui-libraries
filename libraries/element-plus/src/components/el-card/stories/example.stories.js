import Component from '../index';

export default {
  id: 'el-card-examples',
  title: '组件列表/Card 卡片/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

/* 基础用法 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-card style="max-width: 480px" data-nodepath="123">
        <template #header>
          <div class="card-header">
            <span>卡片名称</span>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ '列表项目 ' + o }}</p>
        <template #footer>页脚内容</template>
      </el-card>
    </div>
    `,
  }),
};

/* 简单卡片 */
export const Example2 = {
  name: '简单卡片',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-card style="max-width: 480px">
        <p v-for="o in 4" :key="o" class="text item">{{ '列表项目 ' + o }}</p>
      </el-card>
    </div>
    `,
  }),
};

/* 带图片 */
export const Example3 = {
  name: '带图片',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div>
      <el-card style="max-width: 480px">
        <template #header>美味汉堡</template>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          style="width: 100%"
        />
      </el-card>
    </div>
    `,
  }),
};

/* 阴影效果 */
export const Example4 = {
  name: '阴影效果',
  render: () => ({
    setup() {
      return {};
    },
    template: `
    <div class="flex flex-wrap gap-4">
      <el-card style="width: 480px" shadow="always">总是显示</el-card>
      <el-card style="width: 480px" shadow="hover">悬浮显示</el-card>
      <el-card style="width: 480px" shadow="never">从不显示</el-card>
    </div>
    `,
  }),
}; 