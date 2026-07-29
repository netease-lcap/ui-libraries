/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        total: '50',
      },
    },
  })
  @Component({
    title: '翻页器',
    icon: 'pagination',
    description: '',
    group: 'Navigation',
  })
  export class ElPagination extends ViewComponent {
    @Prop({
      title: '总条目数',
      description: '数据的总条目数',
    })
    total: nasl.core.Integer;

    @Prop({
      title: '每页条数',
      description: '每页显示的条目数',
    })
    pageSize: nasl.core.Integer;

    @Prop({
      title: '当前页码',
      description: '当前显示的页码',
    })
    currentPage: nasl.core.Integer;

    @Prop({
      title: '禁用',
      description: '是否禁用分页组件',
    })
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<ElPaginationOptions>) {
      super();
    }
  }

  export class ElPaginationOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '当前页码',
      description: '当前显示的页码',
      docDescription: '绑定当前显示的页码，支持双向绑定。可以获取或设置当前页。',
      sync: true,
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    currentPage: nasl.core.Integer = 1;

    @Prop({
      group: '数据属性',
      title: '总条目数',
      description: '数据的总条目数',
      docDescription: '设置数据的总条目数，用于计算总页数。分页器会根据总条目数和每页条数自动计算页数。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
        precision: 0,
      },
    })
    total: nasl.core.Integer = 0;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '页码按钮数',
      description: '显示的页码按钮数量',
      docDescription: '设置显示的页码按钮数量。当总页数超过该值时会折叠显示，中间用省略号代替。',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
        precision: 0,
      },
    })
    pagerCount: nasl.core.Decimal = 7;

    @Prop({
      group: '主要属性',
      title: '按钮背景',
      description: '是否为按钮添加背景色',
      docDescription: '开启后，分页按钮会显示背景色，视觉效果更突出。关闭后使用简洁的无背景样式。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    background: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '组件尺寸',
      description: '选择分页器的尺寸大小',
      docDescription: '控制分页器的整体尺寸。小：紧凑型分页器；中等：标准尺寸；大：宽松型分页器。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '小' }, { title: '中等' }, { title: '大' }],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

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
    prevText: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '下一页文本',
      description: '下一页文本',
      setter: { concept: 'InputSetter' },
    })
    nextText: nasl.core.String;

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
    onChange: (event: { currentPage: nasl.core.Integer; pageSize: nasl.core.Integer }) => any;

    @Event({
      title: '上一页点击时',
      description: '上一页点击时触发',
    })
    onPrevClick: () => any;

    @Event({
      title: '下一页点击时',
      description: '下一页点击时触发',
    })
    onNextClick: () => any;
  }
}
