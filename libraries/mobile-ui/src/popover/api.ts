/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '气泡弹出框',
        icon: 'popup',
        description: '将弹出式的气泡菜单.',
    })
    export class VanPopover extends ViewComponent {


        @Method({
            title: '展开',
            description: '展开',
        })
        openModal(): any {}

        @Method({
            title: '关闭',
            description: '关闭',
        })
        closeModal(): any {}
        constructor(options?: Partial<VanPopoverOptions>) { super(); }
    }

    export class VanPopoverOptions extends ViewComponentOptions {
        @Prop({
            title: '是否展示气泡弹出层',
            description: '是否展示气泡弹出层',
            sync: true,
        })
        value: nasl.core.Boolean = false;

        @Prop({
            title: '是否显示遮罩层',
            description: '是否显示遮罩层',
        })
        overlay: nasl.core.Boolean = false;

        @Prop({
            title: '是否在点击选项后关闭',
            description: '是否在点击选项后关闭',
        })
        closeOnClickAction: nasl.core.Boolean = false;

        @Prop({
            title: '风格',
            description: '风格',
            setter: {
                concept: 'EnumSelectSetter',
                options: [
                  {
                    title: '深色',
                  },
                  {
                    title: '浅色',
                  }
                ]
            },
        })
        theme: 'dark' | 'light' = 'light';

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
        placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' = 'top';

        @Event({
            title: '点击选项时触发',
            description: '点击选项时触发',
        })
        onSelect: (event: nasl.ui.BaseEvent) => void;

        @Event({
            title: '展开',
            description: '展开',
        })
        onOpen: (event: nasl.ui.BaseEvent) => void;

        @Event({
            title: '收起',
            description: '收起',
        })
        onClose: (event: nasl.ui.BaseEvent) => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-popover-item>`子组件。',
            emptyBackground: 'add-sub-large',
            snippets: [
                {
                    title: '菜单项',
                    code: '<van-popover-item text="标签名称n"></van-popover-item>',
                },
            ],
        })
        slotDefault: () => Array<VanPopoverItem>;
    }

    @Component({
        title: '面板项',
    })
    export class VanPopoverItem extends ViewComponent {

        constructor(options?: Partial<VanPopoverItemOptions>) { super(); }
    }

    export class VanPopoverItemOptions extends ViewComponentOptions {
        @Prop({
            title: '标题',
            description: '标题',
            implicitToString: true,
        })
        text: nasl.core.String = '标题';

        @Prop({
            title: '是否禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '点击选项时触发',
            description: '点击选项时触发',
        })
        onClick: (event: nasl.ui.BaseEvent) => any;
    }
}
