/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: "board",
      automate: [
          {
            command: "WRAP_FREE",
            useblock: 0
          }
      ]
    }
  })
  @Component({
    title: '自由布局',
    icon: 'absolute-layout',
    description: '拖拽内部元素到任意位置',
    group: 'Layout',
  })
  export class ElAbsoluteLayout extends ViewComponent {
    constructor(options?: Partial<ElAbsoluteLayoutOptions>) {
      super();
    }
  }

  export class ElAbsoluteLayoutOptions extends ViewComponentOptions {
    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: MouseEvent) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: MouseEvent) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: MouseEvent) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: MouseEvent) => any;

    @Slot({
      title: 'default',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
