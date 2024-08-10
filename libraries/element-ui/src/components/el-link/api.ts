/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '文字链接',
    icon: 'link',
    description: '文字超链接',
    group: 'Display',
  })
  export class ElLink extends ViewComponent {
    constructor(options?: Partial<ElLinkOptions>) {
      super();
    }
  }

  export class ElLinkOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Type',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'primary' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'danger' },
          { title: 'info' },
          { title: '默认' },
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';

    @Prop({
      group: '主要属性',
      title: '是否下划线',
      description: '是否下划线',
      setter: { concept: 'SwitchSetter' },
    })
    underline: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否禁用状态',
      description: '是否禁用状态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标类名',
      description: '图标类名',
      setter: { concept: 'InputSetter' },
    })
    icon: nasl.core.String = '';
  }
}
