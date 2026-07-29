/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '子页面容器',
    icon: 'router-view',
    description: '放置子页面的容器。',
    group: "Container"
  })
  export class VanRouterView extends ViewComponent {
    constructor(options?: Partial<VanRouterViewOptions>) {
      super();
    }
  }
  export class VanRouterViewOptions extends ViewComponentOptions {
        @Prop({
            title: '进入已打开页面时刷新',
            description: '重新进入已打开页面时，会刷新页面',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        disableKeepAlive: nasl.core.Boolean = true;

        @Prop<VanRouterViewOptions, 'keepAliveInclude'>({
            title: '缓存页面',
            description: '缓存页面，设置后只有匹配路径的页面会被缓存',
            setter: {
                concept: 'InputSetter',
            },
            if: (_) => !_.disableKeepAlive,
            bindOpen: true,
        })
        keepAliveInclude: nasl.collection.List<nasl.core.String>;

        @Prop<VanRouterViewOptions, 'keepAliveExclude'>({
            title: '不缓存页面',
            description: '不缓存页面，设置后只有匹配路径的页面不会被缓存',
            setter: {
                concept: 'InputSetter',
            },
            if: (_) => !_.disableKeepAlive,
            bindOpen: true,
        })
        keepAliveExclude: nasl.collection.List<nasl.core.String>;

        @Prop<VanRouterViewOptions, 'keepAliveMax'>({
            title: '缓存页面最大数量',
            description: '最多可以缓存多少组件实例(默认 不设上限)',
            setter: {
                concept: 'NumberInputSetter',
            },
            if: (_) => !_.disableKeepAlive,
        })
        keepAliveMax: nasl.core.Integer;
  }
}
