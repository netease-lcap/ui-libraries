/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '栅格布局',
    icon: 'row',
    description: '通过基础的 24 分栏，迅速简便地创建布局。',
    group: 'Layout',
  })
  export class ElRow extends ViewComponent {
    constructor(options?: Partial<ElRowOptions>) {
      super();
    }
  }

  export class ElRowOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '栅格间隔',
      description: '栅格间隔',
      setter: { concept: 'NumberInputSetter' },
    })
    gutter: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '布局模式',
      description: '布局模式，可选 flex，现代浏览器下有效',
      setter: {
        concept: 'CapsulesSetter',
        options: [{ title: '默认布局', icon: 'layout-block', tooltip: '块级布局' }, { title: '弹性', icon: 'layout-flex', tooltip: '弹性布局' }],
      },
    })
    type: 'block' | 'flex' = 'block';

    @Prop({
      group: '主要属性',
      title: '水平排列方式',
      description: 'flex 布局下的水平排列方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'start' },
          { title: 'end' },
          { title: 'center' },
          { title: 'space-around' },
          { title: 'space-between' }
        ],
      },
    })
    justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between'

    @Prop({
      group: '主要属性',
      title: '垂直排列方式',
      description: 'flex 布局下的垂直排列方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '上' }, { title: '中' }, { title: '下' }],
      },
    })
    align: 'top' | 'middle' | 'bottom';

    @Prop({
      group: '主要属性',
      title: '自定义元素标签',
      description: '自定义元素标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
      emptyBackground: 'add-sub',
      snippets: [{ title: '列', code: '<el-col :span="1"></el-col>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '栅格列',
    icon: 'col',
    description: '',
    group: 'Layout',
  })
  export class ElCol extends ViewComponent {
    constructor(options?: Partial<ElColOptions>) {
      super();
    }
  }

  export class ElColOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '栅格占据的列数',
      description: '栅格占据的列数',
      setter: { concept: 'NumberInputSetter' },
    })
    span: nasl.core.Decimal = 24;

    @Prop({
      group: '主要属性',
      title: '栅格左侧的间隔格数',
      description: '栅格左侧的间隔格数',
      setter: { concept: 'NumberInputSetter' },
    })
    offset: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '栅格向右移动格数',
      description: '栅格向右移动格数',
      setter: { concept: 'NumberInputSetter' },
    })
    push: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '栅格向左移动格数',
      description: '栅格向左移动格数',
      setter: { concept: 'NumberInputSetter' },
    })
    pull: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Xs',
      description: '`<768px` 响应式栅格数或者栅格属性对象',
      setter: { concept: 'InputSetter' },
    })
    xs: nasl.core.Decimal | { span: nasl.core.Integer, offset: nasl.core.Integer };

    @Prop({
      group: '主要属性',
      title: 'Sm',
      description: '`≥768px` 响应式栅格数或者栅格属性对象',
      setter: { concept: 'InputSetter' },
    })
    sm: nasl.core.Decimal | { span: nasl.core.Integer, offset: nasl.core.Integer };

    @Prop({
      group: '主要属性',
      title: 'Md',
      description: '`≥992px` 响应式栅格数或者栅格属性对象',
      setter: { concept: 'InputSetter' },
    })
    md: nasl.core.Decimal | { span: nasl.core.Integer, offset: nasl.core.Integer };

    @Prop({
      group: '主要属性',
      title: 'Lg',
      description: '`≥1200px` 响应式栅格数或者栅格属性对象',
      setter: { concept: 'InputSetter' },
    })
    lg: nasl.core.Decimal | { span: nasl.core.Integer, offset: nasl.core.Integer };

    @Prop({
      group: '主要属性',
      title: 'Xl',
      description: '`≥1920px` 响应式栅格数或者栅格属性对象',
      setter: { concept: 'InputSetter' },
    })
    xl: nasl.core.Decimal | { span: nasl.core.Integer, offset: nasl.core.Integer };

    @Prop({
      group: '主要属性',
      title: '自定义元素标签',
      description: '自定义元素标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'div';

    @Slot({
      title: '自定义默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
