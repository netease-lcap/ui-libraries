/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '面包屑',
    icon: 'breadcrumb',
    description: '显示当前页面的路径，快速返回之前的任意页面。',
    group: 'Navigation',
  })
  export class ElBreadcrumb extends ViewComponent {
    constructor(options?: Partial<ElBreadcrumbOptions>) {
      super();
    }
  }

  export class ElBreadcrumbOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Separator',
      description: '分隔符',
      setter: { concept: 'InputSetter' },
    })
    separator: nasl.core.String = "/";

    @Prop({
      group: '主要属性',
      title: 'Separator Class',
      description: '图标分隔符 class',
      setter: { concept: 'InputSetter' },
    })
    separatorClass: nasl.core.String = '';

    @Slot({
      title: 'Default',
      description: '内容',
      snippets: [
        {
          title: 'Breadcrumb Item',
          code: '<el-breadcrumb-item></el-breadcrumb-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: 'Breadcrumb Item',
    icon: 'breadcrumb-item',
    description: '',
    group: 'Navigation',
  })
  export class ElBreadcrumbItem extends ViewComponent {
    constructor(options?: Partial<ElBreadcrumbItemOptions>) {
      super();
    }
  }

  export class ElBreadcrumbItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'To',
      description: '路由跳转对象，同 `vue-router` 的 `to`',
      setter: { concept: 'InputSetter' },
    })
    to: nasl.core.String | object;

    @Prop({
      group: '主要属性',
      title: 'Replace',
      description:
        '在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录',
      setter: { concept: 'SwitchSetter' },
    })
    replace: nasl.core.Boolean = false;
  }
}
