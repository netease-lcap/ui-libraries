/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '图标',
    icon: 'icon',
    description: '图标',
    group: 'Display',
  })
  export class ElIcon extends ViewComponent {
    constructor(options?: Partial<ElIconOptions>) {
      super();
    }
  }

  export class ElIconOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '图标名称',
      description: '选择要显示的图标',
      docDescription: '设置要显示的图标。支持从图标库中选择预设图标或上传自定义图标。',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTPLUS_ICONS',
      },
    })
    name: nasl.core.String = 'search';

    @Prop({
      group: '主要属性',
      title: 'SVG 内容',
      description: '直接传入 SVG 字符串进行渲染',
      docDescription: '传入完整的 SVG 标签字符串（如 `<svg>...</svg>`），组件会将其作为 HTML 渲染。设置后优先于图标名称。',
      setter: { concept: 'InputSetter' },
    })
    svg: nasl.core.String;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
  }
}
