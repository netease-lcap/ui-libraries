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
  export class ElPagination extends ViewComponent {
    constructor(options?: Partial<ElPaginationOptions>) {
      super();
    }
  }

  export class ElPaginationOptions extends ViewComponentOptions {
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
      title: '是否为分页按钮添加背景色	',
      description: '是否为分页按钮添加背景色	',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    background: nasl.core.Boolean = false;

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
      group: '数据属性',
      title: '当前页',
      description: '当前页',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    currentPage: nasl.core.Integer = 1;

    @Prop({
      group: '交互属性',
      title: '显示跳转页码',
      description: 'sizes, prev, pager, next, jumper, total, ',
      setter: { concept: 'InputSetter' },
    })
    layout: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Default Current Page',
      description: '当前页。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    private defaultCurrentPage: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '分页大小选项',
      description: '分页大小控制器，值为 [] 则不显示。',
      setter: {
        concept: 'InputSetter',
      },
    })
    pageSizes: nasl.collection.List<nasl.core.Integer> = [5, 10, 20, 50];

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
      group: '交互属性',
      title: '上一页文本',
      description: '上一页文本',
      setter: { concept: 'InputSetter' },
    })
    prevtext: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '下一页文本',
      description: '下一页文本',
      setter: { concept: 'InputSetter' },
    })
    nexttext: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用分页组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Default Page Size',
      description: '每一页的数据量。非受控属性',
      setter: { concept: 'NumberInputSetter' },
    })
    private defaultPageSize: nasl.core.Decimal = 10;


    @Prop({
      group: '主要属性',
      title: '是否在单页时隐藏',
      description: '是否在单页时隐藏',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hideOnSinglePage: nasl.core.Boolean = false;

    @Event({
      title: '分页大小改变时',
      description: '分页大小发生变化时触发。',
    })
    onSizeChange: (event: nasl.core.Integer) => any;

    @Event({
      title: '当前页改变时',
      description: '当前页发生变化时触发',
    })
    onCurrentChange: (event: nasl.core.Integer) => any;


    @Event({
      title: '改变时',
      description: '当前页或分页大小发生变化时触发。',
    })
    onChange: (event: any) => any;

    @Event({
      title: '上一页点击时触发',
      description: '上一页点击时触发',
    })
    onPrevClick: (event: any) => any;

    @Event({
      title: '下一页点击时',
      description: '下一页点击时触发',
    })
    onNextClick: (event: any) => any;

  }
}
