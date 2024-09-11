/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-step'",
      dataSource: {
        dismiss:
          "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 3,
        loopRule: 'nth-child(n+2)',
        loopElem: ".el-step",
        emptySlot: {
          display: 'large',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
        },
      },
    },
  })
  @Component({
    title: '步骤条',
    icon: 'steps',
    description: '引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。',
    group: 'Navigation',
  })
  export class ElSteps<T> extends ViewComponent {
    @Method({
      title: '上一步',
      description: '上一步',
    })
    prev(): void {}

    @Method({
      title: '下一步',
      description: '下一步',
    })
    next(): void {}

    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    constructor(options?: Partial<ElStepsOptions<T>>) {
      super();
    }
  }

  export class ElStepsOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description:
        '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription:
        '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource:
      | { list: nasl.collection.List<T>; total: nasl.core.Integer }
      | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription:
        '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '步骤别名字段',
      description: '集合的元素类型中，用于步骤别名字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    nameField: (item: T) => nasl.core.String = ((item: any) => item.name) as any;

    @Prop<ElStepsOptions<T>, 'direction'>({
      group: '主要属性',
      title: '显示方向',
      description: '显示方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
      if: (_) => !_.simple,
    })
    direction: 'vertical' | 'horizontal' = 'horizontal';

    @Prop({
      group: '数据属性',
      title: '当前步骤',
      description:
        '设置当前激活步骤, 可设置步骤排序下标，如：0 也可以设置步骤别名',
      setter: { concept: 'NumberInputSetter' },
      sync: true,
    })
    active: nasl.core.Integer | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '当前步骤的状态',
      description: '设置当前步骤的状态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '等待' },
          { title: '进行中' },
          { title: '完成' },
          { title: '错误' },
          { title: '成功' },
        ],
      },
    })
    processStatus: 'wait' | 'process' | 'finish' | 'error' | 'success';

    @Prop({
      group: '主要属性',
      title: '结束步骤的状态',
      description: '设置结束步骤的状态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '等待' },
          { title: '进行中' },
          { title: '完成' },
          { title: '错误' },
          { title: '成功' },
        ],
      },
    })
    finishStatus: 'wait' | 'process' | 'finish' | 'error' | 'success' =
      'finish';

    @Prop({
      group: '样式属性',
      title: '步骤项的间距',
      description: '每个步骤项的间距，不填写将自适应间距。支持百分比。',
      setter: { concept: 'InputSetter' },
    })
    space: nasl.core.Decimal | nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '居中对齐',
      description: '进行居中对齐',
      setter: { concept: 'SwitchSetter' },
    })
    alignCenter: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '简洁风格',
      description: '是否应用简洁风格',
      setter: { concept: 'SwitchSetter' },
    })
    simple: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
      emptyBackground: 'add-sub',
      snippets: [
        {
          title: '步骤条项',
          code: '<el-step><template #title><el-text text="步骤 N"></el-text></template></el-step>',
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '步骤标题',
      description: '步骤标题',
    })
    slotTitle: (current: Current<T>) => Array<ViewComponent>;

    @Slot({
      title: '步骤描述',
      description: '步骤描述',
    })
    slotDescription: (current: Current<T>) => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag.endsWith('el-steps')",
      forceRefresh: 'parent',
    },
  })
  @Component({
    title: '步骤条项',
    description: '步骤条项',
  })
  export class ElStep extends ViewComponent {
    constructor(options?: Partial<ElStepOptions>) {
      super();
    }
  }

  export class ElStepOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '步骤别名',
      description: '步骤别名，用与步骤条根据别名来指定当前步骤',
      setter: {
        concept: 'InputSetter',
      },
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '图标',
      description: '自定义图标',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_ELEMENTUI_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '当前步骤的状态',
      description: '设置当前步骤的状态，不设置则根据步骤条确定状态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '步骤条状态' },
          { title: '等待' },
          { title: '进行中' },
          { title: '完成' },
          { title: '错误' },
          { title: '成功' },
        ],
      },
    })
    status: '' | 'wait' | 'process' | 'finish' | 'error' | 'success' = '';

    @Slot({
      title: '步骤标题',
      description: '步骤标题',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '步骤描述',
      description: '步骤描述',
    })
    slotDescription: () => Array<ViewComponent>;
  }
}
