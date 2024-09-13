/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
      useFxOrEg: { property: 'text' },
      // style: {
      //   selector: '.el-link',
      //   declaration: 'transition-timing-function: linear !important',
      // },
    },
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
      title: '类型',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要' },
          { title: '成功' },
          { title: '警告' },
          { title: '危险' },
          { title: '信息' },
          { title: '默认' },
        ],
      },
    })
    type: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' =
      'default';

    @Prop({
      group: '主要属性',
      title: '文本',
      description: '显示文本内容',
      docDescription: '显示的文本内容',
    })
    text: nasl.core.String;

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
      title: '链接地址',
    })
    hrefAndTo: nasl.core.String;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: any) => any;

    // @Prop({
    //   group: '主要属性',
    //   title: '图标类名',
    //   description: '图标类名',
    //   setter: { concept: 'InputSetter' },
    // })
    // icon: nasl.core.String = '';
  }
}
