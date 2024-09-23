/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'el-descriptions-item'"
    }
  })
  @Component({
    title: '描述列表',
    icon: 'descriptions',
    description: '列表形式展示多个字段。',
    group: 'Display',
  })
  export class ElDescriptions extends ViewComponent {
    constructor(options?: Partial<ElDescriptionsOptions>) {
      super();
    }
  }

  export class ElDescriptionsOptions extends ViewComponentOptions {
    @Prop({
      group: '状态属性',
      title: '是否有边框',
      description: '是否带有边框',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '一行描述列表项的数量',
      description: '一行描述列表项的数量',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
    })
    column: nasl.core.Decimal = 3;

    @Prop({
      group: '主要属性',
      title: '排列方向',
      description: '排列的方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
    })
    direction: 'vertical' | 'horizontal' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '列表尺寸',
      description: '列表的尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{title: '默认' }, { title: '中等' }, { title: '小型' }, { title: '迷你' }],
      },
    })
    size: '' | 'medium' | 'small' | 'mini' = '';

    // @Prop({
    //   group: '主要属性',
    //   title: '标题',
    //   description: '标题文本，显示在左上方',
    //   setter: { concept: 'InputSetter' },
    // })
    // title: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: '操作区文本',
    //   description: '操作区文本，显示在右上方',
    //   setter: { concept: 'InputSetter' },
    // })
    // extra: nasl.core.String;

    @Prop({
      group: '状态属性',
      title: '是否显示冒号',
      description: '是否显示冒号',
      setter: { concept: 'SwitchSetter' },
    })
    private colon: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '标签类名',
      description: '自定义标签类名',
      setter: { concept: 'InputSetter' },
    })
    private labelClassName: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '内容类名',
      description: '自定义内容类名',
      setter: { concept: 'InputSetter' },
    })
    private contentClassName: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '标签样式',
      description: '自定义标签样式',
      setter: { concept: 'InputSetter' },
    })
    private labelStyle: nasl.core.String = '{}';

    @Prop({
      group: '样式属性',
      title: '内容样式',
      description: '自定义内容样式',
      setter: { concept: 'InputSetter' },
    })
    private contentStyle: nasl.core.String = '{}';;

    @Slot({
      title: '标题',
      description: '自定义标题，显示在左上方',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '操作区',
      description: '自定义操作区，显示在右上方',
    })
    slotExtra: () => Array<ViewComponent>;

    @Slot({
      title: '内容',
      description: '内容',
      snippets: [
        {
          title: '描述列表项',
          code: `<el-descriptions-item>
            <template #label>
              <el-text text="标签："></el-text>
            </template>
            <el-text text="内容"></el-text>
          </el-descriptions-item>`,
        },
      ],
    })
    slotDefault: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      "idetype": "container",
      "parentAccept": "target.tag === 'el-descriptions'",
      "selector": [
        {
          "expression": "this.getElement(el => el.slotTarget === 'label')",
          "cssSelector": ".el-descriptions-item__label"
        }, {
          "expression": "this",
          "cssSelector": ".el-descriptions-item__content"
        }
      ],
    }
  })
  @Component({
    title: '描述列表项',
    icon: 'descriptions-item',
    description: '',
    group: 'Display',
  })
  export class ElDescriptionsItem extends ViewComponent {
    constructor(options?: Partial<ElDescriptionsItemOptions>) {
      super();
    }
  }

  export class ElDescriptionsItemOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: '标签文本',
    //   description: '标签文本',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '列的数量',
      description: '往右侧占据列的数量',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
    })
    span: nasl.core.Decimal = 1;

    @Prop({
      group: '样式属性',
      title: '标签类名',
      description: '自定义标签类名',
      setter: { concept: 'InputSetter' },
    })
    private labelClassName: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '内容类名',
      description: '自定义内容类名',
      setter: { concept: 'InputSetter' },
    })
    private contentClassName: nasl.core.String;

    @Prop({
      group: '样式属性',
      title: '标签样式',
      description: '自定义标签样式',
      setter: { concept: 'InputSetter' },
    })
    private labelStyle: nasl.core.String = '{}';

    @Prop({
      group: '样式属性',
      title: '内容样式',
      description: '自定义内容样式',
      setter: { concept: 'InputSetter' },
    })
    private contentStyle: nasl.core.String = '{}';

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '标签文本',
      description: '自定义标签文本',
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
