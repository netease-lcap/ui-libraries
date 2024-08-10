/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'el-step'"
    }
  })
  @Component({
    title: '步骤条',
    icon: 'steps',
    description:
      '引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。',
    group: 'Navigation',
  })
  export class ElSteps extends ViewComponent {
    constructor(options?: Partial<ElStepsOptions>) {
      super();
    }
  }

  export class ElStepsOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '每个 step 的间距',
      description: '每个 step 的间距，不填写将自适应间距。支持百分比。',
      setter: { concept: 'InputSetter' },
    })
    space: nasl.core.Decimal | nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示方向',
      description: '显示方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
    })
    direction: 'vertical' | 'horizontal';

    @Prop({
      group: '主要属性',
      title: '设置当前激活步骤',
      description: '设置当前激活步骤',
      setter: { concept: 'NumberInputSetter' },
    })
    active: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '设置当前步骤的状态',
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
    processStatus: 'wait' | 'process' | 'finish' | 'error' | 'success'

    @Prop({
      group: '主要属性',
      title: '设置结束步骤的状态',
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
      group: '主要属性',
      title: '进行居中对齐',
      description: '进行居中对齐',
      setter: { concept: 'SwitchSetter' },
    })
    alignCenter: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否应用简洁风格',
      description: '是否应用简洁风格',
      setter: { concept: 'SwitchSetter' },
    })
    simple: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
      snippets: [{ title: 'Step', code: '<el-step></el-step>' }],
    })
    slotDefault: () => Array<ViewComponent>;
  }


  @IDEExtraInfo({
    show: false,
    "ideusage": {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-steps'",
      "selector": {
        "expression": "this",
        "cssSelector": "div[class='el-step']"
      }
    }
  })

  @Component({
    title: 'Step',
    icon: 'step',
    description: '',
    group: 'Navigation',
  })
  export class ElStep extends ViewComponent {
    constructor(options?: Partial<ElStepOptions>) {
      super();
    }
  }

  export class ElStepOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: { concept: 'InputSetter' },
    })
    title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '描述文案',
      description: '描述文案',
      setter: { concept: 'InputSetter' },
    })
    description: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Step 组件的自定义图标',
      description: 'Step 组件的自定义图标。 也支持 slot 方式写入',
      setter: { concept: 'InputSetter' },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '当前步骤的状态',
      description: '设置当前步骤的状态，不设置则根据 steps 确定状态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '' },
          { title: 'wait' },
          { title: 'process' },
          { title: 'finish' },
          { title: 'error' },
          { title: 'success' },
        ],
      },
    })
    status: '' | 'wait' | 'process' | 'finish' | 'error' | 'success';

    @Slot({
      title: '自定义图标',
      description: '自定义图标',
    })
    slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: '自定义标题',
      description: '自定义标题',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '自定义描述性文字',
      description: '自定义描述性文字',
    })
    slotDescription: () => Array<ViewComponent>;
  }
}
