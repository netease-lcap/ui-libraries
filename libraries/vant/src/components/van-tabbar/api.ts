/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      childAccept: "['van-tabbar-item'].includes(target.tag)",
    },
  })
  @Component({
    title: '标签栏',
    icon: 'tabbar',
    description: '标签栏',
    group: 'Navigation',
  })
  export class VanTabbar extends ViewComponent {
    constructor(options?: Partial<VanTabbarOptions>) {
      super();
    }
  }

  export class VanTabbarOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '当前激活标签',
      setter: { concept: 'InputSetter' },
    })
    modelValue: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '固定底部',
      description: '是否固定在底部',
      setter: { concept: 'SwitchSetter' },
    })
    isFixed: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '占位元素',
      description: '	固定在底部时，是否在标签位置生成一个等高的占位元素',
      setter: { concept: 'SwitchSetter' },
      if: _ => _.isFixed,
    })
    placeholder: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '开启路由模式',
      description: '是否开启路由模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    route: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '边框',
      description: '是否显示边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '层级',
      description: '层级',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 1;

    @Event({
      title: '标签改变',
      description: '切换标签时触发'
    })
    onChange: (event: {
      index: nasl.core.Integer | nasl.core.String;
    }) => void;

    @Slot({
      title: '标签项',
      description: '插入`<van-tabbar-item>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '标签项',
        code: '<van-tabbar-item icon="默认" style="font-size:24px"><van-text text="标签"></van-text></van-tabbar-item>'
      }]
    })
    slotDefault: () => Array<VanTabbarItem>;
  }

  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('van-tabbar')",
    },
  })
  @Component({
    title: '标签项',
    description: '标签项',
  })
  export class VanTabbarItem extends ViewComponent {
    constructor(options?: Partial<VanTabbarItemOptions>) {
      super();
    }
  }

  export class VanTabbarItemOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '用于标识选项的值',
    })
    name: nasl.core.String | nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '小红点',
      description: '是否在标题右上角显示小红点',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    dot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '徽标',
      description: '图标右上角徽标的内容（dot 为 fasle 时生效）',
      setter: {
        concept: 'InputSetter',
      },
      if: (_) => _.dot === false,
    })
    badge: nasl.core.Integer | nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '替换路由',
      description:
        '在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录',
      setter: { concept: 'SwitchSetter' },
    })
    replace: nasl.core.Boolean = false;

    @Slot({
      title: '默认',
      description: '显示的内容'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
