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
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<ElButtonOptions>) {
      super();
    }
  }

  export class ElButtonOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '按钮文字',
      description: '按钮上显示的文字内容',
      docDescription: '设置按钮上显示的文字内容。这是按钮的主要标识，用于向用户说明按钮的功能。',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '按钮';

    @Prop({
      group: '主要属性',
      title: '按钮类型',
      description: '选择按钮的视觉类型和主题色',
      docDescription:
        '控制按钮的视觉样式和主题色。默认：标准按钮；主要：强调按钮；成功：绿色主题；信息：蓝色主题；警告：橙色主题；危险：红色主题。',
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
      title: '朴素样式',
      description: '是否使用朴素按钮样式',
      docDescription:
        '开启后，按钮会使用朴素样式，背景透明，边框和文字使用主题色。适用于需要强调但不想过于突出的场景。',
      setter: { concept: 'SwitchSetter' },
    })
    plain: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '链接样式',
      description: '是否使用链接按钮样式',
      docDescription: '开启后，按钮会使用链接样式，看起来像文字链接但有按钮的交互效果。适用于次要操作或导航场景。',
      setter: { concept: 'SwitchSetter' },
    })
    link: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '左图标',
      description: '按钮左侧显示的图标',
      docDescription: '设置按钮左侧显示的图标，用于增强按钮的视觉识别和功能说明。支持从图标库中选择或使用自定义图标。',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右图标',
      description: '按钮右侧显示的图标',
      docDescription: '设置按钮右侧显示的图标，通常用于表示操作方向或结果。支持从图标库中选择或使用自定义图标。',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    rightIcon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '自动聚焦',
      description: '页面加载时是否自动获得焦点',
      docDescription: '开启后，当页面加载完成时，按钮会自动获得焦点。适用于重要的操作按钮，方便用户快速操作。',
      setter: { concept: 'SwitchSetter' },
    })
    autofocus: nasl.core.Boolean = false;

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '防抖时间',
      description: '设置点击防抖时间，防止重复触发',
      docDescription:
        '设置按钮点击的防抖时间，单位毫秒。在指定时间内多次点击只会触发一次事件，防止用户误操作或重复提交。设置为0或空值则不启用防抖。',
      setter: {
        concept: 'NumberInputSetter',
        min: 0,
      },
      bindHide: true,
    })
    throttleTime: nasl.core.Integer = 0;

    // ========== 涉及组件的可用、不可用、加载等状态 ==========
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用按钮',
      docDescription: '开启后，按钮将变为禁用状态，用户无法点击。禁用状态下按钮会显示为灰色，鼠标悬停时显示禁用光标。',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '按钮尺寸',
      description: '选择按钮的尺寸大小',
      docDescription: '控制按钮的整体尺寸。默认：标准尺寸；大：宽松型按钮；小：紧凑型按钮。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大' }, { title: '小' }],
      },
    })
    size: 'default' | 'large' | 'small' = 'default';

    @Prop({
      group: '样式属性',
      title: '圆角按钮',
      description: '是否使用圆角样式',
      docDescription: '开启后，按钮会使用圆角样式，提供更柔和的视觉效果。适用于现代风格的界面设计。',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '圆形按钮',
      description: '是否使用圆形样式',
      docDescription: '开启后，按钮会变为圆形，通常用于图标按钮。圆形按钮的宽度和高度相等，适合只显示图标的场景。',
      setter: { concept: 'SwitchSetter' },
    })
    circle: nasl.core.Boolean = false;

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

    @Event({
      title: '聚焦时',
      description: '聚焦时触发',
    })
    onFocus: (event: FocusEvent) => void;

    @Event({
      title: '失焦时',
      description: '失焦时触发',
    })
    onBlur: (event: FocusEvent) => void;
  }
}
