/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '步骤条',
    icon: 'steps',
    description: '用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。',
    group: "Display"
  })
  export class VanSteps<T> extends ViewComponent {
    constructor(options?: Partial<VanStepsOptions<T>>) {
      super();
    }
  }
  export class VanStepsOptions<T> extends ViewComponentOptions {
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
      group: '数据属性',
      title: '当前步骤',
      description: '指定当前步骤，从0开始记数。',
      sync: true,
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    value: nasl.core.Integer = 0;
    @Prop({
      group: '主要属性',
      title: '步骤条方向',
      description: '设置步骤条方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '横向'
        }, {
          title: '垂直'
        }]
      }
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
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
      title: '切换步骤时',
      description: '切换步骤时'
    })
    onChangestep: (event: nasl.core.Integer) => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-step>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '步骤条项',
        code: '<van-step>stepn</van-step>'
      }]
    })
    slotDefault: () => Array<VanStep>;
    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
  @Component({
    title: '步骤条项',
    group: "Display"
  })
  export class VanStep extends ViewComponent {
    constructor(options?: Partial<VanStepOptions>) {
      super();
    }
  }
  export class VanStepOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '状态',
      description: '设置步骤条的状态，分别为等待中、进行中、已完成、错误。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '等待中'
        }, {
          title: '进行中'
        }, {
          title: '已完成'
        }, {
          title: '错误'
        }]
      }
    })
    status: 'wait' | 'process' | 'finish' | 'error';
    @Prop({
      group: '主要属性',
      title: '图标',
      description: '自定义步骤的图标',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
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
      title: '点击标题',
      description: '点击标题'
    })
    onClicktitle: (event: nasl.core.Integer) => void;
    @Event({
      title: '点击图标',
      description: '点击图标'
    })
    onClickicon: (event: nasl.core.Integer) => void;

    @Slot({
      title: '',
      description: ''
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
