/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '折叠面板',
    icon: 'collapse',
    description: '将一组内容放置在多个折叠面板中，点击面板的标题可以展开或收缩其内容。',
    group: "Container"
  })
  export class VanCollapse extends ViewComponent {
    constructor(options?: Partial<VanCollapseOptions>) {
      super();
    }
  }
  export class VanCollapseOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识折叠面板的值',
      sync: true
    })
    value: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '手风琴模式',
      description: '是否开启手风琴模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    accordion: nasl.core.Boolean = false;
    @Event({
      title: '切换时',
      description: '切换时'
    })
    onChange: (event: nasl.core.String) => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-collapse-item>`子组件。',
      emptyBackground: 'add-sub-large',
      snippets: [{
        title: '菜单项',
        code: '<van-collapse-item><template #title>标签名称n</template></van-collapse-item>'
      }]
    })
    slotDefault: () => Array<VanCollapseItem>;
  }
  @Component({
    title: '面板项',
    group: "Container"
  })
  export class VanCollapseItem extends ViewComponent {
    @Method({
      title: '切换展开状态，传 true 为展开，false 为收起，不传参为切换',
      description: '切换展开状态，传 true 为展开，false 为收起，不传参为切换'
    })
    toggle(
      @Param({
        title: '展开',
        description: '展开'
      })
      expanded?: nasl.core.Boolean
    ): any {}
    constructor(options?: Partial<VanCollapseItemOptions>) {
      super();
    }
  }
  export class VanCollapseItemOptions extends ViewComponentOptions {
    @Prop({
      title: '标题',
      description: '标题'
    })
    private title: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识面板项的值'
    })
    name: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '箭头图标',
      description: '是否显示箭头图标',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isLink: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '展开',
      description: '展开'
    })
    onOpen: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '收起',
      description: '收起'
    })
    onClose: (event: nasl.ui.BaseEvent) => void;

    @Slot({
      title: '',
      description: ''
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '',
      description: ''
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
