/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: "container",
      childAccept: "['el-header', 'el-aside', 'el-footer', 'el-main', 'el-container'].includes(target.tag)",
      slotInlineStyle: {
        default: "height:100%"
      }
    }
  })
  @Component({
    title: '布局容器',
    icon: 'multi-layout',
    description: '用于布局的容器组件，方便快速搭建页面的基本结构：',
    group: 'Layout',
  })
  export class ElContainer extends ViewComponent {
    constructor(options?: Partial<ElContainerOptions>) {
      super();
    }
  }

  export class ElContainerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '元素排列方向',
      description: '子元素的排列方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '横向' }, { title: '纵向' }],
      },
    })
    direction: 'horizontal' | 'vertical';

    @Slot({
      title: 'Default',
      description: '内容',
      // snippets: [
      //   { title: '布局容器', code: '<el-container></el-container>' },
      //   { title: '顶栏', code: '<el-header style="padding-left: 0;padding-right: 0"></el-header>' },
      //   { title: '侧边栏', code: '<el-aside></el-aside>' },
      //   { title: '主区域', code: '<el-main></el-main>' },
      //   { title: '底栏', code: '<el-footer style="padding-left: 0;padding-right: 0"></el-footer>' },
      // ],
      // emptyBackground: 'add-sub',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '顶栏',
    icon: 'header',
    description: '',
    group: 'Layout',
  })
  export class ElHeader extends ViewComponent {
    constructor(options?: Partial<ElHeaderOptions>) {
      super();
    }
  }

  export class ElHeaderOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '侧边栏',
    icon: 'aside',
    description: '侧边栏',
    group: 'Layout',
  })
  export class ElAside extends ViewComponent {
    constructor(options?: Partial<ElAsideOptions>) {
      super();
    }
  }

  export class ElAsideOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '主区域',
    icon: 'main',
    description: '主区域，内容主要显示位置',
    group: 'Layout',
  })
  export class ElMain extends ViewComponent {
    constructor(options?: Partial<ElMainOptions>) {
      super();
    }
  }

  export class ElMainOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '底栏',
    icon: 'footer',
    description: '底部区域',
    group: 'Layout',
  })
  export class ElFooter extends ViewComponent {
    constructor(options?: Partial<ElFooterOptions>) {
      super();
    }
  }

  export class ElFooterOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
