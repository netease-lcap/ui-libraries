/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '分页',
    icon: 'pagination',
    description: '',
    group: 'Navigation',
  })
  export class ElPaginationPro extends ViewComponent {
    constructor(options?: Partial<ElPaginationProOptions>) {
      super();
    }
  }

  export class ElPaginationProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Current',
      description: '当前页。支持语法糖 `v-model`',
      setter: { concept: 'NumberInputSetter' },
    })
    current: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: 'Default Current',
      description: '当前页。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    defaultCurrent: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用分页组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Folded Max Page Btn',
      description: '折叠时最多显示页码按钮数',
      setter: { concept: 'NumberInputSetter' },
    })
    foldedMaxPageBtn: nasl.core.Decimal = 5;

    @Prop({
      group: '主要属性',
      title: 'Max Page Btn',
      description: '最多显示页码按钮数',
      setter: { concept: 'NumberInputSetter' },
    })
    maxPageBtn: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: 'Page Ellipsis Mode',
      description:
        '页码数量超出时，前后省略模式, `mid`表示中间省略, `both-ends` 表示两端省略。可选项：mid/both-ends',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'mid' }, { title: 'both-ends' }],
      },
    })
    pageEllipsisMode: 'mid' | 'both-ends' = 'mid';

    @Prop({
      group: '主要属性',
      sync: true,
      title: 'Page Size',
      description: '每一页的数据量。支持语法糖 `.sync`',
      setter: { concept: 'NumberInputSetter' },
    })
    pageSize: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: 'Default Page Size',
      description: '每一页的数据量。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    defaultPageSize: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: 'Page Size Options',
      description: '分页大小控制器，值为 [] 则不显示。',
      setter: { concept: 'InputSetter' },
    })
    pageSizeOptions: any[] = [5, 10, 20, 50];

    @Prop({
      group: '主要属性',
      title: 'Select Props',
      description:
        '透传全部属性到 Select 组件，也可使用 `selectProps.popupProps` 透传全部 Popup 组件。',
      setter: { concept: 'InputSetter' },
    })
    selectProps: object;

    @Prop({
      group: '主要属性',
      title: 'Show First And Last Page Btn',
      description: '是否显示跳转首页尾页页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showFirstAndLastPageBtn: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Jumper',
      description: '是否显示跳转页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showJumper: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Page Number',
      description: '是否显示页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPageNumber: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Show Page Size',
      description: '是否显示分页数量控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPageSize: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Show Previous And Next Btn',
      description: '是否显示跳转前后页页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPreviousAndNextBtn: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '分页组件尺寸。可选项：small/medium',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'small' }, { title: 'medium' }],
      },
    })
    size: 'small' | 'medium' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Theme',
      description: '分页组件风格。可选项：default/simple',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'default' }, { title: 'simple' }],
      },
    })
    theme: 'default' | 'simple' = 'default';

    @Prop({
      group: '主要属性',
      title: 'Total',
      description: '数据总条数',
      setter: { concept: 'NumberInputSetter' },
    })
    total: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Total Content',
      description:
        '用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示。',
      setter: { concept: 'InputSetter' },
    })
    totalContent: any = true;

    @Event({
      title: 'On Change',
      description: '当前页或分页大小发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Current Change',
      description: '当前页发生变化时触发',
    })
    onCurrentChange: (event: any) => any;

    @Event({
      title: 'On Page Size Change',
      description: '分页大小发生变化时触发',
    })
    onPageSizeChange: (event: any) => any;

    @Slot({
      title: 'Total Content',
      description:
        '用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示。',
    })
    slotTotalContent: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: 'Pagination Mini',
          code: '<el-pagination-mini-pro></el-pagination-mini-pro>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Pagination Mini',
    icon: 'pagination-mini',
    description: '',
    group: 'Navigation',
  })
  export class ElPaginationMiniPro extends ViewComponent {
    constructor(options?: Partial<ElPaginationMiniProOptions>) {
      super();
    }
  }

  export class ElPaginationMiniProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '按钮禁用配置。',
      setter: { concept: 'InputSetter' },
    })
    disabled: nasl.core.Boolean | object;

    @Prop({
      group: '主要属性',
      title: 'Layout',
      description: '按钮方向。可选项：horizontal/vertical',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'horizontal' }, { title: 'vertical' }],
      },
    })
    layout: 'horizontal' | 'vertical' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: 'Show Current',
      description: '是否展示当前按钮。',
      setter: { concept: 'SwitchSetter' },
    })
    showCurrent: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size',
      description: '按钮尺寸。可选项：small/medium/large。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'small' },
          { title: 'medium' },
          { title: 'large。TS 类型：`SizeEnum`。[通用类型定义](https:' },
          { title: '' },
          { title: 'github.com' },
          { title: 'Tencent' },
          { title: 'tdesign-vue' },
          { title: 'blob' },
          { title: 'develop' },
          { title: 'src' },
          { title: 'common.ts)' },
        ],
      },
    })
    size:
      | 'small'
      | 'medium'
      | 'large。TS 类型：`SizeEnum`。[通用类型定义](https:'
      | ''
      | 'github.com'
      | 'Tencent'
      | 'tdesign-vue'
      | 'blob'
      | 'develop'
      | 'src'
      | 'common.ts)' = 'medium';

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description:
        '提示文案配置，值为 `true` 显示默认文案；值为 `false` 不显示提示文案；值类型为对象则单独配置文案内容。',
      setter: { concept: 'InputSetter' },
    })
    tips: object;

    @Prop({
      group: '主要属性',
      title: 'Variant',
      description: '按钮形式。可选项：text/outline',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'text' }, { title: 'outline' }],
      },
    })
    variant: 'text' | 'outline' = 'text';

    @Event({
      title: 'On Change',
      description: '按钮点击事件回调。',
    })
    onChange: (event: any) => any;
  }
}
