/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      selector: {
        expression: 'this',
        cssSelector: '.el-button',
      },
    },
  })
  @Component({
    title: '按钮',
    icon: 'button',
    description: '常用的操作按钮',
    group: 'Basic',
  })
  export class ElButton extends ViewComponent {
    constructor(options?: Partial<ElButtonOptions>) {
      super();
    }
  }

  export class ElButtonOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '按钮尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '大' },
          { title: '小' },
        ],
      },
    })
    size: '' | 'default' | 'large' | 'small';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '按钮类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '主要' },
          { title: '成功' },
          { title: '信息' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: '' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

    @Prop({
      group: '主要属性',
      title: '朴素按钮',
      description: '是否为朴素按钮',
      setter: { concept: 'SwitchSetter' },
    })
    plain: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文字按钮',
      description: '是否为文字按钮',
      setter: { concept: 'SwitchSetter' },
    })
    text: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: '文字按钮是否显示背景色',
      setter: { concept: 'SwitchSetter' },
    })
    bg: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '链接按钮',
      description: '是否为链接按钮',
      setter: { concept: 'SwitchSetter' },
    })
    link: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '圆角按钮',
      description: '是否为圆角按钮',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '圆形按钮',
      description: '是否为圆形按钮',
      setter: { concept: 'SwitchSetter' },
    })
    circle: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载中',
      description: '是否为加载中状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载图标',
      description: '自定义加载中图标组件',
      setter: { concept: 'IconSetter' },
    })
    loadingIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标组件',
      setter: { concept: 'IconSetter' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '原生 autofocus 属性',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '原生类型',
      description: '原生 type 属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '按钮' },
          { title: '提交' },
          { title: '重置' },
        ],
      },
    })
    nativeType: 'button' | 'submit' | 'reset' = 'button';

    @Prop({
      group: '主要属性',
      title: '自动插入空格',
      description: '自动在两个中文字符之间插入空格',
      setter: { concept: 'SwitchSetter' },
    })
    autoInsertSpace: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '自定义颜色',
      description: '自定义按钮颜色，会自动计算 hover 和 active 颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '暗黑模式',
      description: '暗黑模式，自动将颜色转换为暗黑模式颜色',
      setter: { concept: 'SwitchSetter' },
    })
    dark: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '自定义标签',
      description: '自定义元素标签',
      setter: { concept: 'InputSetter' },
    })
    tag: nasl.core.String = 'button';

    @Event({
      title: '点击时',
      description: '点击按钮时触发',
    })
    onClick: (event: any) => any;
  }
} 