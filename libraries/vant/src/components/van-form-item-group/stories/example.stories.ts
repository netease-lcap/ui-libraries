import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'van-form-item-group-examples',
  title: '组件列表/FormItemGroup 表单项分组/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: '基础用法',
  render: () => ({
    setup() {
      const groupValue = ref('');
      const fieldValue = ref('');
      const groupRef = ref();
      const formRef = ref();

      const onValidateGroup = async () => {
        const result = await groupRef.value?.validated();
        console.log('group validated', result);
      };

      const onSubmit = async () => {
        const result = await formRef.value?.validated();
        console.log('form validated', result);
      };

      return {
        groupValue,
        fieldValue,
        groupRef,
        formRef,
        onValidateGroup,
        onSubmit,
      };
    },
    template: `
      <van-form ref="formRef">
        <van-form-item-group
          ref="groupRef"
          v-model:value="groupValue"
          required
          :rules="[{ validate: 'filled', message: '分组校验值不得为空', trigger: 'input+blur', required: true }]"
        >
          <template #label>
            <span>联系信息</span>
          </template>
          <van-field v-model="fieldValue" placeholder="请输入内容" />
          <van-field v-model="groupValue" placeholder="绑定校验值" />
        </van-form-item-group>
        <van-flex>
          <van-button type="primary" @click="onValidateGroup">校验分组</van-button>
          <van-button type="primary" @click="onSubmit">校验表单</van-button>
        </van-flex>
      </van-form>
    `,
  }),
};
