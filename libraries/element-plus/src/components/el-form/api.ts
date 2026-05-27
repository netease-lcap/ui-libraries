/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      baseInfo: {
        title:
          "(this.getAttribute('id')?.value === 'dynamicRenderContainer' && this.getAttribute('processPrefix')) ? '流程表单' : '表单' ",
      },

      // structured: true,
    },
  })
  @Component({
    title: '表单',
    icon: 'form',
    description: '用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。',
    group: 'Form',
  })
  export class ElForm extends ViewComponent {
    @Method({
      title: '重置表单',
      description:
        "表单里面没有重置按钮<button type=\"reset\" />时可以使用该方法，默认重置全部字段为空，该方法会触发 reset 事件。如果表单属性 resetType='empty' 或者 reset.type='empty' 会重置为空；如果表单属性 resetType='initial' 或者 reset.type='initial' 会重置为表单初始值。",
    })
    resetForm(): void {}

    @Method({
      title: '校验函数',
      description: '校验函数，包含错误文本提示等功能',
    })
    validated(): {
      valid: nasl.core.Boolean;
    } {
      return {} as any;
    }
    @Method({
      title: '校验函数',
      description: '校验指定表单字段，绑定字段列表',
    })
    validateField(
      @Param({
        title: 'undefined',
        description: '需要验证的表单项 prop',
      })
      props: nasl.collection.List<nasl.core.String>,
    ): {
      valid: nasl.core.Boolean;
    } {
      return {} as any;
    }

    constructor(options?: Partial<ElFormOptions>) {
      super();
    }
  }

  export class ElFormOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '标签布局',
      description: '选择表单标签的对齐方式',
      docDescription: '控制表单字段标签的对齐方式。左对齐：标签在左侧；右对齐：标签在右侧；顶部对齐：标签在字段上方。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左对齐' }, { title: '右对齐' }, { title: '顶部对齐' }],
      },
    })
    labelPosition: 'left' | 'right' | 'top' = 'right';

    @Prop({
      group: '主要属性',
      title: '表单布局',
      docDescription:
        '更改表单的布局方式。行内展示：标签与控件同一行，表单容器支持收缩与换行（窄于各字段最小宽度后换行）；块级展示：宽度占满父级；栅格展示：可设置列数。宽度令牌：`--el-form-label-width`、`--el-form-content-width`、`--el-form-label-min-width`、`--el-form-content-min-width`（定义于 `.el-form`）。表单项内容区内仅对白名单控件（如输入框、选择器、日期等）铺满宽度，单选/多选组等不强制拉满。BREAKING：`--el-form-inline-content-width` 已与内容区同源默认 240px，依赖旧行内更窄（如 220px）的页面请在主题或表单上覆盖变量。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '行内展示' }, { title: '块级展示' }, { title: '栅格展示，可设置列数' }],
      },
      onChange: [{ clear: ['columns'] }, { update: { columns: 1 }, if: (_) => _ === 'grid' }],
    })
    layout: 'inline' | 'block' | 'grid' = 'block';


    @Prop({
      group: '主要属性',
      title: '查询表单',
      description:
        '是否启用查询表单布局。当「表单布局」为栅格时：列数仅由「列数」决定，不随容器宽度在 2/3/4 列间切换；开启本项也不会改变栅格列数。当「表单布局」为行内或块级时：按表单容器宽度响应式列数（宽度≥1200px 为 4 列，992px 以上且小于 1200px 为 3 列，宽度小于 992px 为 2 列），并可使用「操作区」插槽；操作区与表单项同行靠右，按钮过多时可整块换行仍靠右。',
      docDescription:
        '与「表单布局」配合：`layout` 为栅格时仅用 `columns`，无断点列数；`layout` 为行内/块级且开启本项时，用容器宽度断点与操作区插槽。操作插槽仅在非栅格且开启本项时参与布局。',
      setter: { concept: 'SwitchSetter' },
    })
    queryForm: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '列数',
      description: '整个表单的划分列数',
      docDescription: '整个表单的划分列数，此项需要设置表单布局为“栅格展示”。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      },
      if: (_) => _.layout === 'grid',
    })
    columns: nasl.core.Decimal | nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '行内布局',
      description: '是否使用行内布局模式',
      docDescription: '开启后，表单字段会水平排列在同一行，适用于字段较少的表单。关闭后使用垂直布局，字段会垂直排列。',
      deprecation: '请使用「表单布局」layout="inline"属性代替',
      setter: { concept: 'SwitchSetter' },
      if: (_) => false,
    })
    inline: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '隐藏必填标记',
      description: '是否隐藏必填字段的星号标记',
      docDescription: '开启后，必填字段不会显示红色星号(*)标记。关闭后，必填字段会显示星号标记提醒用户。',
      setter: { concept: 'SwitchSetter' },
    })
    hideRequiredAsterisk: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '星号位置',
      description: '必填标记星号的位置',
      docDescription: '控制必填字段星号标记的位置。左：星号在标签左侧；右：星号在标签右侧。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左' }, { title: '右' }],
      },
    })
    requireAsteriskPosition: 'left' | 'right' = 'left';

    @Prop({
      group: '主要属性',
      title: '显示错误信息',
      description: '是否显示表单验证错误信息',
      docDescription: '开启后，当表单验证失败时会显示错误提示信息。关闭后，即使验证失败也不会显示错误信息。',
      setter: { concept: 'SwitchSetter' },
    })
    showMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '行内错误信息',
      description: '是否在字段右侧显示错误信息',
      docDescription: '开启后，错误信息会显示在字段的右侧。关闭后，错误信息会显示在字段的下方。',
      setter: { concept: 'SwitchSetter' },
    })
    inlineMessage: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自动滚动',
      description: '验证失败时是否自动滚动到错误字段',
      docDescription: '开启后，当表单验证失败时会自动滚动到第一个有错误的字段，方便用户快速定位问题。',
      setter: { concept: 'SwitchSetter' },
    })
    scrollToError: nasl.core.Boolean = false;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用整个表单',
      docDescription: '开启后，整个表单将变为禁用状态，所有表单字段都无法操作。适用于只读展示场景。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '预览模式',
      description: '是否启用预览模式',
      docDescription: '开启后，表单会以预览模式显示，通常用于只读展示场景。',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '表单尺寸',
      description: '选择表单的整体尺寸',
      docDescription:
        '控制表单的整体尺寸，影响所有表单字段的大小。小：紧凑型表单；中：标准尺寸；大：宽松型表单；默认：使用系统默认尺寸。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中' }, { title: '大' }, { title: '默认' }],
      },
    })
    size: 'small' | 'medium' | 'large' | '' = '';

    @Prop<ElFormOptions, 'labelWidth'>({
      group: '样式属性',
      title: '标签宽度',
      description: '设置表单标签的宽度,auto 表示自动计算',
      docDescription: '统一设置所有表单字段标签的宽度。可以设置为具体数值(如"100px")或百分比(如"20%")。',
      setter: {
        concept: 'InputSetter',
      },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal='auto';

    // @Prop({
    //   group: '主要属性',
    //   title: '标签过长省略',
    //   description: '文字过长是否省略显示。默认文字超出时会换行。',
    //   docDescription: '文字过长是否省略显示，默认文字超出时会换行。',
    //   setter: {
    //       concept: 'SwitchSetter',
    //   },
    // })
    // labelEllipsis: nasl.core.Boolean = false;

    // @Prop<ElFormOptions, 'gutterType'>({
    //   group: '样式属性',
    //   title: '表单项间隔',
    //   description: '可以整体设置表单项间隔',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: '小' },
    //       { title: '中' },
    //       { title: '大' },
    //       { title: '自定义' },
    //     ],
    //   },
    //   onChange: [{
    //     clear: ['gutter'],
    //     if: (val) => val !== 'custom',
    //   }, {
    //     update: {
    //       gutter: '16px',
    //     },
    //     if: (val) => val === 'custom',
    //   }]
    // })
    // gutterType: 'small' | 'medium' | 'large' | 'custom'  = 'medium';

    // @Prop<ElFormOptions, 'gutter'>({
    //   group: '样式属性',
    //   title: '自定义表单项间隔(px)',
    //   description: '可以整体设置表单项间隔, 例如 8px',
    //   setter: {
    //     concept: 'InputSetter',
    //   },
    //   if: (_) => _.gutterType === 'custom',
    // })
    // gutter: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '隐藏必填标记',
    //   description: '是否隐藏必填标记（*），默认显示',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // hideRequiredAsterisk: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '星号的位置',
    //   description: '星号的位置',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '左' }, { title: '右' }],
    //   },
    // })
    // requireAsteriskPosition: 'left' | 'right' = 'left';

    // @Prop({
    //   group: '主要属性',
    //   title: '显示错误信息',
    //   description: '是否显示错误信息，默认显示',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // showMessage: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '行内错误信息',
    //   description: '是否显示行内错误信息',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // inlineMessage: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '自动滚动到错误信息',
    //   description: '是否自动滚动到错误信息',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // scrollToError: nasl.core.Boolean = false;

    // @Prop({
    //   group: '样式属性',
    //   title: '表单尺寸',
    //   description: '可以整体设置表单尺寸',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: '小' },
    //       { title: '中' },
    //       { title: '大' },
    //       { title: '默认' },
    //     ],
    //   },
    // })
    // size: 'small' | 'medium' | 'large' | '' = '';

    // @Prop({
    //   group: '主要属性',
    //   title: '行内布局',
    //   description: '是否行内布局',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // inline: nasl.core.Boolean = false;
    // @Prop({
    //   group: '主要属性',
    //   title: '冒号',
    //   description: '是否在表单标签字段右侧显示冒号',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // hideRequiredAsterisk: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '阻止表单默认提交',
    //   description:
    //     '是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // preventSubmitDefault: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '重置表单的方式',
    //   description:
    //     '重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '重置表单为空' }, { title: '重置表单数据为初始值' }],
    //   },
    // })
    // resetType: 'empty' | 'initial' = 'empty';

    // @Prop({
    //   group: '主要属性',
    //   title: '自动滚动到校验不通过的字段',
    //   description: '表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '不滚动' }, { title: '平滑滚动' }, { title: '瞬间直达' }],
    //   },
    // })
    // scrollToFirstError: '' | 'smooth' | 'auto' = '';

    // @Prop({
    //   group: '主要属性',
    //   title: '显示错误提示',
    //   description:
    //     '校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给表单项设置该属性',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // showErrorMessage: nasl.core.Boolean = true;

    // @Prop({
    //   group: '主要属性',
    //   title: '显示状态图标',
    //   description:
    //     '校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // statusIcon: nasl.core.Boolean = false;

    // @Event({
    //   title: '重置时',
    //   description: '表单重置时触发',
    // })
    // onValidate: (event: {}) => any;

    // @Event({
    //   title: '提交时',
    //   description:
    //     '表单提交时触发。其中 `context.validateResult` 表示校验结果，`context.firstError` 表示校验不通过的第一个规则提醒。`context.validateResult` 值为 `true` 表示校验通过；如果校验不通过，`context.validateResult` 值为校验结果列表。<br />【注意】⚠️ 默认情况，输入框按下 Enter 键会自动触发提交事件，如果希望禁用这个默认行为，可以给输入框添加  enter 事件，并在事件中设置 `e.preventDefault()`。',
    // })
    // onSubmit: (event: { valid: nasl.core.Boolean; firstError: nasl.core.String }) => any;

    @Event({
      title: '表单项校验后',
      description: '任一表单项被校验后触发',
    })
    onValidate: (event: { prop: nasl.core.String; isValid: nasl.core.Boolean; message: nasl.core.String }) => any;

    @Slot({
      title: '表单内容',
      description: '插入表单项',
      // emptyBackground: 'add-sub-large',
      // snippets: [
      //   {
      //     title: '表单项',
      //     code: '<el-form-item-pro><template #label><el-text text="表单项"></el-text></template></el-form-item-pro>',
      //   },
      // ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '操作区',
      description:
        '查询表单的查询/重置等按钮区域。仅在开启「查询表单」且「表单布局」不为栅格时与表单项同排靠右或整块换行仍靠右；栅格布局下列数仍由「列数」决定，本插槽不参与断点列数逻辑（是否展示以运行时为准）。',
    })
    slotActions: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      ignoreProperty: ['rules'],
      structured: false,
      forbid: true,
      suggest: {
        name: 'el-flex',
      },
      slotWrapperInlineStyle: {
        label: 'display: inline-block;',
      },
      forceUpdateWhenAttributeChange: true,
      forceRefresh: true,
      namedSlotOmitWrapper: ['label'],
    },
  })
  @Component({
    title: '表单项',
    description: '表单项',
  })
  export class ElFormItemPro extends ViewComponent {
    constructor(options?: Partial<ElFormItemProOptions>) {
      super();
    }
  }

  export class ElFormItemProOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: 'For',
    //   description: 'label 原生属性',
    //   setter: { concept: 'InputSetter' },
    // })
    // for: nasl.core.String;
    @Prop<ElFormItemProOptions, 'prop'>({
      group: '数据属性',
      title: '表单字段名称',
      description: '表单字段名称',
      setter: { concept: 'InputSetter' },
    })
    prop: nasl.core.String;

    // @Prop<ElFormItemProOptions, 'initialValue'>({
    //   group: '数据属性',
    //   title: '初始值',
    //   description: '初始值,重置表单时回到初始值',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => !_.useRangeValue,
    // })
    // initialValue: any;

    // @Prop<ElFormItemProOptions, 'useRangeValue'>({
    //   group: '数据属性',
    //   title: '使用区间字段',
    //   description: '使用区间字段, 用于日期、时间、日期时间选择器开启区间选择时，托管起始值与结束值',
    //   setter: { concept: 'SwitchSetter' },
    //   onChange: [{
    //     clear: ['startFieldName', 'endFieldName'],
    //     if: (_) => !_,
    //   }, {
    //     clear: ['name'],
    //     if: (_) => !_
    //   }],
    //   bindHide: true,
    // })
    // useRangeValue: nasl.core.Boolean = false;

    // @Prop<ElFormItemProOptions, 'startFieldName'>({
    //   group: '数据属性',
    //   title: '起始值字段名称',
    //   description: '起始值字段名称，对应区间选择时起始值字段',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => _.useRangeValue === true,
    // })
    // startFieldName: nasl.core.String;

    // @Prop<ElFormItemProOptions, 'endFieldName'>({
    //   group: '数据属性',
    //   title: '结束值字段名称',
    //   description: '结束值字段名称，对应选择时结束值字段',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => _.useRangeValue === true,
    // })
    // endFieldName: nasl.core.String;

    // @Prop<ElFormItemProOptions, 'startInitialValue'>({
    //   group: '数据属性',
    //   title: '起始初始值',
    //   description: '起始初始值',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => _.useRangeValue === true,
    // })
    // startInitialValue: any;

    // @Prop<ElFormItemProOptions, 'endInitialValue'>({
    //   group: '数据属性',
    //   title: '结束初始值',
    //   description: '结束初始值',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => _.useRangeValue === true,
    // })
    // endInitialValue: any;

    // @Prop({
    //   group: '主要属性',
    //   title: '占据数',
    //   description: '列跨越的格数, 总格式',
    //   docDescription: '列跨越的格数。',
    //   setter: {
    //       concept: 'NumberInputSetter',
    //       min: 1,
    //   },
    // })
    // colSpan: nasl.core.Integer = 1;

    // @Prop<ElFormItemProOptions, 'help'>({
    //   group: '主要属性',
    //   title: '帮助文本',
    //   description: '表单项说明内容。',
    //   setter: { concept: 'InputSetter' },
    //   if: (_) => !_.helpIsSlot,
    // })
    // help: nasl.core.String;

    // @Prop<ElFormItemProOptions, 'helpIsSlot'>({
    //   group: '主要属性',
    //   title: '帮助文本使用插槽',
    //   description: '帮助文本使用插槽方式添加',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    //   onChange: [{
    //     clear: ['help'],
    //     if: (val) => val
    //   }]
    // })
    // helpIsSlot: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '隐藏标签',
    //   description: '不显示表单标签',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // hiddenLabel: nasl.core.Boolean = false;

    // @Prop<ElFormItemProOptions, 'labelAlign'>({
    //   group: '主要属性',
    //   title: '标签布局',
    //   description:
    //     '表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: '左对齐' },
    //       { title: '右对齐' },
    //       { title: '顶部对齐' },
    //       { title: '使用表单设置' },
    //     ],
    //   },
    //   if: (_) => !_.hiddenLabel,
    // })
    // labelAlign: 'left' | 'right' | 'top' | '' = '';

    // @Prop<ElFormItemProOptions, 'labelWidthType'>({
    //   group: '主要属性',
    //   title: '标签宽度',
    //   description: '可以整体设置label标签宽度',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [
    //       { title: '小' },
    //       { title: '中' },
    //       { title: '大' },
    //       { title: '自定义' },
    //     ],
    //   },
    //   if: (_) => !_.hiddenLabel,
    // })
    // labelWidthType: 'small' | 'medium' | 'large' | '';

    @Prop<ElFormItemProOptions, 'labelWidth'>({
      group: '主要属性',
      title: '标签宽度',
      description: '可以整体设置标签宽度，优先级高于表单项',
      setter: { concept: 'InputSetter' },
    })
    labelWidth: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '验证规则',
      description: '表单字段校验规则。',
      setter: { concept: 'InputSetter' },
      bindHide: true,
    })
    rules: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '忽略验证规则',
      description: '忽略验证规则。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ignoreRules: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '验证触发方式',
      description: '验证逻辑的触发方式',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '失去焦点' }, { title: '改变' }] },
    })
    trigger: 'blur' | 'change' = 'blur';

    @Prop({
      group: '主要属性',
      title: '必填标记',
      description: '是否为必填项，如不设置，则会根据校验规则确认',
      setter: { concept: 'SwitchSetter' },
    })
    isRequired: nasl.core.Boolean = false;

    @Slot({
      title: '标签',
      description: '字段标签名称。',
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '表单组件',
      description: '表单组件',
      // snippets: [
      //   {
      //     title: '表单项',
      //     code: '<el-form-item-pro></el-form-item-pro>',
      //   },
      // ],
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
