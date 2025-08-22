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
  export class ElButton extends ViewComponent {
    constructor(options?: Partial<ElButtonOptions>) {
      super();
    }
  }

  export class ElButtonOptions extends ViewComponentOptions {
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
      group: '主要属性',
      title: '按钮文字',
      description: '按钮文字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '按钮';

    @Prop({
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
      group: '样式属性',
      title: '圆形按钮',
      description: '是否为圆形按钮',
      setter: { concept: 'SwitchSetter' },
    })
    circle: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '加载中',
    //   description: '是否为加载中状态',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // loading: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '加载图标',
    //   description: '自定义加载中图标组件',
    //   setter: { concept: 'IconSetter' },
    // })
    // loadingIcon: nasl.core.String;

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
      title: '右图标',
      description: '右图标组件',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    rightIcon: nasl.core.String;

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
      group: '主要属性',
      title: '是否开启二次确认',
      description: '是否开启二次确认',
      setter: { concept: 'SwitchSetter' },
    })
    isPopConfirm: nasl.core.Boolean;

    @Prop<ElButtonOptions, 'title'>({
      group: '主要属性',
      title: '二次确认标题',
      description: '二次确认标题',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.isPopConfirm,
    })
    title: nasl.core.String = '确认操作？';

    @Prop<ElButtonOptions, 'confirmButtonText'>({
      group: '主要属性',
      title: '弹框确认按钮文字',
      description: '二次确认弹框确认按钮文字',
      setter: { concept: 'InputSetter' },
      if: (_) => !!_.isPopConfirm,
    })
    confirmButtonText: nasl.core.String = '确认';

    @Prop<ElButtonOptions, 'cancelButtonText'>({
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

    // @Prop({
    //   group: '主要属性',
    //   title: '自定义标签',
    //   description: '自定义元素标签',
    //   setter: { concept: 'InputSetter' },
    // })
    // tag: nasl.core.String = 'button';

    @Event({
      title: '点击时',
      description: '点击按钮时触发',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
