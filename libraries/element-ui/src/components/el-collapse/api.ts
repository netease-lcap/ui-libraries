/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'el-collapse-item'",
    }
  })
  @Component({
    title: '折叠面板',
    icon: 'collapse',
    description: '通过折叠面板收纳内容区域',
    group: 'Container',
  })
  export class ElCollapse extends ViewComponent {
    constructor(options?: Partial<ElCollapseOptions>) {
      super();
    }
  }

  export class ElCollapseOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      sync: true,
      title: '当前激活的面板',
      description:
        '当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`)',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String | nasl.collection.List<nasl.core.String>;

    @Prop({
      group: '主要属性',
      title: '是否手风琴模式',
      description: '是否手风琴模式',
      setter: { concept: 'SwitchSetter' },
    })
    accordion: nasl.core.Boolean = false;

    @Event({
      title: '当前激活面板改变时触发',
      description:
        '当前激活面板改变时触发(如果是手风琴模式，参数 `activeNames` 类型为`string`，否则为`array`)',
    })
    onChange: (event: any) => any;

    @Slot({
      title: '内容',
      description: '内容',
      snippets: [
        {
          title: 'Collapse Item',
          code: '<el-collapse-item></el-collapse-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }


  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-collapse'",
      "selector": {
        "expression": "this",
        "cssSelector": "div[class='el-collapse-item']"
      }
    }
  })

  @Component({
    title: 'Collapse Item',
    icon: 'collapse-item',
    description: '',
    group: 'Container',
  })
  export class ElCollapseItem extends ViewComponent {
    constructor(options?: Partial<ElCollapseItemOptions>) {
      super();
    }
  }

  export class ElCollapseItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '唯一标志符',
      description: '唯一标志符',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String | nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '面板标题',
      description: '面板标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: 'Collapse Item标题',
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
