/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 4,
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '提及',
    icon: 'mention',
    description: '提及组件',
    group: 'Form',
  })
  export class ElMention extends ViewComponent {
    constructor(options?: Partial<ElMentionOptions>) {
      super();
    }
  }

  export class ElMentionOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '触发字符',
      description: '触发提及的字符',
      setter: {
        concept: 'InputSetter',
      },
    })
    trigger: nasl.core.String = '@';

    @Prop({
      group: '主要属性',
      title: '建议项列表',
      description: '建议项列表',
      setter: {
        concept: 'InputSetter',
      },
    })
    suggestions: nasl.collection.List<nasl.core.String> = [];

    @Event({
      title: '选择建议项',
      description: '选择建议项时触发',
    })
    onSelect: (item: nasl.core.String) => any;
  }
}
