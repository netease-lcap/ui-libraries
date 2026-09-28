/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 8,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "target.tag === 'el-descriptions-item'",
    },
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
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '排列方向',
      description: '描述列表的排列方向',
      docDescription: '控制描述列表项的排列方向。垂直：标签和内容垂直排列；水平：标签和内容水平排列。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '垂直' }, { title: '水平' }],
      },
    })
    direction: 'vertical' | 'horizontal' = 'horizontal';

    @Prop({
      group: '主要属性',
      title: '列数',
      description: '每行显示的列表项数量',
      docDescription: '设置每行显示的描述列表项数量，用于控制列表的布局密度。',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
    })
    column: nasl.core.Decimal = 3;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========
    @Prop({
      group: '样式属性',
      title: '列表尺寸',
      description: '选择列表的尺寸大小',
      docDescription: '控制描述列表的整体尺寸。默认：标准尺寸；大型：宽松型列表；小型：紧凑型列表。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '默认' }, { title: '大型' }, { title: '小型' }],
      },
    })
    size: '' | 'large' | 'small' = '';

    @Prop({
      group: '样式属性',
      title: '显示边框',
      description: '是否显示边框',
      docDescription: '开启后，描述列表会显示边框，使内容区分更明显。',
      setter: { concept: 'SwitchSetter' },
    })
    border: nasl.core.Boolean = false;

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
      idetype: 'container',
      forceRefresh: 'parent',
      parentAccept: "target.tag === 'el-descriptions'",
      selector: [
        {
          expression: 'this',
          cssSelector: '.el-descriptions__cell',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'label')",
          cssSelector: '.el-descriptions__cell',
        },
        {
          expression: "this.getElement(el => el.slotTarget === 'content')",
          cssSelector: '.el-descriptions__cell',
        },
      ],
    },
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
    @Prop({
      group: '样式属性',
      title: '列的数量',
      description: '往右侧占据列的数量',
      bindHide: true,
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
    })
    span: nasl.core.Decimal = 1;

    @Prop({
      group: '样式属性',
      title: '跨越行数',
      description: '单元格应该跨越的行数',
      bindHide: true,
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
    })
    rowspan: nasl.core.Integer = 1;

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
