/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    ideusage: {
      "idetype": "container",
      "structured": true,
    }
  })
  @Component({
    title: '分页',
    icon: 'pagination',
    description: '当数据量过多时，使用分页分解数据。',
    group: 'Selector',
  })
  export class ElPagination extends ViewComponent {
    constructor(options?: Partial<ElPaginationOptions>) {
      super();
    }
  }

  export class ElPaginationOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '是否使用小型分页样式',
      description: '是否使用小型分页样式',
      setter: { concept: 'SwitchSetter' },
    })
    small: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否为分页按钮添加背景色',
      description: '是否为分页按钮添加背景色',
      setter: { concept: 'SwitchSetter' },
    })
    background: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      sync: true,
      title: '每页显示条目个数',
      description: '每页显示条目个数，支持 .sync 修饰符',
      setter: { concept: 'NumberInputSetter' },
    })
    pageSize: nasl.core.Decimal = 10;

    @Prop({
      group: '数据属性',
      title: '总条目数',
      description: '总条目数',
      setter: { concept: 'NumberInputSetter' },
    })
    total: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '总页数',
      description:
        '总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性',
      setter: { concept: 'NumberInputSetter' },
    })
    pageCount: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '页码按钮的数量',
      description: '页码按钮的数量，当总页数超过该值时会折叠',
      setter: { concept: 'NumberInputSetter' },
    })
    pagerCount: nasl.core.Decimal = 7;

    @Prop({
      group: '主要属性',
      sync: true,
      title: '当前页数',
      description: '当前页数，支持 .sync 修饰符',
      setter: { concept: 'NumberInputSetter' },
    })
    currentPage: nasl.core.Decimal = 1;

    @Prop({
      group: '主要属性',
      title: '布局方式',
      description: '组件布局，子组件名用逗号分隔',
      setter: { concept: 'InputSetter' },
    })
    layout: nasl.core.String = 'prev, pager, next, jumper, ->, total';

    @Prop({
      group: '数据属性',
      title: '每页显示的页码数量选项设置',
      description: '每页显示个数选择器的选项设置',
      setter: { concept: 'InputSetter' },
    })
    pageSizes: nasl.collection.List<nasl.core.Integer> = [10, 20, 30, 40, 50, 100];

    @Prop({
      group: '样式属性',
      title: '下拉框类名',
      description: '每页显示个数选择器的下拉框类名',
      setter: { concept: 'InputSetter' },
    })
    popperClass: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '上一页文字',
      description: '替代图标显示的上一页文字',
      setter: { concept: 'InputSetter' },
    })
    prevText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '下一页文字',
      description: '替代图标显示的下一页文字',
      setter: { concept: 'InputSetter' },
    })
    nextText: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只有一页时是否隐藏',
      description: '只有一页时是否隐藏',
      setter: { concept: 'SwitchSetter' },
    })
    hideOnSinglePage: nasl.core.Boolean;

    @Event({
      title: '页数改变时',
      description: 'pageSize 改变时会触发',
    })
    onSizeChange: (event: any) => any;

    @Event({
      title: '当前页改变时',
      description: 'currentPage 改变时会触发',
    })
    onCurrentChange: (event: any) => any;

    @Event({
      title: '用户点击上一页按钮时',
      description: '用户点击上一页按钮改变当前页后触发',
    })
    onPrevClick: (event: any) => any;

    @Event({
      title: '用户点击下一页按钮时',
      description: '用户点击下一页按钮改变当前页后触发',
    })
    onNextClick: (event: any) => any;

    @Slot({
      title: '内容',
      description: '自定义内容，需要在 `layout` 中列出 `slot`',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
