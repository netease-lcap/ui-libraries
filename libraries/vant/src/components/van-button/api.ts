/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
      forceUpdateWhenAttributeChange: true,
      events: {
        click: true,
      },
    },
  })
  @Component({
    title: '按钮',
    icon: 'button',
    description: '常用的操作按钮',
    group: 'Display',
  })
  export class VanButton extends ViewComponent {
    constructor(options?: Partial<VanButtonOptions>) {
      super();
    }
  }

  export class VanButtonOptions extends ViewComponentOptions {
    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '按钮尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small' = 'default';

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
    type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

    @Prop({
      group: '主要属性',
      title: '朴素按钮',
      description: '是否为朴素按钮',
      setter: { concept: 'SwitchSetter' },
    })
    plain: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '按钮文字',
      description: '按钮文字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '按钮';

    @Prop({
      group: '样式属性',
      title: '圆角按钮',
      description: '是否为圆角按钮',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载中',
      description: '是否为加载中状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '左图标',
      description: '左图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标位置',
      description: '图标位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '左' }, { title: '右' }],
      },
    })
    iconPosition: 'left' | 'right' = 'left';

    @Prop({
      group: '样式属性',
      title: '自定义颜色',
      description: '自定义按钮颜色，会自动计算 hover 和 active 颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '块级元素',
      description: '是否为块级元素',
      setter: { concept: 'SwitchSetter' },
    })
    block: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载文字',
      description: '加载状态下的文字',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '方形按钮',
      description: '是否为方形按钮',
      setter: { concept: 'SwitchSetter' },
    })
    square: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '细边框',
      description: '是否为细边框',
      setter: { concept: 'SwitchSetter' },
    })
    hairline: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载类型',
      description: '加载图标类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '旋转' }],
      },
    })
    loadingType: 'circular' | 'spinner' = 'circular';

    @Event({
      title: '点击时',
      description: '点击按钮时触发',
    })
    onClick: (event: any) => any;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: MouseEvent) => any;

    @Event({
      title: '触摸开始',
      description: '在元素上触摸开始时触发。',
    })
    onTouchstart: (event: TouchEvent) => any;
  }
}
