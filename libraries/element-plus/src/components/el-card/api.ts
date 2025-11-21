/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '卡片',
    icon: 'card',
    description: '将信息聚合在卡片容器中展示',
    group: 'Container',
  })
  export class ElCard extends ViewComponent {
    constructor(options?: Partial<ElCardOptions>) {
      super();
    }
  }

  export class ElCardOptions extends ViewComponentOptions {
    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '阴影显示',
      description: '设置卡片阴影的显示时机',
      docDescription: '控制卡片阴影的显示时机。总是显示：始终显示阴影；悬浮显示：鼠标悬停时显示；从不显示：不显示阴影。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '总是显示' }, { title: '悬浮显示' }, { title: '从不显示' }],
      },
    })
    shadow: 'always' | 'hover' | 'never' = 'always';

    @Slot({
      title: '默认',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '自定义标题内容',
    })
    slotHeader: () => Array<ViewComponent>;

    @Slot({
      title: '页脚',
      description: '自定义页脚内容',
    })
    slotFooter: () => Array<ViewComponent>;
  }
}
