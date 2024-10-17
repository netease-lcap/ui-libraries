/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-breadcrumb-item'",
      forceUpdateWhenAttributeChange: true,
      additionalAttribute: {
        ':showInDesiner': true,
      },
      "displaySlotInline": {
        default: true,
      },
    },
  })
  @Component({
    title: '面包屑',
    icon: 'crumb',
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
      title: '分隔符',
      description: '分隔符',
      setter: { concept: 'InputSetter' },
    })
    separator: nasl.core.String = '/';

    @Prop({
      group: '主要属性',
      title: '自动生成',
      description: '是否自动根据子页面配置的面包屑属性自动生成',
      docDescription: '支持控制面包屑生成方式。',
      setter: {
        concept: 'SwitchSetter',
      },
      bindHide: true,
    })
    auto: nasl.core.Boolean = false;

    @Slot({
      title: '内容',
      description: '内容',
      emptyBackground: 'add-sub',
      snippets: [
        {
          title: '面包屑项',
          code: '<el-breadcrumb-item><template #default><el-text text="面包屑"></el-text></template></el-breadcrumb-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      "displaySlotInline": {
        default: true,
      },
    },
  })
  @Component({
    title: '面包屑项',
    description: '面包屑项',
  })
  export class ElBreadcrumbItem extends ViewComponent {
    constructor(options?: Partial<ElBreadcrumbItemOptions>) {
      super();
    }
  }

  export class ElBreadcrumbItemOptions extends ViewComponentOptions {
    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '替换路由',
      description:
        '在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录',
      setter: { concept: 'SwitchSetter' },
    })
    replace: nasl.core.Boolean = false;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
