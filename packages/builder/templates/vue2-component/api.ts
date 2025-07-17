/// <reference types="@nasl/types" />
namespace extensions.{{pkgName}}.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: '{{type}}',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '{{title}}',
    description: '{{description}}',
  })
  export class {{compName}} extends ViewComponent {
    constructor(options?: Partial<{{compName}}Options>) {
      super();
    }
  }

  export class {{compName}}Options extends ViewComponentOptions {
    @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';

    @Prop({
      title: '类型',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '主要' }, { title: '次要' }, { title: '默认' }]
      }
    })
    type: 'primary' | 'secondary' | 'default' = 'default';
  }
}
