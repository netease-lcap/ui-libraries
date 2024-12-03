/// <reference types="@nasl/types" />
namespace extensions.{{pkgName}}.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

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
    
  }
}