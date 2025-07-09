/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      idetype: 'element',
      editable: 'text',
      textholder: 'text',
      useFxOrEg: { property: 'text' },
      forceUpdateWhenAttributeChange: true,
    },
  })
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于标记和选择。',
    group: 'Display',
  })
  export class VanTag extends ViewComponent {
    constructor(options?: Partial<VanTagOptions>) {
      super();
    }
  }

  export class VanTagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '标签内容',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '类型',
      description: '标签类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '主要' },
          { title: '成功' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: '' | 'primary' | 'success' | 'warning' | 'danger' = '';

    @Prop({
      group: '主要属性',
      title: '颜色',
      description: '自定义标签颜色',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '标签尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '小' },
          { title: '正常' },
          { title: '大' },
        ],
      },
    })
    size: 'small' | 'default' | 'large' = 'default';

    @Prop({
      group: '主要属性',
      title: '主题',
      description: '标签主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '深色' },
          { title: '浅色' },
          { title: '朴素' },
        ],
      },
    })
    effect: 'dark' | 'light' | 'plain' = 'light';

    @Prop({
      group: '交互属性',
      title: '可关闭',
      description: '是否可关闭',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '禁用渐变动画',
      description: '是否禁用渐变动画',
      setter: { concept: 'SwitchSetter' },
    })
    disableTransitions: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '描边',
      description: '是否有边框描边',
      setter: { concept: 'SwitchSetter' },
    })
    hit: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '圆角',
      description: '是否为圆角标签',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '标签左侧图标',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    icon: nasl.core.String;

    @Event({
      title: '点击',
      description: '点击标签时触发',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '关闭',
      description: '关闭标签时触发',
    })
    onClose: (event: MouseEvent) => void;
  }
}
