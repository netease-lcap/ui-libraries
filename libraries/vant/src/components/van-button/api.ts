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
    // TODO: 可选值应该是 large small mini
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
      // TODO: 多了 info；缺少默认 default；空串 '' 不在文档里
      group: '主要属性',
      title: '类型',
      description: '按钮类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '主要' }, { title: '成功' }, { title: '信息' }, { title: '警告' }, { title: '危险' }],
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
      // TODO: 文档中没有默认值“按钮”
      group: '主要属性',
      title: '按钮文字',
      description: '按钮文字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '按钮';

    @Prop({
      // HACK: 文档中没有提到 link
      group: '主要属性',
      title: '链接按钮',
      description: '是否为链接按钮',
      setter: { concept: 'SwitchSetter' },
    })
    link: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '圆角按钮',
      description: '是否为圆角按钮',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      // HACK: 文档中没有提到 circle
      group: '样式属性',
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
      //HACK : 文档中没有loadingIcon
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
      // TODO: 文档中只有单独一个icon，没有提到左图标和右图标
      group: '主要属性',
      title: '左图标',
      description: '左图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      // TODO: 文档中只有单独一个icon，没有提到左图标和右图标
      group: '主要属性',
      title: '右图标',
      description: '右图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    rightIcon: nasl.core.String;

    @Prop({
      //HACK : 文档中没有autofocus
      group: '主要属性',
      title: '自动聚焦',
      description: '原生 autofocus 属性',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    @Prop({
      // TODO: 文档中是 native-type，但是这里却是 nativeType
      group: '主要属性',
      title: '原生类型',
      description: '原生 type 属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '按钮' }, { title: '提交' }, { title: '重置' }],
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
      // HACK: 文档中没有提到 isPopConfirm
      group: '主要属性',
      title: '是否开启二次确认',
      description: '是否开启二次确认',
      setter: { concept: 'SwitchSetter' },
    })
    isPopConfirm: nasl.core.Boolean;

    @Prop<VanButtonOptions, 'title'>({
      // HACK: 文档中没有提到 title
      group: '主要属性',
      title: '二次确认标题',
      description: '二次确认标题',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.isPopConfirm,
    })
    title: nasl.core.String = '确认操作？';

    @Prop<VanButtonOptions, 'confirmButtonText'>({
      // HACK: 文档中没有提到 confirmButtonText
      group: '主要属性',
      title: '弹框确认按钮文字',
      description: '二次确认弹框确认按钮文字',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.isPopConfirm,
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop<VanButtonOptions, 'cancelButtonText'>({
      // HACK: 文档中没有提到 cancelButtonText
      group: '主要属性',
      title: '弹框取消按钮文字',
      description: '二次确认弹框取消按钮文字',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.isPopConfirm,
    })
    cancelButtonText: nasl.core.String = '取消';

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
      // TODO: 文档中是 loading-text，但是这里却是 loadingText
      group: '主要属性',
      title: '加载文字',
      description: '加载状态下的文字',
      setter: { concept: 'InputSetter' },
    })
    loadingText: nasl.core.String;

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

    @Prop({
      // TODO: 文档中是 loading-size，但是这里却是 loadingSize
      group: '主要属性',
      title: '加载大小',
      description: '加载图标大小',
      setter: { concept: 'InputSetter' },
    })
    loadingSize: nasl.core.String;

    // TODO: 缺失文档中的 icon-prefix

    // TODO: 缺失文档中的 icon-position

    // TODO: 缺失文档中的 tag

    // TODO: 缺失文档中的 square

    // TODO: 缺失文档中的 hairline

    // TODO: 缺失文档中的 to

    // TODO: 缺失文档中的 replace
    


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
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: MouseEvent) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: MouseEvent) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: MouseEvent) => any;
  }
}
