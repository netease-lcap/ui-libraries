import { ref, watch, reactive } from 'vue';
import Component from '../index';
// import { ElSelect, ElOption } from '../index';
import ExampleDemo1 from '../demos/example-demo1.vue';

export default {
  id: 'el-form-examples',
  title: '组件列表/Form 表单/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

/*  基础的、简洁的标签页。 */
export const Example1 = {
  name: '基础用法',
  render: () => ({
    setup() {
      const activeName = ref('first');
      const formRef = ref();
      const name = ref('myName');
      const state = ref({
        start: '2026-05-26',
        end: '2026-05-27',
      });
      const list = [1, 2, 3];

      const handleClick = (tab) => {
        console.log(formRef);
        formRef.value.validate();
      };
      // setTimeout(() => {
      //   name.value = 'newName';
      //   activeName.value = 'second';
      // }, 3000);
      const model = ref({});

      return {
        name,
        activeName,
        list,
        handleClick,
        model,
        state,
        formRef,
      };
    },
    template: `
    <div>
    {{model}}
    <el-form :model="model" ref="formRef">
      <el-form-input style="border: 1px solid red;"  label="input21" :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"  />
      <el-form-input style="border: 1px solid red;"  label="input21" :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"  />
      <el-form-date-picker label="日期选择" type="daterange" converter="auto" placeholder="请选择日期" :range="true" v-model:startValue="state.start" v-model:endValue="state.end" :rules="[{validate: 'filled',message: '表单项不得为空',trigger: 'input+blur',required: true}]"> </el-form-date-picker>
      <el-button @click="handleClick">Submit</el-button>

    </el-form>
 
    </div>

    `,
  }),
};

export const Example2 = {
  name: '异步函数',
  render: () => ({
    setup() {
      const activeName = ref();
      const inputName = ref('');
      const formData = ref({ input: '', select: '' });
      const formRef = ref();
      const ignoreRules = ref(false);
      // const list = ref([{ value: 1 }, { value: 2 }, { value: 3 }]);
      // const list = ref([1, 2, 3]);
      const list = async () => {
        return new Promise((res) => {
          setTimeout(() => {
            // res([{ value: 1 }, { value: 2 }, { value: 3, 'data-nodepath': 'aabb' }]);
            res([
              { value: 1, label: 1 },
              { value: 2, label: 2 },
              { value: 3, label: 3, 'data-nodepath': 'aabb' },
            ]);
          }, 1000);
        });
      };
      const select = ref();
      const log = (el) => {
        console.log(el);
        formData.value.input = el;
        inputName.value = el;
        console.log(formData.value, 'formData');
      };

      // setTimeout(() => {
      // name.value = 'newName';
      // list.value[0].value = 2;
      // activeName.value = 'second';
      // list;
      // }, 3000);
      const rules = [
        {
          validate: 'filled',
          message: '表单项不得为空',
          trigger: 'blur',
          required: true,
        },
      ];
      const inputTag = ref([]);
      const switchValue = ref(false);
      const model = ref({
        input21: '123',
      });
      const handleClick = async (tab) => {
        // console.log('====', formData, tab);
        tab.validated();
        // console.log(tab, 'tab', tab.validated());
        // console.log(model, 'model');
      };
      const handleIgnoreRules = () => {
        // ignoreRules.value = !ignoreRules.value;
        console.log(formRef.value.clearValidate());
      };
      watch(
        model,
        (value) => {
          console.log(value, 'model');
        },
        {
          immediate: true,
          deep: true,
        },
      );
      return {
        model,
        formData,
        switchValue,
        select,
        activeName,
        inputName,
        inputTag,
        list,
        handleClick,
        log,
        formRef,
        rules,
        ignoreRules,
        handleIgnoreRules,
      };
    },
    template: `
    <div>
    <el-form :model="model" ref="formRef" :inline="true">
    <el-form-input  :rules="rules"  prop="input21" label="input21"  data-nodepath="input21" />
    <el-form-mention :rules="rules" :ignoreRules="ignoreRules"  v-model="inputName"  label="input21"  data-nodepath="input21" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input2221"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-form-select :rules="rules" clearable  v-model="inputName"  label="input21"  data-nodepath="input21" :dataSource="[{label:'待审批',value:0},{label:'已审批',value:1},{label:'已拒绝',value:2}]" />
    <el-button @click="handleClick(formRef)" >Submit</el-button>

    <a @click="handleClick(formRef)" >Submit</a>
    <el-button @click="handleIgnoreRules()" >Submit2</el-button>
    {{ignoreRules}}
    </el-form>

    </el-form>

    </div>

    `,
  }),
};

export const Example3 = {
  name: '表单尺寸',
  render: () => ({
    setup() {
      const inputName = ref('123');
      const formRef = ref();
      const rules = [
        {
          validate: 'filled',
          message: '表单项不得为空',
          trigger: 'input+blur',
          required: true,
        },
      ];
      const handleClick = async (formRef) => {
        console.log(formRef, 'formRef');
        // formRef.validate().then((res) => {
        //   console.log(res, 'res');
        // });
        const result = await formRef.resetForm();
        console.log(result, 'result');
        // formRef.value.validate().then((res) => {
        //   console.log(res, 'res');
        // });
      };
      return {
        inputName,
        rules,
        formRef,
        handleClick,
      };
    },
    template: `<el-form size="small" ref="formRef" >
      <a @click="handleClick(formRef)">Submit</a> 
      <el-input label="input2" data-nodepath="input2" v-model="inputName" :rules="rules" />
    </el-form>
    `,
  }),
};

export const Example4 = {
  name: '表单预览',
  render: () => ({
    components: {
      exampleDemo: ExampleDemo1,
    },
    template: '<example-demo />',
  }),
};

export const Example5 = {
  name: 'label竖着排列对齐',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaaaaaaa" class="my-label" />
          <el-form-input class="my-label" />
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    labelPosition: 'top',
  },
};

export const Example6 = {
  name: 'button对齐',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
        <el-flex class="el-flex-form-item">
            <el-button>Submit</el-button>
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    labelPosition: 'left',
    labelWidth: '100px',
  },
};

export const Example7 = {
  name: '表单inline',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      return {
        Example4,
        args,
      };
    },
    template: `
    <div>
      <el-form v-bind="args"   >
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
        <el-flex class="el-flex-form-item">
          <el-form-input label="aaaaaaaa" class="my-label" />
        </el-flex>
      </el-form>
    </div>
    `,
  }),
  args: {
    inline: true,
  },
};
export const Example8 = {
  name: '表单宽度',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const input = ref('');
      const selectVal = ref('');
      const cascaderVal = ref([]);
      const dateVal = ref('');
      const timeVal = ref('');
      const timeSelectVal = ref('');
      const tags = ref([]);
      const treeSel = ref();
      const sliderVal = ref(42);
      const cascaderOptions = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' },
          ],
        },
      ];
      const treeSource = [
        {
          value: '1',
          label: '一级',
          children: [{ value: '1-1', label: '二级' }],
        },
      ];
      const treeProps = { children: 'children', label: 'label', value: 'value' };
      const mentionList = [
        { value: 'user1', label: '用户一' },
        { value: 'user2', label: '用户二' },
      ];
      return {
        args,
        input,
        selectVal,
        cascaderVal,
        dateVal,
        timeVal,
        timeSelectVal,
        tags,
        treeSel,
        sliderVal,
        cascaderOptions,
        treeSource,
        treeProps,
        mentionList,
      };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 16px;color: var(--el-text-color-secondary);font-size: 13px;">
        以下为与「表单控件默认横向宽度 240px」相关的组件（依赖 <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-select-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-date-editor-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-tag-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-slider-width</code>
        等，未在下面写死 <code>width</code>，便于对齐主题变量）。
      </p>

      <el-form v-bind="args"  style="float: left;">
        <div style="display:flex;flex-direction:column;gap:16px;max-width:380px;">
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">输入框 · el-input · --el-input-width</div>
            <el-input v-model="input" placeholder="请输入" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">选择器 · el-select · --el-select-width</div>
            <el-select v-model="selectVal" placeholder="请选择" clearable>
              <el-option label="选项一" value="1" />
              <el-option label="选项二" value="2" />
            </el-select>
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">级联 · el-cascader · --el-input-width</div>
            <el-cascader v-model="cascaderVal" :options="cascaderOptions" placeholder="请选择" clearable />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">日期 · el-date-picker · --el-date-editor-width</div>
            <el-date-picker v-model="dateVal" type="date" converter="auto" placeholder="请选择日期" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">时间选择器 · el-time-picker · --el-date-editor-width</div>
            <el-time-picker v-model="timeVal" prefixIconName="" placeholder="请选择时间" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">时间选择 · el-time-select（根为 Select）· --el-select-width</div>
            <el-time-select v-model="timeSelectVal" placeholder="请选择时间" start="09:00" end="18:00" step="00:30" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">标签输入 · el-input-tag · --el-input-tag-width</div>
            <el-input-tag v-model="tags" placeholder="输入后回车" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">提及 · el-mention · --el-input-width</div>
            <el-mention :dataSource="mentionList" placeholder="输入 @ 提及" trigger="@" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">横向滑块 · el-slider · --el-slider-width</div>
            <el-slider v-model="sliderVal" />
          </div>
          <div style="outline: 1px dashed var(--el-border-color);outline-offset:6px;padding:8px;">
            <div style="margin-bottom:6px;font-size:12px;color:var(--el-text-color-secondary);">树形选择 · el-tree-select · --el-select-width</div>
            <el-tree-select
              v-model="treeSel"
              :data="treeSource"
              :props="treeProps"
              node-key="value"
              placeholder="请选择"
            />
          </div>

        </div>
      </el-form>
      <el-form >
            <el-form-select v-model="selectVal" label="select21" placeholder="请选择" clearable>
              <el-option label="选项一" value="1" />
              <el-option label="选项二" value="2" />
            </el-form-select>
      </el-form>
    </div>
    `,
  }),
  args: {
    inline: false,
    // labelPosition: 'left',
  },
};

export const Example9 = {
  name: '表单中宽度',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const cascaderOptions = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' },
          ],
        },
      ];
      const treeSource = [
        {
          value: '1',
          label: '一级',
          children: [{ value: '1-1', label: '二级' }],
        },
      ];
      const treeProps = { children: 'children', label: 'label', value: 'value' };
      const mentionList = [
        { value: 'user1', label: '用户一' },
        { value: 'user2', label: '用户二' },
      ];
      const formModel = reactive({
        input: '',
        selectVal: '',
        cascaderVal: [],
        dateVal: '',
        timePickerVal: '',
        timeSelectVal: '',
        tags: [],
        treeSel: '',
        sliderVal: 42,
        mentionVal: '',
        radioVal: '1',
        checkboxVals: [],
      });
      return {
        args,
        formModel,
        cascaderOptions,
        treeSource,
        treeProps,
        mentionList,
      };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 16px;color: var(--el-text-color-secondary);font-size: 13px;">
        以下为与「表单控件默认横向宽度 240px」相关的组件（依赖 <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-select-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-date-editor-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-tag-width</code> /
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-slider-width</code>
        等，未在下面写死 <code>width</code>，便于对齐主题变量）。
      </p>

     
      <el-form :model="formModel" label-position="right">
            <el-form-input v-model="formModel.input" prop="input" label="输入框" placeholder="请输入" clearable />
            <el-form-select v-model="formModel.selectVal" prop="selectVal" label="选择器" placeholder="请选择" clearable>
              <el-option label="选项一" value="1" />
              <el-option label="选项二" value="2" />
            </el-form-select>
            <el-form-cascader
              v-model="formModel.cascaderVal"
              prop="cascaderVal"
              label="级联选择"
              :options="cascaderOptions"
              placeholder="请选择"
              clearable
            />
            <el-form-date-picker
              v-model="formModel.dateVal"
              prop="dateVal"
              label="日期选择"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
            />
            <el-form-time-picker
              v-model="formModel.timePickerVal"
              prop="timePickerVal"
              label="时间选择器"
              placeholder="选择时间"
              clearable
            />
            <el-form-time-select
              v-model="formModel.timeSelectVal"
              prop="timeSelectVal"
              label="时间选择"
              start="08:30"
              end="18:30"
              step="00:15"
              placeholder="请选择"
              clearable
            />
            <el-form-input-tag v-model="formModel.tags" prop="tags" label="标签输入" placeholder="输入后回车添加标签" />
            <el-form-mention
              v-model="formModel.mentionVal"
              prop="mentionVal"
              label="提及"
              placeholder="输入 @ 提及"
              :dataSource="mentionList"
            />
            <el-form-tree-select
              v-model="formModel.treeSel"
              prop="treeSel"
              label="树形选择"
              :data="treeSource"
              :props="treeProps"
              placeholder="请选择"
              clearable
            />
            <el-form-slider v-model="formModel.sliderVal" prop="sliderVal" label="滑块" />
            <el-form-radio-group v-model="formModel.radioVal" prop="radioVal" label="单选组">
              <el-radio value="1">选项一</el-radio>
              <el-radio value="2">选项二</el-radio>
            </el-form-radio-group>
            <el-form-checkbox-group v-model="formModel.checkboxVals" prop="checkboxVals" label="多选组">
              <el-checkbox value="a">选项 A</el-checkbox>
              <el-checkbox value="b">选项 B</el-checkbox>
            </el-form-checkbox-group>
      </el-form>
    </div>
    `,
  }),
  args: {
    inline: false,
    // labelPosition: 'left',
  },
};
export const Example10 = {
  name: '行内',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const cascaderOptions = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' },
          ],
        },
      ];
      const treeSource = [
        {
          value: '1',
          label: '一级',
          children: [{ value: '1-1', label: '二级' }],
        },
      ];
      const treeProps = { children: 'children', label: 'label', value: 'value' };
      const mentionList = [
        { value: 'user1', label: '用户一' },
        { value: 'user2', label: '用户二' },
      ];
      const formModel = reactive({
        input: '',
        selectVal: '',
        cascaderVal: [],
        dateVal: '',
        timePickerVal: '',
        timeSelectVal: '',
        tags: [],
        treeSel: '',
        sliderVal: 42,
        mentionVal: '',
        radioVal: '1',
        checkboxVals: [],
      });
      return {
        args,
        formModel,
        cascaderOptions,
        treeSource,
        treeProps,
        mentionList,
      };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        行内布局：与块级同源令牌（首选 96px / 240px，最小 72px / 180px）。
        横向拖拽缩小外层容器时字段先收缩，无法再收窄则换行。
      </p>
      <p style="margin: 0 0 16px;color: var(--el-text-color-secondary);font-size: 13px;">
        控件宽度依赖主题变量（如
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-width</code>、
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-select-width</code>
        等），与
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-form-content-width</code>
        默认一致。
      </p>

      <div
        style="
          resize: horizontal;
          overflow: auto;
          max-width: 100%;
          min-width: 260px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
        "
      >
      <el-form :model="formModel" label-position="right" layout="inline">
            <el-form-input v-model="formModel.input" prop="input" label="输入框" placeholder="请输入" clearable />
            <el-form-select v-model="formModel.selectVal" prop="selectVal" label="选择器" placeholder="请选择" clearable>
              <el-option label="选项一" value="1" />
              <el-option label="选项二" value="2" />
            </el-form-select>
            <el-form-cascader
              v-model="formModel.cascaderVal"
              prop="cascaderVal"
              label="级联选择"
              :options="cascaderOptions"
              placeholder="请选择"
              clearable
            />
            <el-form-date-picker
              v-model="formModel.dateVal"
              prop="dateVal"
              label="日期选择"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
            />
            <el-form-time-picker
              v-model="formModel.timePickerVal"
              prop="timePickerVal"
              label="时间选择"
              placeholder="选择时间"
              clearable
            />
            <el-form-time-select
              v-model="formModel.timeSelectVal"
              prop="timeSelectVal"
              label="时间选择"
              start="08:30"
              end="18:30"
              step="00:15"
              placeholder="请选择"
              clearable
            />
            <el-form-input-tag v-model="formModel.tags" prop="tags" label="标签输入" placeholder="输入后回车添加标签" />
            <el-form-mention
              v-model="formModel.mentionVal"
              prop="mentionVal"
              label="提及"
              placeholder="输入 @ 提及"
              :dataSource="mentionList"
            />
            <el-form-tree-select
              v-model="formModel.treeSel"
              prop="treeSel"
              label="树形选择"
              :data="treeSource"
              :props="treeProps"
              placeholder="请选择"
              clearable
            />
            <el-form-slider v-model="formModel.sliderVal" prop="sliderVal" label="滑块" />
            <el-form-radio-group v-model="formModel.radioVal" prop="radioVal" label="单选组">
              <el-radio value="1">选项一</el-radio>
              <el-radio value="2">选项二</el-radio>
            </el-form-radio-group>
            <el-form-checkbox-group v-model="formModel.checkboxVals" prop="checkboxVals" label="多选组">
              <el-checkbox value="a">选项 A</el-checkbox>
              <el-checkbox value="b">选项 B</el-checkbox>
            </el-form-checkbox-group>
      </el-form>
      </div>
    </div>
    `,
  }),
  args: {
    inline: false,
    // labelPosition: 'left',
  },
};

export const Example11 = {
  name: '栅格',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
      const cascaderOptions = [
        {
          value: 'zhejiang',
          label: '浙江',
          children: [
            { value: 'hangzhou', label: '杭州' },
            { value: 'ningbo', label: '宁波' },
          ],
        },
      ];
      const treeSource = [
        {
          value: '1',
          label: '一级',
          children: [{ value: '1-1', label: '二级' }],
        },
      ];
      const treeProps = { children: 'children', label: 'label', value: 'value' };
      const mentionList = [
        { value: 'user1', label: '用户一' },
        { value: 'user2', label: '用户二' },
      ];
      const formModel = reactive({
        input: '',
        selectVal: '',
        cascaderVal: [],
        dateVal: '',
        timePickerVal: '',
        timeSelectVal: '',
        tags: [],
        treeSel: '',
        sliderVal: 42,
        mentionVal: '',
        radioVal: '1',
        checkboxVals: [],
      });
      return {
        args,
        formModel,
        cascaderOptions,
        treeSource,
        treeProps,
        mentionList,
      };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        行内布局：与块级同源令牌（首选 96px / 240px，最小 72px / 180px）。
        横向拖拽缩小外层容器时字段先收缩，无法再收窄则换行。
      </p>
      <p style="margin: 0 0 16px;color: var(--el-text-color-secondary);font-size: 13px;">
        控件宽度依赖主题变量（如
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-input-width</code>、
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-select-width</code>
        等），与
        <code style="padding: 0 4px;background:var(--el-fill-color-light);border-radius:4px;">--el-form-content-width</code>
        默认一致。
      </p>

      <div
        style="
          resize: horizontal;
          overflow: auto;
          max-width: 100%;
          min-width: 260px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
        "
      >
      <el-form :model="formModel" label-position="right" layout="grid" columns="4">
            <el-form-input v-model="formModel.input" prop="input" label="输入框" placeholder="请输入" clearable />
            <el-form-select v-model="formModel.selectVal" prop="selectVal" label="选择器" placeholder="请选择" clearable>
              <el-option label="选项一" value="1" />
              <el-option label="选项二" value="2" />
            </el-form-select>
            <el-form-cascader
              v-model="formModel.cascaderVal"
              prop="cascaderVal"
              label="级联选择"
              :options="cascaderOptions"
              placeholder="请选择"
              clearable
            />
            <el-form-date-picker
              v-model="formModel.dateVal"
              prop="dateVal"
              label="日日期选日日期选择选择日日期选择日日期选日日期选择选择日日期选择择择"
              type="date"
              placeholder="选择日期"
              value-format="YYYY-MM-DD"
              clearable
            />
            <el-form-time-picker
              v-model="formModel.timePickerVal"
              prop="timePickerVal"
              label="时间选择"
              placeholder="选择时间"
              clearable
            />
            <el-form-time-select
              v-model="formModel.timeSelectVal"
              prop="timeSelectVal"
              label="时间选择"
              start="08:30"
              end="18:30"
              step="00:15"
              placeholder="请选择"
              clearable
            />
            <el-form-input-tag v-model="formModel.tags" prop="tags" label="标签输入" placeholder="输入后回车添加标签" />
            <el-form-mention
              v-model="formModel.mentionVal"
              prop="mentionVal"
              label="提及"
              placeholder="输入 @ 提及"
              :dataSource="mentionList"
            />
            <el-form-tree-select
              v-model="formModel.treeSel"
              prop="treeSel"
              label="树形选择"
              :data="treeSource"
              :props="treeProps"
              placeholder="请选择"
              clearable
            />
            <el-form-slider v-model="formModel.sliderVal" prop="sliderVal" label="滑块" />
            <el-form-radio-group v-model="formModel.radioVal" prop="radioVal" label="单选组">
              <el-radio value="1">选项一</el-radio>
              <el-radio value="2">选项二</el-radio>
            </el-form-radio-group>
            <el-form-checkbox-group v-model="formModel.checkboxVals" prop="checkboxVals" label="多选组">
              <el-checkbox value="a">选项 A</el-checkbox>
              <el-checkbox value="b">选项 B</el-checkbox>
            </el-form-checkbox-group>
      </el-form>
      </div>
    </div>
    `,
  }),
  args: {
    inline: false,
    // labelPosition: 'left',
  },
};

export const Example12 = {
  name: '查询表单（响应式列数 + 操作区）',
  render: () => ({
    setup() {
      const formModel = reactive({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
      });
      return { formModel };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        块级 + 查询表单：拖拽容器调整宽度。断点：宽度 ≥1200 → 4 列；992～1199 → 3 列；小于 992 → 2 列。
        操作区同行靠右；按钮过多时整块换行仍靠右。可检查内部 <code>.el-form-query</code> 的 data-query-cols 属性。
      </p>
      <div
        style="
          resize: horizontal;
          overflow: auto;
          width: 1210px;
          max-width: 100%;
          min-width: 280px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
        "
      >
        <el-form :model="formModel" label-position="right" layout="block" :query-form="true">
          <el-form-input v-model="formModel.q1" prop="q1" label="条件条件条件条件条件条件一" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q2" prop="q2" label="条件二" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q3" prop="q3" label="条件三" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q4" prop="q4" label="条件四" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q5" prop="q5" label="条件五" placeholder="请输入" clearable />
          <template #actions>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
            <el-button>导出当前筛选</el-button>
            <el-button>高级筛选</el-button>
            <el-button>批量操作</el-button>
          </template>
        </el-form>
      </div>
      <p style="margin: 24px 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        对照：栅格 4 列 + 查询开关。收窄容器时列数仍为 4（不出现 3/2 列断点）。
      </p>
      <div
        style="
          resize: horizontal;
          overflow: auto;
          width: 520px;
          max-width: 100%;
          min-width: 260px;
          padding: 12px;
          border: 1px dashed var(--el-border-color);
          border-radius: 4px;
          box-sizing: border-box;
        "
      >
        <el-form :model="formModel" label-position="right" layout="grid" columns="4" :query-form="true">
          <el-form-input v-model="formModel.q1" prop="q1" label="条件一" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q2" prop="q2" label="条件二" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q3" prop="q3" label="条件三" placeholder="请输入" clearable />
          <el-form-input v-model="formModel.q4" prop="q4" label="条件四" placeholder="请输入" clearable />
        </el-form>
      </div>
    </div>
    `,
  }),
};

/** 块级 / 查询表单中使用 el-form-item-group（columns 2/3，嵌套 el-form-select 等） */
export const Example13 = {
  name: '表单项分组（块级 / 查询 + columns 2/3）',
  render: () => ({
    setup() {
      const selectOptions = [
        { label: '待审批', value: 0 },
        { label: '已审批', value: 1 },
        { label: '已拒绝', value: 2 },
      ];
      const formModel = reactive({
        name: '',
        status: '',
        city: '',
        type: '',
        owner: '',
        level: '',
        keyword: '',
        remark: '',
      });
      return { formModel, selectOptions };
    },
    template: `
    <div style="padding: 8px 0;">
      <p style="margin: 0 0 12px;color: var(--el-text-color-secondary);font-size: 13px;">
        <code>el-form-item-group</code> 的 <code>columns</code> 表示占用 N 倍表单项宽度（非内部分列）：
        块级为内容区约 N × 控件宽；查询表单为跨 N 列，且不超过容器宽度。内部嵌套 <code>el-form-select</code> 等。
      </p>

      <h4 style="margin: 0 0 8px;font-size: 14px;">块级表单 · columns=2（占 2 倍宽度，含必填 *）</h4>
      <el-form :model="formModel" label-position="right" layout="block" style="margin-bottom: 28px;">
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
        <el-form-item-group label="联系信息" :columns="2" :is-required="true">
          <el-form-input v-model="formModel.name" prop="name"  placeholder="请输入" clearable />

        </el-form-item-group>
        <el-form-input v-model="formModel.remark" prop="remark" label="备注" placeholder="普通表单项" clearable />
      </el-form>

      <h4 style="margin: 0 0 8px;font-size: 14px;">块级表单 · columns=3（占 3 倍宽度）</h4>
      <el-form :model="formModel" label-position="right" layout="block" style="margin-bottom: 28px;">
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
            prop="typeB"
            label="类型"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-input v-model="formModel.name" prop="titleB" label="标题" placeholder="请输入" clearable />
          <el-form-select
            v-model="formModel.status"
            prop="statusB"
            label="状态"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
          <el-form-select
            v-model="formModel.city"
            prop="cityB"
            label="城市"
            placeholder="请选择"
            clearable
            :dataSource="selectOptions"
          />
        </el-form-item-group>
      </el-form>

      <h4 style="margin: 0 0 8px;font-size: 14px;">查询表单 · columns=2（跨 2 列）</h4>
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
        <el-form :model="formModel" label-position="right" layout="block" :query-form="true">
          <el-form-input v-model="formModel.keyword" prop="keyword" label="关键词" placeholder="请输入" clearable />
          <el-form-item-group label="筛选条件" :columns="2" :is-required="true">
            <el-form-select
              v-model="formModel.status"
              prop="qStatus"
              label="状态"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.city"
              prop="qCity"
              label="城市"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.type"
              prop="qType"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.owner"
              prop="qOwner"
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

      <h4 style="margin: 0 0 8px;font-size: 14px;">查询表单 · columns=3（跨 3 列，不超过容器）</h4>
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
        <el-form :model="formModel" label-position="right" layout="block" :query-form="true">
                  <el-form-select
              v-model="formModel.type"
              prop="qType3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
          <el-form-item-group label="高级筛选" :columns="2">
            <el-form-select
              v-model="formModel.status"
              prop="qStatus3"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.city"
              prop="qCity3"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
  
        
          </el-form-item-group>
            <el-form-select
              v-model="formModel.type"
              prop="qType3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
                     <el-form-select
              v-model="formModel.type"
              prop="qType3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
                     <el-form-select
              v-model="formModel.type"
              prop="qType3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
            <el-form-select
              v-model="formModel.type"
              prop="qType3"
              label="类型"
              placeholder="请选择"
              clearable
              :dataSource="selectOptions"
            />
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
