/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '文本',
    icon: 'text',
    description: '用于展示文字或表达式',
    group: "Display"
  })
  export class VanText extends ViewComponent {
    constructor(options?: Partial<VanTextOptions>) {
      super();
    }
  }
  export class VanTextOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '默认文本显示内容',
      implicitToString: true,
    })
    text: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '主题颜色',
      description: '设置文本主题颜色',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认'
        }, {
          title: '主要色'
        }, {
          title: '辅助色'
        }, {
          title: '成功色'
        }, {
          title: '警告色'
        }, {
          title: '错误色'
        }, {
          title: '禁用色'
        }]
      }
    })
    color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled' = 'default';
    @Prop({
      group: '主要属性',
      title: '展示方式',
      description: '选择行内或块级展示',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '行内'
        }, {
          title: '块级'
        }]
      }
    })
    display: 'inline' | 'block' = 'inline';
    @Prop({
      group: '主要属性',
      title: '隐藏处理',
      description: '设置文本过长时的处理方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '默认不处理'
        }, {
          title: '多余的文本省略'
        }, {
          title: '强制换行且英文自动添加换行符'
        }, {
          title: '始终不换行'
        }]
      }
    })
    overflow: 'normal' | 'ellipsis' | 'break' | 'nowrap' = 'normal';
    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '设置文本大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '小'
        }, {
          title: '正常'
        }, {
          title: '大'
        }, {
          title: '巨大'
        }]
      }
    })
    size: 'small' | 'normal' | 'large' | 'huge' = 'normal';
    @Event({
      title: '点击后',
      description: '点击此项时触发'
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
    }) => void;
  }
}
