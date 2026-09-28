<template>
  <div class="root">
    <el-form label-position="top" :model="model" ref="formRef">
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('input')" :text="getPreviewState('input')"></el-button>
        <el-form-input style="width: 200px" :preview="preview.input" :rules="rules" prop="input" label="输入框" />
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('mention')" :text="getPreviewState('mention')"></el-button>
        <el-form-mention
          :preview="preview.mention"
          label="提及"
          :rules="rules"
          :dataSource="dataSource"
          textField="label"
          valueField="value"
          style="width: 200px" />
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('radio')" :text="getPreviewState('radio')"></el-button>
        <el-form-radio-group
          v-model="model.radio"
          :preview="preview.radio"
          label="单选组"
          :rules="rules"
          :dataSource="dataSource2"
          valueField="entity1.id"
          textField="entity1.property1"
          style="width: 200px" />
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('checkbox')"
          :text="getPreviewState('checkbox')"></el-button>
        <el-form-checkbox-group
          v-model="model.checkbox"
          :preview="preview.checkbox"
          label="多选组"
          :rules="rules"
          :dataSource="dataSource2"
          valueField="entity1.id"
          textField="entity1.property1"
          style="width: 200px" />
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('switch')" :text="getPreviewState('switch')"></el-button>
        <el-button
          style="width: 80px"
          @click="changeModelValue('switch')"
          :text="getModelValueText('switch')"></el-button>
        <el-form-switch
          :preview="preview.switch"
          :rules="rules"
          v-model="model.switch"
          label="开关"
          style="width: 200px" />
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('rate')" :text="getPreviewState('rate')"></el-button>
        <el-form-rate :preview="preview.rate" allowHalf :rules="rules" v-model="model.rate" label="评分" />
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('timePicker')"
          :text="getPreviewState('timePicker')"></el-button>
        <el-form-time-picker
          :preview="preview.timePicker"
          prop="timePicker"
          is-range
          placeholder="请选择日期"
          prefixIconName="Calendar"
          clearIconName="CircleClose">
        </el-form-time-picker>
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('upload')" :text="getPreviewState('upload')"></el-button>
        <el-form-upload
          list-type="picture"
          prop="upload"
          :preview="preview.upload"
          action="http://127.0.0.1:8080/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple>
          <template #trigger>
            <el-button text="点击上传2"></el-button>
          </template>
        </el-form-upload>
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('dataPicker')"
          :text="getPreviewState('dataPicker')"></el-button>
        <el-form-date-picker
          :preview="preview.dataPicker"
          prop="dataPicker"
          type="daterange"
          placeholder="请选择日期"
          prefixIconName="Calendar"
          clearIconName="CircleClose">
        </el-form-date-picker>
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('inputNumber')"
          :text="getPreviewState('inputNumber')"></el-button>
        <el-form-input-number :preview="preview.inputNumber" :rules="rules" prop="inputNumber" label="数字输入框" />
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('inputTag')"
          :text="getPreviewState('inputTag')"></el-button>
        <el-form-input-tag :preview="preview.inputTag" :rules="rules" prop="inputTag" label="标签输入框" style="width: 200px;" />
      </div>
      <div class="item">
        <el-button style="width: 80px" @click="changePreview('slider')" :text="getPreviewState('slider')"></el-button>
        <el-form-slider :preview="preview.slider" :rules="rules" prop="slider" label="滑块" />
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('cascader')"
          :text="getPreviewState('cascader')"></el-button>
        <el-button @click="changeCascaderMultiple">{{ cascaderMultiple ? '多选' : '单选' }}</el-button>
        <el-form-cascader
          ref="cascaderRef"
          :preview="preview.cascader"
          prop="cascader"
          label="级联选择器"
          filterable
          :multiple="cascaderMultiple"
          :placeholder="12"
          valueField="entity1.id"
          textField="entity1.property1"
          parentField="entity1.fid"
          :dataSource="dataSource2"
          clearable
          style="width: 200px">
        </el-form-cascader>
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('treeSelect')"
          :text="getPreviewState('treeSelect')"></el-button>
        <el-form-tree-select
          prop="treeSelect"
          multiple
          :preview="preview.treeSelect"
          :placeholder="12"
          valueField="lCAPDepartment.deptId"
          textField="lCAPDepartment.name"
          parentField="lCAPDepartment.parentDeptId"
          :dataSource="dataSource3"
          placeholder="请选择"
          style="width: 240px">
        </el-form-tree-select>
      </div>
      <div class="item">
        <el-button
          style="width: 80px"
          @click="changePreview('transfer')"
          :text="getPreviewState('transfer')"></el-button>
        <el-form-transfer
          prop="transfer"
          :preview="preview.transfer"
          leftTitle="来源"
          rightTitle="目标"
          :dataSource="dataSource"></el-form-transfer>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
const formRef = ref();
const list = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3, 'data-nodepath': 'aabb' },
      ]);
    }, 1000);
  });
};

const rules = [
  {
    validate: 'filled',
    message: '表单项不得为空',
    trigger: 'blur',
    required: true,
  },
];

const cascaderMultiple = ref(false);
const changeCascaderMultiple = () => {
  cascaderMultiple.value = !cascaderMultiple.value;
};

const model = ref({
  input: '阿斯顿发说的阿斯顿发扣扣了卢卡斯地方马上到发抖阿斯顿发说的阿斯顿发扣扣了卢卡斯地方马上到发抖',
  radio: '222',
  checkbox: [],
  switch: false,
  rate: 2.5,
  timePicker: null,
  dataPicker: '2024-08-02',
  inputNumber: 10,
  inputTag: ['123', '456'],
  slider: null,
  cascader: undefined,
  upload:
    '/upload/app/d395a72b-3622-4503-b0f8-8ec4b4f78b15/前端开发工程师技术经理向_杭州_10-15K程先生_5年_20250703150228432.pdf',
  treeSelect: null,
  transfer: [],
});

const preview = reactive({
  input: true,
  mention: false,
  radio: true,
  checkbox: true,
  switch: false,
  rate: true,
  timePicker: false,
  dataPicker: false,
  inputNumber: false,
  inputTag: false,
  slider: false,
  cascader: false,
  upload: false,
  treeSelect: false,
  transfer: false,
});

const fileList = ref([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
]);

function changePreview(key) {
  preview[key] = !preview[key];
}

function getPreviewState(key) {
  return preview[key] ? 'preview' : 'edit';
}

function changeModelValue(key) {
  if (key === 'switch') {
    model.value.switch = !model.value.switch;
  }
}

function getModelValueText(key) {
  if (key === 'switch') {
    return model.value.switch ? 'on' : 'off';
  }
}

const dataSource = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          label: 'Fuphoenixes',
          value: '111',
        },
        {
          label: 'kooriookami',
          value: '222',
        },
        {
          label: 'Jeremy',
          value: '333',
        },
        {
          label: 'btea',
          value: '444',
        },
      ]);
    }, 1000);
  });
};

const dataSource2 = () =>
  new Promise((res) => {
    setTimeout(() => {
      res([
        {
          entity1: {
            id: 0,
            createdTime: null,
            updatedTime: null,
            createdBy: null,
            updatedBy: null,
            property1: '选项5',
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
            property1: '选项6',
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
            property1: '选项3',
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
            property1: '选项2',
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
            property1: '选项1.1',
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
            property1: '选项4',
            fid: 0,
          },
        },
      ]);
    }, 1000);
  });

const dataSource3 = () =>
  new Promise((res) => {
    setTimeout(() => {
      res([
        {
          lCAPDepartment: {
            id: 3150684874215168,
            createdTime: '2025-06-15T07:33:03.000Z',
            updatedTime: '2025-06-15T07:33:03.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: '根部门',
            deptId: '根部门',
            parentDeptId: '__vue_devtool_undefined__',
          },
        },

        {
          lCAPDepartment: {
            id: 3151333764914944,
            createdTime: '2025-06-16T05:33:13.000Z',
            updatedTime: '2025-06-16T05:33:13.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: 'test',
            deptId: 'test',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3151340777463552,
            createdTime: '2025-06-16T05:47:29.000Z',
            updatedTime: '2025-06-16T05:47:29.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: 'hhh',
            deptId: 'hhh',
            parentDeptId: 'test',
          },
        },
        {
          lCAPDepartment: {
            id: 3151381032042240,
            createdTime: '2025-06-16T07:09:23.000Z',
            updatedTime: '2025-06-16T07:09:23.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: 'testggg',
            deptId: 'ttt',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3151385740492544,
            createdTime: '2025-06-16T07:18:58.000Z',
            updatedTime: '2025-06-16T07:18:58.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: 'ttttt',
            deptId: 'tttttt',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3151392321216256,
            createdTime: '2025-06-16T07:32:21.000Z',
            updatedTime: '2025-06-16T07:32:21.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: '刚刚',
            deptId: '刚刚',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3156206936421120,
            createdTime: '2025-06-23T02:47:43.000Z',
            updatedTime: '2025-06-23T02:47:43.000Z',
            createdBy: '__vue_devtool_undefined__',
            updatedBy: '__vue_devtool_undefined__',
            name: 'testgahah',
            deptId: 'hahahah',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3157111747207168,
            createdTime: '2025-06-24T09:28:34.000Z',
            updatedTime: '2025-06-24T09:28:34.000Z',
            createdBy: '__vue_devtool_undefined__',
            updatedBy: '__vue_devtool_undefined__',
            name: 'tesss',
            deptId: 'ssssaa',
            parentDeptId: 'test',
          },
        },
        {
          lCAPDepartment: {
            id: 3157111839588352,
            createdTime: '2025-06-24T09:28:45.000Z',
            updatedTime: '2025-06-24T09:28:45.000Z',
            createdBy: '__vue_devtool_undefined__',
            updatedBy: '__vue_devtool_undefined__',
            name: 'gagh',
            deptId: 'hahajjjj',
            parentDeptId: 'ssssaa',
          },
        },
        {
          lCAPDepartment: {
            id: 3159206957522176,
            createdTime: '2025-06-27T08:31:17.000Z',
            updatedTime: '2025-06-27T08:31:17.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: '搜噶搜噶',
            deptId: '嘎嘎',
            parentDeptId: '根部门',
          },
        },
        {
          lCAPDepartment: {
            id: 3159213096967424,
            createdTime: '2025-06-27T08:43:46.000Z',
            updatedTime: '2025-06-27T08:43:46.000Z',
            createdBy: 'DEVACC-permissionvue3',
            updatedBy: 'DEVACC-permissionvue3',
            name: '嘎嘎哈哈哈',
            deptId: '嘎嘎哈哈哈',
            parentDeptId: '根部门',
          },
        },
      ]);
    }, 1000);
  });
</script>

<style scoped>
.root {
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 10px;
}
</style>
