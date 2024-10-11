/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
      title: '气泡弹出框',
      icon: 'popup',
      description: '点击，弹出气泡式的卡片浮层。',
      group: "Feedback"
    })
    export class VanPopoverOrigin extends ViewComponent {
        @Method({
          title: 'undefined',
          description: '弹出实例。'
        })
        open(): any {}

        @Method({
          title: 'undefined',
          description: '关闭实例。'
        })
        close(): any {}

        constructor(options?: Partial<VanPopoverOriginOptions>) { super(); }
    }

    export class VanPopoverOriginOptions extends ViewComponentOptions {
        @Prop({
            title: '弹出状态',
            description: '是否展示气泡弹出层',
            sync: true,
            setter: {
              concept: "SwitchSetter"
            }
        })
        value: nasl.core.Boolean = false;

        @Prop({
            title: '是否显示遮罩层',
            description: '是否显示遮罩层',
            setter: {
              concept: "SwitchSetter"
            }
        })
        overlay: nasl.core.Boolean = false;

        @Prop({
            title: '弹出位置',
            description: '弹出位置',
            setter: {
                concept: 'EnumSelectSetter',
                options: [
                  {
                    title: '上',
                  },
                  {
                    title: '下',
                  },
                  {
                    title: '左',
                  },
                  {
                    title: '右',
                  },
                  {
                    title: '上左',
                  },
                  {
                    title: '上右',
                  },
                  {
                    title: '下左',
                  },
                  {
                    title: '下右',
                  },
                  {
                    title: '左上',
                  },
                  {
                    title: '左下',
                  },
                  {
                    title: '右上',
                  },
                  {
                    title: '右下',
                  },
                ]
            },
        })
        placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' = 'bottom-start';

        @Event({
            title: '展开',
            description: '展开',
        })
        onOpen: (event: any) => any ;

        @Event({
            title: '收起',
            description: '收起',
        })
        onClose: (event: any) => any ;

        @Slot({
          title: '默认插槽',
          description: '自定义弹出的内容。'
        })
        slotDefault: () => Array<ViewComponent>;

        @Slot({
          title: '引用插槽',
          description: '气泡弹出框触发节点。'
        })
        slotReference: () => Array<ViewComponent>;
    }
  }
