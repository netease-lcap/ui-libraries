/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "childAccept": "['el-dropdown-menu', 'el-dropdown-item'].includes(target.tag)",
      "selector": {
        "expression": "this.getElement(el => el.slotTarget === 'dropdown')",
        "cssSelector": "div[class='el-dropdown']"
      },
      "events": {
        "click": true
      }
    }
  })
  @Component({
    title: '下拉菜单',
    icon: 'dropdown',
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
      group: '主要属性',
      title: '菜单按钮类型',
      description:
        '菜单按钮类型，同 Button 组件(只在`split-button`为 true 的情况下有效)',
      setter: { concept: 'InputSetter' },
    })
    type: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '菜单尺寸',
      description: '菜单尺寸，在`split-button`为 true 的情况下也对触发按钮生效',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '中等' }, { title: '小型' }, { title: '迷你' }],
      },
    })
    size: 'medium' | 'small' | 'mini';

    @Prop({
      group: '状态属性',
      title: '是否下拉触发元素呈现为按钮组',
      description: '下拉触发元素呈现为按钮组',
      setter: { concept: 'SwitchSetter' },
    })
    splitButton: nasl.core.Boolean = false;

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
      setter: { concept: 'InputSetter' },
    })
    trigger: nasl.core.String = 'hover';

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

    @Prop({
      group: '数据属性',
      title: 'Tabindex',
      description:
        'Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)',
      setter: { concept: 'NumberInputSetter' },
    })
    tabindex: nasl.core.Decimal = 0;

    @Prop({
      group: '状态属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '点击左侧按钮时',
      description: '`split-button` 为 true 时，点击左侧按钮的回调',
    })
    onClick: (event: any) => any;

    @Event({
      title: '点击菜单项时',
      description: '点击菜单项触发的事件回调',
    })
    onCommand: (event: any) => any;

    @Event({
      title: '下拉框出现/隐藏时',
      description: '下拉框出现/隐藏时触发',
    })
    onVisibleChange: (event: any) => any;

    @Slot({
      title: '触发下拉列表显示的元素',
      description: '触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件',
      snippets: [
        {
          title: 'Dropdown Menu',
          code: '<el-dropdown-menu></el-dropdown-menu>',
        },
        {
          title: 'Dropdown Item',
          code: '<el-dropdown-item></el-dropdown-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '下拉列表',
      description: '下拉列表，通常是 `<el-dropdown-menu>` 组件',
    })
    slotDropdown: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-dropdown'"
    }
  })
  @Component({
    title: 'Dropdown Menu',
    icon: 'dropdown-menu',
    description: '',
    group: 'Navigation',
  })
  export class ElDropdownMenu extends ViewComponent {
    constructor(options?: Partial<ElDropdownMenuOptions>) {
      super();
    }
  }

  export class ElDropdownMenuOptions extends ViewComponentOptions { }

  @IDEExtraInfo({
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-dropdown'",
      "selector": {
        "expression": "this",
        "cssSelector": "div[class='el-dropdown-menu__item']"
      },
    }
  })
  @Component({
    title: 'Dropdown Item',
    icon: 'dropdown-item',
    description: '',
    group: 'Navigation',
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
      group: '状态属性',
      title: '显示分割线',
      description: '显示分割线',
      setter: { concept: 'SwitchSetter' },
    })
    divided: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '图标类名',
      description: '图标类名',
      setter: { concept: 'InputSetter' },
    })
    icon: nasl.core.String;
  }
}
