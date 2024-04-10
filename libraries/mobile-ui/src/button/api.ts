/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '按钮',
    icon: 'button',
    description: '按钮用于触发一个操作，如提交表单。',
    group: 'Display',
  })
  export class VanButton extends ViewComponent {
    constructor(options?: Partial<VanButtonOptions>) {
      super();
    }
  }
  export class VanButtonOptions extends ViewComponentOptions {
    @Prop({
      title: '路由链接',
      description: '需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。',
    })
    private to: nasl.core.String;
    @Prop({
      group: '状态属性',
      title: '替换',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    replace: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '默认文本显示内容',
    })
    text: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '样式类型',
      description: '设置按钮主题颜色与样式类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '主要按钮',
          },
          {
            title: '次要按钮',
          },
          {
            title: '普通按钮',
          },
          {
            title: '警告操作按钮',
          },
          {
            title: '次要警告操作按钮',
          },
          {
            title: '危险操作按钮',
          },
          {
            title: '次要危险操作按钮',
          },
        ],
      },
    })
    type: 'info' | 'info_secondary' | 'default' | 'warning' | 'warning_secondary' | 'danger' | 'danger_secondary' = 'info';
    @Prop({
      group: '主要属性',
      title: '展示方式',
      description: '选择行内或块级展示',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '行内展示',
          },
          {
            title: '块级展示',
          },
        ],
      },
    })
    block: 'spanb' | 'blockb' = 'spanb';
    // @Prop({
    //   group: '主要属性',
    //   title: '图标',
    //   setter: {
    //     concept: "IconSetter"
    //   }
    // })
    // icon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '图标位置',
      description: '设置图标居左或居右显示',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '左',
          },
          {
            title: '右',
          },
        ],
      },
    })
    iconPosition: 'left' | 'right' = 'left';
    @Prop({
      group: '交互属性',
      title: '链接类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '页面跳转',
          },
          {
            title: '下载链接',
          },
        ],
      },
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址',
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '打开方式',
      description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '新窗口',
          },
          {
            title: '当前窗口',
          },
          {
            title: '父级窗口',
          },
          {
            title: '顶级窗口',
          },
        ],
      },
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '加载中',
      description: '是否显示为加载中',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    loading: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '加载中文案',
    })
    loadingText: nasl.core.String = '';
    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '设置按钮大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '大',
          },
          {
            title: '中型',
          },
          {
            title: '正常',
          },
          {
            title: '小',
          },
          {
            title: '迷你',
          },
        ],
      },
    })
    size: 'large' | 'middle' | 'normal' | 'small' | 'mini' = 'middle';
    @Prop({
      group: '样式属性',
      title: '形状',
      description: '设置按钮形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '方形',
          },
          {
            title: '圆形',
          },
        ],
      },
    })
    squareroud: 'square' | 'round' = 'round';
    @Prop({
      group: '样式属性',
      title: '显示为细边框',
      description: '是否显示为细边框',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hairline: nasl.core.Boolean = false;
    @Event({
      title: '点击后',
      description: '点击事件',
    })
    onClick: (event: any) => any;
  }
}
