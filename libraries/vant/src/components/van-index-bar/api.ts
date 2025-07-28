/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '索引栏',
    icon: 'index-bar',
    description: '用于列表的索引分类显示和快速定位。',
    group: 'Navigation',
  })
  export class VanIndexBar<T> extends ViewComponent {
    constructor(options?: Partial<VanIndexBarOptions<T>>) {
      super();
    }
  }

  export class VanIndexBarOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '索引列表',
      description: '索引字符列表，默认值为 A-Z',
      setter: { concept: 'InputSetter' },
    })
    indexList: nasl.collection.List<nasl.core.String | nasl.core.Decimal>;

    @Prop({
      group: '主要属性',
      title: '层级',
      description: 'z-index 层级',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '锚点自动吸顶',
      description: '是否开启锚点自动吸顶',
      setter: { concept: 'SwitchSetter' },
    })
    sticky: nasl.core.Boolean = true;

    @Prop<VanIndexBarOptions<T>, 'stickyOffsetTop'>({
      group: '主要属性',
      title: '锚点吸顶距离',
      description: '锚点自动吸顶时与顶部的距离',
      setter: { concept: 'NumberInputSetter' },
      if: _ => !!_.sticky
    })
    stickyOffsetTop: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '高亮颜色',
      description: '索引字符高亮颜色	',
      setter: { concept: 'InputSetter' },
    })
    highlightColor: nasl.core.String = '#1989fa';

    @Prop({
      group: '主要属性',
      title: '挂载节点',
      description: '指定索引栏挂载的节点，例如 `body`。',
      setter: { concept: 'InputSetter' },
    })
    teleport: nasl.core.String;

    @Slot({
      title: '默认插槽',
      description: '索引栏的内容',
    })
    slotDefault: () => ViewComponent[];
  }

  export class VanIndexAnchor<T> extends ViewComponent {
    constructor(options?: Partial<VanIndexAnchorOptions<T>>) {
      super();
    }
  }

  export class VanIndexAnchorOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '索引字符',
      description: '索引字符',
      setter: { concept: 'InputSetter' },
    })
    index: nasl.core.String | nasl.core.Decimal;

    @Slot({
      title: '默认插槽',
      description: '锚点的内容',
    })
    slotDefault: () => ViewComponent[];
  }
}
