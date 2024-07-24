import { ComponentConfig } from '../types';

const selectInMobile: ComponentConfig = {
  type: 'SelectInMobile',
  generateCode: (componentNode, textNodes) => {
    const textNode = textNodes.filter((n) => n.attrs.text?.trim() !== '*')[1];
    const title = '';
    const width = componentNode.absoluteBound.x
      + componentNode.bound.width
      - textNode.absoluteBound.x
      - 16;
    const code = `
    <van-pickerson style="width: ${width}px;" :title="'${title}'" :showToolbar="true" :pageSize="50">
        <template #picker-bottom>
            <van-picker-action-slot :targetMethod="'cancel'">
                <van-button :type="'info_secondary'" :size="'normal'" :text="'取消'" :squareroud="'round'"></van-button>
            </van-picker-action-slot>
            <van-picker-action-slot :targetMethod="'confirm'">
                <van-button :type="'info'" :size="'normal'" :text="'确认'" :squareroud="'round'"></van-button>
            </van-picker-action-slot>
        </template>
        <template #picker-top>
            <van-picker-action-slot :targetMethod="'cancel'">
                <van-iconv :name="'left-arrow'" :icotype="'only'"></van-iconv>
            </van-picker-action-slot>
            <van-picker-action-slot :targetMethod="'confirm'"></van-picker-action-slot>
        </template>
        <template #pannel-title>
            <van-text :text="'${title}'"></van-text>
        </template>
        <template #title>
            <van-text :text="'${title}'"></van-text>
        </template>
    </van-pickerson>
    `;
    return {
      id: textNode.id,
      tag: 'van-pickerson',
      code,
      name: '选择器',
      reason: '进行下拉选择',
    };
  },
};

export default selectInMobile;
