/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
    },
  })
  @Component({
    title: '链接',
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
      title: '类型',
      description: '链接类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '主要' },
          { title: '成功' },
          { title: '警告' },
          { title: '危险' },
          { title: '信息' },
        ],
      },
    })
    type: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' = 'default';

    @Prop({
      group: '主要属性',
      title: '下划线',
      description: '是否有下划线',
      setter: { concept: 'SwitchSetter' },
    })
    underline: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '禁用',
      description: '是否禁用状态',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '链接地址',
      description: '原生 href 属性',
      setter: { concept: 'InputSetter' },
    })
    href: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '打开方式',
      description: '原生 target 属性',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '当前窗口' },
          { title: '新窗口' },
          { title: '父窗口' },
          { title: '顶层窗口' },
        ],
      },
    })
    target: '_self' | '_blank' | '_parent' | '_top' = '_self';

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标组件',
      setter: { concept: 'IconSetter' },
    })
    icon: nasl.core.String;

    @Event({
      title: '点击时',
      description: '点击链接时触发',
    })
    onClick: (event: any) => any;
  }
} 