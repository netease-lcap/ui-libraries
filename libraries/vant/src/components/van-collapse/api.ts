/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 3,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-collapse-item'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: " > [class^='el-collapse-item']",
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
        displayData: "\"[{name:'opened'},{name:'1'}, {name:'2'}]\"",
        propertyName: ':dataSource',
      },
      additionalAttribute: {
        modelValue: 'opened',
        nameField: 'name',
      },
      displaySlotConditions: {
        title: "!!this.getAttribute('dataSource')",
        icon: "!!this.getAttribute('dataSource')",
        content: "!!this.getAttribute('dataSource')",
      },
    },
  })
  @Component({
    title: '折叠面板',
    icon: 'collapse',
    description: '通过折叠面板收纳内容区域',
    group: 'Container',
  })
  export class VanCollapse extends ViewComponent {
    constructor(options?: Partial<VanCollapseOptions>) {
      super();
    }
  }

  export class VanCollapseOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '绑定值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.Date | nasl.core.String;

  }
}
