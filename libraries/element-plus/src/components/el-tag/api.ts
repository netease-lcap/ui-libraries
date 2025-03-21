/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 5,
    ideusage: {
      idetype: 'element',
      editable: "text",
      textholder: "text",
      useFxOrEg: { property: "text" }
    }
  })
  @Component({
    title: '标签',
    icon: 'label',
    description: '用于标记和选择。',
    group: 'Display',
  })
  export class ElTag extends ViewComponent {
    constructor(options?: Partial<ElTagOptions>) {
      super();
    }
  }

  export class ElTagOptions extends ViewComponentOptions {
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
      description: 'type属性，可选择标签的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要' },
          { title: '成功' },
          { title: '信息' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';

    @Prop({
      group: '主要属性',
      title: '背景色',
      description: 'color属性，可以设置标签背景色',
      setter: {
        concept: 'InputSetter'
      },
    })
    color: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: 'size属性，用于设置标签尺寸大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认标签' },
          { title: '大型标签' },
          { title: '中等标签' },
          { title: '小型标签' }
        ],
      },
    })
    size: '' | 'large' | 'default' | 'small' = '';

    @Prop({
      group: '主要属性',
      title: '主题',
      description: 'effect属性，用于设置标签主题',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '深色' },
          { title: '浅色' },
          { title: '普通' }
        ],
      },
    })
    effect: 'dark' | 'light' | 'plain' = 'light';

    @Prop({
      group: '交互属性',
      title: '是否添加移除图标',
      description: 'closable属性，是否添加移除图标',
      setter: { concept: 'SwitchSetter' },
    })
    closable: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '是否禁用渐变动画',
      description: 'disable-transitions属性，是否禁用渐变动画',
      setter: { concept: 'SwitchSetter' },
    })
    disableTransitions: nasl.core.Boolean = false;
    
    @Prop({
      group: '交互属性',
      title: '是否有边框描边',
      description: 'hit属性，是否有边框描边',
      setter: { concept: 'SwitchSetter' },
    })
    hit: nasl.core.Boolean = false;
    
    @Prop({
      group: '交互属性',
      title: '是否为圆形',
      description: 'round属性，是否为圆形',
      setter: { concept: 'SwitchSetter' },
    })
    round: nasl.core.Boolean = false;

    @Event({
      title: '点击',
      description: '点击 Tag 时触发的事件',
    })
    onClick: (event: MouseEvent) => void;

    @Event({
      title: '关闭',
      description: '关闭 Tag 时触发的事件',
    })
    onClose: (event: MouseEvent) => void;
  }
  
  @IDEExtraInfo({
    ideusage: {
      idetype: 'element',
      editable: "text",
      textholder: "text",
      useFxOrEg: { property: "text" }
    }
  })
  @Component({
    title: '可选中标签',
    description: '可选中标签',
  })
  export class ElCheckTag extends ViewComponent {
    constructor(options?: Partial<ElCheckTagOptions>) {
      super();
    }
  }
  
  export class ElCheckTagOptions extends ElTagOptions {
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '标签内容',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';
    
    @Prop({
      group: '数据属性',
      title: '是否选中',
      description: '是否选中。支持语法糖 `v-model`',
      setter: { concept: 'SwitchSetter' },
    })
    private checked: nasl.core.Boolean = false;
    
    @Prop({
      group: '状态属性',
      title: '禁用状态',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;
    
    @Prop({
      group: '主要属性',
      title: '类型',
      description: 'type属性，可选择标签的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '主要' },
          { title: '成功' },
          { title: '信息' },
          { title: '警告' },
          { title: '危险' },
        ],
      },
    })
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
    
    @Event({
      title: '点击',
      description: '点击 Check Tag 时触发的事件',
    })
    onChange: (event: MouseEvent) => void;
  }
  
  
  
}
