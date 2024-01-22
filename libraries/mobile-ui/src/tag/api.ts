/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于标记关键词和概括主要内容。',
    group: "Display"
  })
  export class VanTag extends ViewComponent {
    constructor(options?: Partial<VanTagOptions>) {
      super();
    }
  }
  export class VanTagOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '样式类型',
      description: '设置主题颜色与样式类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '成功'
        }, {
          title: '危险'
        }, {
          title: '警告'
        }]
      }
    })
    type: 'primary' | 'success' | 'danger' | 'warning' = 'primary';
    @Prop({
      group: '主要属性',
      title: '显示为标记样式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    mark: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '可关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeable: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '设置标签大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '大型'
        }, {
          title: '中型'
        }, {
          title: '小型'
        }]
      }
    })
    size: 'large' | 'medium' | 'small' = 'medium';
    @Prop({
      group: '样式属性',
      title: '显示为圆角',
      setter: {
        concept: "SwitchSetter"
      }
    })
    round: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '显示为空心',
      setter: {
        concept: "SwitchSetter"
      }
    })
    plain: nasl.core.Boolean = false;
    @Event({
      title: '点击时',
      description: '点击时触发'
    })
    onClick: (event:{
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
  }) => any ;
    @Event({
      title: '关闭前',
      description: '点击标签删除图标前触发，使用event.preventDefault可以阻止删除事件触发'
    })
    onBeforeClose: (event: any) => any ;
    @Event({
      title: '关闭时',
      description: '点击标签删除图标时触发'
    })
    onClose: (event: any) => any ;

    @Slot({
      title: 'undefined',
      description: '内容自定义'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
