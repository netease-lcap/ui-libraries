/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
  })
  @Component({
    title: '走马灯',
    icon: 'carousel',
    description: '在有限空间内，循环播放同一类型的图片、文字等内容',
    group: 'Display',
  })
  export class ElCarousel extends ViewComponent {
    constructor(options?: Partial<ElCarouselOptions>) {
      super();
    }

    @Method({
      title: '手动切换幻灯片',
      description: '手动切换幻灯片',
    })
    // setActiveItem(): any {}
    setActiveItem(
      @Param({
          title: '需要切换的幻灯片的索引或相应 el-carousel-item 的 name',
          description: '需要切换的幻灯片的索引，从 0 开始；或相应 el-carousel-item 的 name 属性值',
      })
      values: nasl.core.String,
  ): void {}

    @Method({
      title: '切换至上一张幻灯片',
      description: '切换至上一张幻灯片',
    })
    prev(): any {}

    @Method({
      title: '切换至下一张幻灯片',
      description: '切换至下一张幻灯片',
    })
    next(): any {}
  }

  export class ElCarouselOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '走马灯的高度',
      description: '走马灯的高度',
      setter: { concept: 'InputSetter' },
    })
    height: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '初始状态激活的幻灯片的索引',
      description: '初始状态激活的幻灯片的索引，从 0 开始',
      setter: { concept: 'NumberInputSetter' },
    })
    initialIndex: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '指示器的触发方式',
      description: '指示器的触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '点击' }],
      },
    })
    trigger: " " | "click" =" ";

    @Prop({
      group: '主要属性',
      title: '是否自动切换',
      description: '是否自动切换',
      setter: { concept: 'SwitchSetter' },
    })
    autoplay: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '切换的时间间隔',
      description: '自动切换的时间间隔，单位为毫秒',
      setter: { concept: 'NumberInputSetter' },
    })
    interval: nasl.core.Decimal = 3000;

    @Prop({
      group: '主要属性',
      title: '指示器的位置',
      description: '指示器的位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '在容器外部' }, { title: '不展示' }],
      },
    })
    indicatorPosition: 'outside' | 'none';

    @Prop({
      group: '主要属性',
      title: '切换箭头的显示时机',
      description: '切换箭头的显示时机',
      setter: {
        concept: 'EnumSelectSetter',
        options:  [{ title: '总是' }, { title: '鼠标悬停时' }, { title: '不显示' }],
      },
    })
    arrow: 'always' | 'hover' | 'never' = 'hover';

    @Prop({
      group: '主要属性',
      title: '走马灯的类型',
      description: '走马灯的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '卡片' }],
      },
    })
    type: " " | "card" = " ";

    @Prop({
      group: '主要属性',
      title: '是否循环显示',
      description: '是否循环显示',
      setter: { concept: 'SwitchSetter' },
    })
    loop: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '走马灯展示的方向',
      description: '走马灯展示的方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '水平' }, { title: '垂直' }],
      },
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Event({
      title: 'onChange',
      description: '幻灯片切换时触发',
    })
    onChange: (event: {
      index: nasl.core.String;
      oldIndex: nasl.core.String;
    }) => void;

    @Slot({
      title: 'Default',
      description: '插入`<el-carousel-item>`子组件',
      snippets: [
        {
          title: 'CarouselItem',
          code: '<el-carousel-item></el-carousel-item>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @Component({
    title: '走马灯条目组件',
    icon: 'carousel-item',
    description: '走马灯条目组件',
    group: 'Display',
  })
  export class ElCarouselItem extends ViewComponent {
    constructor(options?: Partial<ElCarouselItemOptions>) {
      super();
    }
  }

  export class ElCarouselItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '幻灯片的名字',
      description: '幻灯片的名字，可用作 `setActiveItem` 的参数',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '该幻灯片所对应指示器的文本',
      description: '该幻灯片所对应指示器的文本',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;
  }
}
