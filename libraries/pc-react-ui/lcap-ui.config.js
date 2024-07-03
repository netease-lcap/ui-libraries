module.exports = {
  componentsPath: 'src/components',
  i18n: {},
  blockGenerateType: 'story',
  components: [
    {
      group: 'Form',
      name: 'Form',
      alias: '表单',
    },
    { group: 'Navigation', name: 'ProLayout', alias: '导航栏' },
    {
      group: 'Form',
      name: 'QueryForm',
      alias: '查询表单',
      show: false,
      apiPath: 'Form/blocks-api/query-form.api.ts',
    },
    {
      group: 'Form',
      name: 'FormItemProps',
      alias: '表单项',
      show: false,
      apiPath: 'Form/blocks-api/form-item.api.ts',
    },
    {
      group: 'Form',
      name: 'Select',
      alias: '选择器',
    },
    {
      group: 'Form',
      name: 'FormSelect',
      alias: '表单选择器',
      apiPath: 'Select/blocks-api/form-select.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Form', name: 'InputNumber', alias: '数字输入' },
    {
      group: 'Form',
      name: 'FormInputNumber',
      alias: '表单数字输入',
      apiPath: 'InputNumber/blocks-api/form-input-number.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    // { group: 'Form', name: 'Transfer', alias: '穿梭框' },
    { group: 'Form', name: 'Switch', alias: '开关' },
    {
      group: 'Form',
      name: 'FormSwitch',
      alias: '表单开关',
      apiPath: 'Switch/blocks-api/form-switch.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    {
      group: 'Form',
      name: 'Input',
      alias: '单行输入',
    },
    {
      group: 'Form',
      name: 'FormInput',
      alias: '表单输入框',
      apiPath: 'Input/blocks-api/form-input.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Form', name: 'TextArea', alias: '多行输入' },
    {
      group: 'Form',
      name: 'FormTextArea',
      alias: '表单多行输入',
      apiPath: 'TextArea/blocks-api/form-text-area.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    {
      group: 'Form',
      name: 'CheckboxGroup',
      alias: '多选框',
      // apiPath: 'CheckboxGroup/api/api.ts',
    },
    {
      group: 'Form',
      name: 'FormCheckboxGroup',
      alias: '表单多选框',
      apiPath: 'CheckboxGroup/blocks-api/form-checkboxgroup.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Form', name: 'RadioGroup', alias: '单选框' },
    {
      group: 'Form',
      name: 'FormRadioGroup',
      alias: '表单单选组',
      apiPath: 'RadioGroup/blocks-api/form-radio-group.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    // { group: 'Form', name: 'Upload', alias: '文件上传' },

    { group: 'Table', name: 'Table', alias: '数据表格' },

    { group: 'Display', name: 'Text', alias: '文本' },
    { group: 'Display', name: 'Link', alias: '链接' },
    { group: 'Display', name: 'Button', alias: '按钮' },
    { group: 'Display', name: 'Descriptions', alias: '详情列表' },
    { group: 'Display', name: 'Image', alias: '图片展示' },
    { group: 'Display', name: 'Tag', alias: '标签' },
    { group: 'Display', name: 'Avatar', alias: '标签' },
    { group: 'Table', name: 'List', alias: '数据列表' },

    { group: 'Layout', name: 'Flex', alias: '线性布局' },

    // { group: 'Layout', name: 'AbsoluteLayout', alias: '自由布局' },

    { group: 'Layout', name: 'Row', alias: '栅格布局' },
    // { group: 'Layout', name: 'Layout', alias: '布局' },

    { group: 'Selector', name: 'Tabs', alias: '选项卡' },
    { group: 'Selector', name: 'Tree', alias: '树形视图' },
    { group: 'Selector', name: 'TreeSelect', alias: '树选择' },
    {
      group: 'Selector',
      name: 'FormTreeSelect',
      alias: '表单树形视图',
      apiPath: 'TreeSelect/blocks-api/form-tree-select.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },

    { group: 'Selector', name: 'Cascader', alias: '级联选择' },
    {
      group: 'Selector',
      name: 'FormCascader',
      alias: '表单级联选择',
      apiPath: 'Cascader/blocks-api/form-cascader.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Selector', name: 'DatePicker', alias: '日期选择' },
    {
      group: 'Selector',
      name: 'FormDatePicker',
      alias: '表单日期选择',
      apiPath: 'DatePicker/blocks-api/form-date-picker.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Selector', name: 'DateRangePicker', alias: '日期范围选择' },
    {
      group: 'Selector',
      name: 'FormDateRangePicker',
      alias: '表单日期范围选择',
      apiPath: 'DateRangePicker/blocks-api/form-date-range-picker.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Selector', name: 'TimePicker', alias: '时间选择' },
    {
      group: 'Selector',
      name: 'FormTimePicker',
      alias: '表单时间选择',
      apiPath: 'TimePicker/blocks-api/form-time-picker.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Selector', name: 'TimeRangePicker', alias: '时间范围选择' },
    {
      group: 'Selector',
      name: 'FormTimeangePicker',
      alias: '时间范围选择',
      apiPath: 'TimeRangePicker/blocks-api/form-time-range-picker.api.ts',
      extends: ['FormItemProps'],
      show: false,
    },
    { group: 'Selector', name: 'Steps', alias: '步骤条' },
    //

    { group: 'Feedback', name: 'Modal', alias: '弹窗' },

    { group: 'Feedback', name: 'Drawer', alias: '抽屉' },
    // { group: 'Feedback', name: 'Message', alias: '弹出消息' },
    { group: 'Feedback', name: 'Popover', alias: '弹出框' },

    { group: 'Container', name: 'Card', alias: '面板' },
    { group: 'Container', name: 'Router', alias: '子页面容器' },

    { group: 'Navigation', name: 'Breadcrumb', alias: '面包屑' },
    { group: 'Navigation', name: 'Dropdown', alias: '下拉菜单' },
    { group: 'Navigation', name: 'Menu', alias: '侧边栏' },
    { group: 'Display', name: 'Icon', alias: '图标' },
  ],
};
