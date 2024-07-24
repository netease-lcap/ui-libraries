import { ComponentConfig } from '../types';
import { styleObjToStr } from '../utils';

const carousel: ComponentConfig = {
  type: 'Carousel',
  generateCode: (componentNode) => {
    // 宽高
    const { width } = componentNode.bound;
    const { height } = componentNode.bound;
    const styleObj = {
      width: `${width}px`,
      height: `${height}px`,
    };
    const styleStr = styleObjToStr(styleObj);

    return {
      id: componentNode.id,
      tag: 'u-carousel',
      code: `
<u-carousel  style="${styleStr}">
    <template #item="current" ></template>
    <u-carousel-item >
        <u-image  :fit="'cover'" :src="'https://static-vusion.163yun.com/assets/cloud-ui/1.jpg'" style="width: 100%; height: 100%"></u-image>
    </u-carousel-item>
</u-carousel>
            `,
      name: '幻灯片',
      reason: '左右滑动切换图片',
    };
  },
};

export default carousel;
