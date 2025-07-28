/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '动作栏',
    icon: 'action-bar',
    description: '用于为页面相关操作提供便捷交互。',
    group: 'Navigation',
  })
  export class VanActionBar<T> extends ViewComponent {
    constructor(options?: Partial<VanActionBarOptions<T>>) {
      super();
    }
  }

  export class VanActionBarOptions<T> extends ViewComponentOptions {
    @Prop({
      group: "主要属性",
      title: '底部安全区',
      description: '是否开启底部安全区适配',
      setter: { concept: 'SwitchSetter' },
    })
    safeAreaInsetBottom: nasl.core.Boolean = true;

    @Prop({
      group: "主要属性",
      title: '占位元素',
      description: '是否在标签位置生成一个等高的占位元素',
      setter: { concept: 'SwitchSetter' },
    })
    placeholder: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '',
    })
    slotDefault: () => ViewComponent[];
  }

  export class VanActionBarButton<T> extends ViewComponent {
    constructor(options?: Partial<VanActionBarButtonOptions<T>>) {
      super();
    }
  }

  export class VanActionBarButtonOptions<T> extends ViewComponentOptions {
    @Prop({
      group: "主要属性",
      title: '按钮文字',
      description: '按钮文字',
    })
    text: nasl.core.String;

    @Prop({
      group: "主要属性",
      title: '按钮类型',
      description: '按钮类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '主要' }, { title: '成功' }, { title: '警告' }, { title: '危险' }],
      },
    })
    type: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';

    @Prop({
      group: "主要属性",
      title: '按钮颜色',
      description: '按钮颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '左侧图标名称或图片链接',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_VANT_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '禁用状态',
      description: '是否禁用按钮',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '加载状态',
      description: '是否显示为加载状态',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;
  }

  export class VanActionBarIcon<T> extends ViewComponent {
    constructor(options?: Partial<VanActionBarIconOptions<T>>) {
      super();
    }
  }

  export class VanActionBarIconOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标文字',
      description: '图标文字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '图标名称或图片链接',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_VANT_ICONS' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标颜色',
      description: '图标颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#323233';

    @Prop({
      group: '主要属性',
      title: '图标小红点',
      description: '是否显示图标右上角小红点', // 优先级高于徽标内容
      setter: { concept: 'SwitchSetter' },
    })
    dot: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图标徽标内容',
      description: '图标右上角徽标的内容',
      setter: { concept: 'InputSetter' },
    })
    badge: nasl.core.String;
  }
}
