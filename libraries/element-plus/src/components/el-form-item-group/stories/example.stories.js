import { ref } from 'vue';
import Component from '../index';

export default {
  id: 'el-form-item-group-examples',
  title: '组件列表/FormItemGroup 表单项分组/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

const selectOptions = [
  { label: '待审批', value: 0 },
  { label: '已审批', value: 1 },
  { label: '已拒绝', value: 2 },
];

/* 块级表单：columns=2 / 3 */
export const BlockFormColumns = {
  name: '块级表单 columns 2/3',
  render: () => ({
    setup() {
      const formModel = ref({
        name: '',
        status: '',
        city: '',
        type: '',
        owner: '',
        level: '',
        remark: '',
      });
      return { formModel, selectOptions };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        块级表单中 <code>columns</code> 表示内容区占 N 倍原控件宽度（非内部分列），最大不超过容器。
      </p>

      <h4 style="margin: 0 0 8px;font-size: 14px;">columns = 2（占 2 倍宽度）</h4>
      <el-form :model="formModel" label-position="right" layout="block" style="margin-bottom: 32px;">
        <el-form-item-group label="联系信息" :columns="2" :is-required="true">
          <el-form-input v-model="formModel.name" prop="name" label="姓名" placeholder="请输入" clearable />
          <el-form-select
            v-model="formModel.status"
            prop="status"
            label="状态"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.city"
            prop="city"
            label="城市"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.type"
            prop="type"
            label="类型"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
        </el-form-item-group>
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
      </el-form>

      <h4 style="margin: 0 0 8px;font-size: 14px;">columns = 3（占 3 倍宽度）</h4>
      <el-form :model="formModel" label-position="right" layout="block">
        <el-form-item-group label="业务信息" :columns="3">
          <el-form-select
            v-model="formModel.owner"
            prop="owner"
            label="负责人"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.level"
            prop="level"
            label="优先级"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.type"
            prop="type"
            label="类型"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-input v-model="formModel.name" prop="name2" label="标题" placeholder="请输入" clearable />
          <el-form-select
            v-model="formModel.status"
            prop="status2"
            label="状态"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.city"
            prop="city2"
            label="城市"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
        </el-form-item-group>
      </el-form>
    </div>
    `,
  }),
};

/* 查询表单：columns=2 / 3 */
export const QueryFormColumns = {
  name: '查询表单 columns 2/3',
  render: () => ({
    setup() {
      const formModel = ref({
        keyword: '',
        status: '',
        city: '',
        type: '',
        owner: '',
        level: '',
        date: '',
      });
      return { formModel, selectOptions };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        查询表单中 <code>columns</code> 表示跨 N 个查询列（含间距），最大不超过容器一行宽度。
      </p>

      <div
        style="
          resize: horizontal;
          overflow: auto;
          width: 1210px;
          max-width: 100%;
          min-width: 320px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
          margin-bottom: 24px;
        "
      >
        <h4 style="margin: 0 0 8px;font-size: 14px;">查询表单 + group columns=2（跨 2 列）</h4>
        <el-form :model="formModel" label-position="right" layout="block" :query-form="true">
          <el-form-input v-model="formModel.keyword" prop="keyword" label="关键词" placeholder="请输入" clearable />
          <el-form-item-group label="筛选条件" :columns="2" :is-required="true">
            <el-form-select
              v-model="formModel.status"
              prop="status"
              label="状态"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.city"
              prop="city"
              label="城市"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.type"
              prop="type"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.owner"
              prop="owner"
              label="负责人"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
          </el-form-item-group>
          <template #actions>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
          </template>
        </el-form>
      </div>

      <div
        style="
          resize: horizontal;
          overflow: auto;
          width: 1210px;
          max-width: 100%;
          min-width: 320px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
        "
      >
        <h4 style="margin: 0 0 8px;font-size: 14px;">查询表单 + group columns=3（跨 3 列）</h4>
        <el-form :model="formModel" label-position="right" layout="block" :query-form="true">
          <el-form-item-group label="高级筛选" :columns="3">
            <el-form-select
              v-model="formModel.status"
              prop="status3"
              label="状态"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.city"
              prop="city3"
              label="城市"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.type"
              prop="type3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.owner"
              prop="owner3"
              label="负责人"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.level"
              prop="level3"
              label="优先级"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-input v-model="formModel.keyword" prop="keyword3" label="关键词" placeholder="请输入" clearable />
          </el-form-item-group>
          <template #actions>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
            <el-button>导出</el-button>
          </template>
        </el-form>
      </div>
    </div>
    `,
  }),
};

/** 分组手动校验：值固定为 validatingValue，仅 validated() 触发 */
export const ManualValidated = {
  name: '手动 validated 校验',
  render: () => ({
    setup() {
      const formModel = ref({ name: '', phone: '' });
      const groupRef = ref(null);
      const validatingValue = ref('');
      const lastResult = ref('');
      const runValidate = async () => {
        // validatingValue.value = `${formModel.value.name}|${formModel.value.phone}`;
        const result = await groupRef.value?.validated?.();
        console.log(result,'==');
        lastResult.value = result?.valid ? '通过' : '未通过';
      };
      return { formModel, groupRef, validatingValue, lastResult, runValidate };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        分组校验值固定为 <code>validatingValue</code>，不会随表单 blur/submit 自动校验，只能调用 <code>validated()</code>。
      </p>
      <el-form :model="formModel" label-position="right" layout="block">
        <el-form-item-group
          ref="groupRef"
          label="联系信息"
          :columns="2"
          :isRequired="true"
          :validatingValue="validatingValue"
          :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]" 
        >
          <el-form-input v-model="validatingValue" prop="name" label="姓名" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.phone" prop="phone" label="手机" placeholder="请输入" clearable />
        </el-form-item-group>
        <div style="margin-top: 12px; display: flex; gap: 8px; align-items: center;">
          <el-button type="primary" @click="runValidate">校验分组</el-button>
          <span style="color: var(--el-text-color-secondary);font-size: 13px;">
            validatingValue = 「{{ validatingValue || '空' }}」；结果：{{ lastResult || '-' }}
          </span>
        </div>
      </el-form>
    </div>
    `,
  }),
};
