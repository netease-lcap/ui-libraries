/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    sourceDocURL: 'https://element.eleme.io/#/zh-CN/component/popconfirm',
    ideusage: {
      idetype: 'container',
      namedSlotOmitWrapper: ['reference'],
      displaySlotInline: {
        reference: true,
      },
      bindStyleAttr: 'dialogStyle',
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'reference')",
          cssSelector: '.el-popover__reference-wrapper',
          placement: 'tail',
        },
        {
          expression: 'this',
          cssSelector: '.el-popover',
          placement: 'tail',
        },
      ],
      eventsEffect: 'reference',
      forceRefresh: { slot: 'reference' },
      events: {
        click: true,
      },
    },
  })
  @Component({
    title: '气泡确认框',
    icon: 'popconfirm',
    description: '点击元素，弹出气泡确认框。',
    group: 'Feedback',
  })
  export class ElPopconfirm extends ViewComponent {
    constructor(options?: Partial<ElPopconfirmOptions>) {
      super();
    }
  }

  export class ElPopconfirmOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String = '这是一段内容确定删除吗？';

    @Prop({
      group: '主要属性',
      title: '确认按钮文字',
      description: '确认按钮文字',
      setter: { concept: 'InputSetter' },
    })
    confirmButtonText: nasl.core.String = '确定';

    @Prop({
      group: '主要属性',
      title: '取消按钮文字',
      description: '取消按钮文字',
      setter: { concept: 'InputSetter' },
    })
    cancelButtonText: nasl.core.String = '取消';

    @Prop({
      group: '主要属性',
      title: '确认按钮类型',
      description: '设置确认按钮类型',
      docDescription:
      '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮按钮。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要按钮' },
          { title: '成功按钮' },
          { title: '警告按钮' },
          { title: '危险按钮' },
          { title: '信息按钮' },
          { title: '文字按钮' },
          { title: '默认按钮' },
        ],
      },
    })
    confirmButtonType: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | '' = 'primary';

    @Prop({
      group: '主要属性',
      title: '取消按钮类型',
      description: '设置取消按钮类型',
      docDescription:
      '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮按钮。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要按钮' },
          { title: '成功按钮' },
          { title: '警告按钮' },
          { title: '危险按钮' },
          { title: '信息按钮' },
          { title: '文字按钮' },
          { title: '默认按钮' },
        ],
      },
    })
    cancelButtonType: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | '' = 'text';
    
    @Prop({
      title: '自定义图标',
      description: '自定义图标',
      group: '主要属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
        hideUploadIcon: true,
      },
    })
    icon: nasl.core.String = 'el-icon-question';

    @Prop({
      group: '主要属性',
      title: 'Icon 颜色',
      description: 'Icon 颜色',
      setter: { concept: 'InputSetter' },
    })
    iconColor: nasl.core.String = '#f90';

    @Prop({
      group: '主要属性',
      title: '是否隐藏 Icon',
      description: '是否隐藏 Icon',
      setter: { concept: 'SwitchSetter' },
    })
    hideIcon: nasl.core.Boolean = false;

    @Event({
      title: '点击确认',
      description: '点击确认按钮时触发',
    })
    onConfirm: (event: any) => void;

    @Event({
      title: '点击取消',
      description: '点击取消按钮时触发',
    })
    onCancel: (event: any) => void;

    @Slot({
      title: '触发 Popconfirm 显示的 HTML 元素',
      description: '触发 Popconfirm 显示的 HTML 元素',
    })
    slotReference: () => Array<ViewComponent>;
  }
}
