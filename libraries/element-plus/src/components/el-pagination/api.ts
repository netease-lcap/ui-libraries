/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '翻页器',
    icon: 'pagination',
    description: '',
    group: 'Navigation',
  })
  export class ElPaginationPlus extends ViewComponent {
    constructor(options?: Partial<ElPaginationPlusOptions>) {
      super();
    }
  }

  export class ElPaginationPlusOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '当前页',
      description: '当前页',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    currentPage: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: 'Default Current Page',
      description: '当前页。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    private defaultCurrentPage: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用分页组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '设置最大页码按钮数',
      description: '页码按钮的数量，当总页数超过该值时会折叠',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    pagerCount: nasl.core.Decimal = 7;

    @Prop({
      group: '主要属性',
      title: '最多页码按钮数',
      description: '最多显示页码按钮数',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    maxPageBtn: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: '前后省略模式',
      description:
        '页码数量超出时，前后省略模式。可选项：mid/both-ends',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '中间省略' },
          { title: '两端省略' }
        ],
      },
    })
    pageEllipsisMode: 'mid' | 'both-ends' = 'mid';

    @Prop({
      group: '主要属性',
      sync: true,
      title: '分页数量',
      description: '每一页的数据量。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    pageSize: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: 'Default Page Size',
      description: '每一页的数据量。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    private defaultPageSize: nasl.core.Decimal = 10;

    @Prop({
      group: '主要属性',
      title: '分页大小选项',
      description: '分页大小控制器，值为 [] 则不显示。',
      setter: {
        concept: 'InputSetter',
      },
    })
    pageSizeOptions: nasl.collection.List<nasl.core.Integer> = [5, 10, 20, 50];

    @Prop({
      group: '交互属性',
      title: '显示跳转首页尾页页码',
      description: '是否显示跳转首页尾页页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showFirstAndLastPageBtn: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '显示跳转页码',
      description: '是否显示跳转页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showJumper: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '显示页码',
      description: '是否显示页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPageNumber: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '显示分页数量',
      description: '是否显示分页数量控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPageSize: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '显示跳转前后页页码',
      description: '是否显示跳转前后页页码控制器',
      setter: { concept: 'SwitchSetter' },
    })
    showPreviousAndNextBtn: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '分页组件尺寸。可选项：small/medium',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中等' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '风格',
      description: '分页组件风格。可选项：default/simple',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '简单' }],
      },
    })
    theme: 'default' | 'simple' = 'default';

    @Prop({
      group: '主要属性',
      title: '总条目数',
      description: '数据总条数',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
    })
    total: nasl.core.Integer = 0;

    @Prop({
      group: '交互属性',
      title: '显示总条目数',
      description: '默认显示总条数',
      setter: { concept: 'SwitchSetter' },
    })
    totalContent: nasl.core.Boolean = true;

    @Event({
      title: '改变时',
      description: '当前页或分页大小发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: '当前页改变时',
      description: '当前页发生变化时触发',
    })
    onCurrentChange: (event: any) => any;

    @Event({
      title: '分页大小改变时',
      description: '分页大小发生变化时触发',
    })
    onPageSizeChange: (event: any) => any;

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
}
