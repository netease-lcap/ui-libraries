/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: {
        slot: 'items',
        empty: true,
      },
      selector: [
        {
          expression: 'this',
          cssSelector: "div[class='el-dropdown']",
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'items')",
          cssSelector: '.el-dropdown-menu',
        },
      ],
      namedSlotOmitWrapper: ['items'],
      events: {
        click: true,
      },
      additionalAttribute: {
        "trigger": '"click"',
        ":hideOnClick": '"false"',
      },
    },
  })
  @Component({
    title: '下拉菜单',
    icon: 'dropdown-new',
    description: '将动作或菜单折叠到下拉菜单中。',
    group: 'Navigation',
  })
  export class ElDropdown extends ViewComponent {
    constructor(options?: Partial<ElDropdownOptions>) {
      super();
    }
  }

  export class ElDropdownOptions extends ViewComponentOptions {
    @Prop({
      group: '样式属性',
      title: '是否下拉触发元素呈现为按钮组',
      description: '下拉触发元素呈现为按钮组',
      setter: { concept: 'SwitchSetter' },
    })
    splitButton: nasl.core.Boolean = false;

    @Prop<ElDropdownOptions, 'type'>({
      group: '样式属性',
      title: '按钮类型',
      description: '设置按钮样式类型',
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
      if: (_) => _.splitButton,
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | '' =
      '';

    @Prop<ElDropdownOptions, 'size'>({
      group: '样式属性',
      title: '按钮尺寸',
      description: '按钮尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '中等' },
          { title: '小型' },
          { title: '迷你' },
          { title: '默认' },
        ],
      },
      if: (_) => _.splitButton,
    })
    size: 'medium' | 'small' | 'mini' | '' = '';

    @Prop({
      group: '主要属性',
      title: '菜单弹出位置',
      description: '菜单弹出位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '上方' },
          { title: '上方左侧' },
          { title: '上方右侧' },
          { title: '下方' },
          { title: '左侧上方' },
          { title: '左侧下方' },
        ],
      },
    })
    placement:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end' = 'bottom-end';

    @Prop({
      group: '交互属性',
      title: '触发下拉的行为',
      description: '触发下拉的行为',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '鼠标悬停' }, { title: '点击' }],
      },
    })
    trigger: 'hover' | 'click' = 'hover';

    @Prop({
      group: '状态属性',
      title: '是否在点击菜单项后隐藏菜单',
      description: '是否在点击菜单项后隐藏菜单',
      setter: { concept: 'SwitchSetter' },
    })
    hideOnClick: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '展开下拉菜单的延时',
      description: '展开下拉菜单的延时（仅在 trigger 为 hover 时有效）',
      setter: { concept: 'NumberInputSetter' },
    })
    showTimeout: nasl.core.Decimal = 250;

    @Prop({
      group: '主要属性',
      title: '收起下拉菜单的延时',
      description: '收起下拉菜单的延时（仅在 trigger 为 hover 时有效）',
      setter: { concept: 'NumberInputSetter' },
    })
    hideTimeout: nasl.core.Decimal = 150;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tabindex',
    //   description:
    //     'Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
    //   setter: { concept: 'NumberInputSetter' },
    // })
    // tabindex: nasl.core.Decimal = 0;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '点击左侧按钮时',
      description: '点击左侧按钮时',
    })
    onClick: (event: {}) => any;

    @Event({
      title: '点击菜单项时',
      description: '点击菜单项触发的事件回调',
    })
    onCommand: (event: nasl.core.String | nasl.core.Integer) => any;

    @Event({
      title: '下拉框出现/隐藏时',
      description: '下拉框出现/隐藏时触发',
    })
    onVisibleChange: (event: nasl.core.Boolean) => any;

    @Slot({
      title: '触发下拉列表显示的元素',
      description: '触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '下拉列表',
      description: '下拉列表',
      snippets: [
        {
          title: '下拉菜单项',
          code: '<el-dropdown-item><template><el-text text="菜单项"></el-text></template></el-dropdown-item>',
        },
      ],
    })
    slotItems: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('el-dropdown')",
      selector: [{
        expression: 'this',
        cssSelector: ".el-dropdown-menu__item",
      }],
    },
  })
  @Component({
    title: '下拉菜单项',
    description: '下拉菜单项',
  })
  export class ElDropdownItem extends ViewComponent {
    constructor(options?: Partial<ElDropdownItemOptions>) {
      super();
    }
  }

  export class ElDropdownItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '指令',
      description: '指令',
      setter: { concept: 'InputSetter' },
    })
    command: nasl.core.String | nasl.core.Decimal | object;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '显示分割线',
      description: '显示分割线',
      setter: { concept: 'SwitchSetter' },
    })
    divided: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标',
      setter: { concept: 'IconSetter' },
    })
    icon: nasl.core.String;

    @Slot({
      title: '菜单项内容',
      description: '菜单项内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
