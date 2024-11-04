import {
  styleObjToStr,
  ComponentCodeGen,
} from '../common';

const type = 'Carousel';

export const codeGen: ComponentCodeGen = {
  type,
  generateCode: (componentNode) => {
    // 宽高
    const { width, height } = componentNode.style;
    const styleStr = styleObjToStr({ width, height });

    return {
      id: componentNode.id,
      code: `
<el-carousel  style="${styleStr}">
    <template #item="current"></template>
    <el-carousel-item >
        <el-image fit="cover" src="https//static-vusion.163yun.com/assets/cloud-ui/6.jpg"
            style="width:100%;height100%;">
            <template #placeholder ></template>
            <template #error ></template>
        </el-image>
    </el-carousel-item>
</el-carousel>
            `,
    };
  },
  name: '幻灯片',
  reason: '左右滑动切换图片',
  tag: 'el-carousel',
};
