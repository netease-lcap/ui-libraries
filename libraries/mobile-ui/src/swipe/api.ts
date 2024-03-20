/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '幻灯片',
    icon: 'swipe',
    description: '用于循环播放一组图片或内容',
    group: "Display"
  })
  export class VanSwipe<T> extends ViewComponent {
    constructor(options?: Partial<VanSwipeOptions<T>>) {
      super();
    }
  }
  export class VanSwipeOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}]
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;

    @Prop({
      title: '循环播放',
      description: '是否循环播放',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private loop: nasl.core.Boolean = true;
    @Prop({
      title: '指示器',
      description: '是否显示指示器',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private showIndicators: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '动画时间',
      description: '单位：毫秒，幻灯片切换时间，如果设置值小于动画时长，会在动画完成后切换。',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    duration: nasl.core.Decimal = 4000;
    @Prop({
      group: '交互属性',
      title: '手势滑动',
      description: '是否支持手势滑动',
      setter: {
        concept: "SwitchSetter"
      }
    })
    touchable: nasl.core.Boolean = true;
    @Slot({
      title: 'undefined',
      description: '插入`van-swipe-item`子组件。',
      // emptyBackground: 'add-sub-large',
      snippets: [{
        title: '幻灯片子项',
        code: '<van-swipe-item vusion-slot-name="default"><van-image style="width:100%;height:100%" src="https://static-vusion.163yun.com/assets/cloud-ui/1.jpg"></van-image></van-swipe-item>'
      }]
    })
    slotDefault: () => Array<VanSwipeItem>;
    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  @Component({
    title: '幻灯片选项',
    description: '幻灯片选项',
    group: "Display"
  })
  export class VanSwipeItem extends ViewComponent {
    constructor(options?: Partial<VanSwipeItemOptions>) {
      super();
    }
  }
  export class VanSwipeItemOptions extends ViewComponentOptions {
    @Event({
      title: '点击后',
      description: '点击某一项后触发'
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
  }) => any ;
    @Slot({
      title: 'undefined',
      description: '插入幻灯片内容，如图片'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
