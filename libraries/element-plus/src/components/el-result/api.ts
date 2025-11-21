/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 17,
    ideusage: {
      idetype: 'container'
    }
  })
  @Component({
    title: '结果',
    icon: 'result',
    description: '用于对用户的操作结果或者异常状态做反馈。',
    group: 'Display',
  })
  export class ElResult extends ViewComponent {
    constructor(options?: Partial<ElResultOptions>) {
      super();
    }
  }

  export class ElResultOptions extends ViewComponentOptions {
    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '图标类型',
      description: '选择结果的图标类型',
      docDescription: '控制结果页面显示的图标类型。成功：绿色勾选图标；警告：橙色警告图标；信息：蓝色信息图标；错误：红色错误图标。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '成功' },
          { title: '警告' },
          { title: '信息' },
          { title: '错误' },
        ],
      },
    })
    icon: 'success' | 'warning' | 'info' | 'error' = 'info';

    @Prop({
      group: '主要属性',
      title: '主标题',
      description: '结果页面的主标题',
      docDescription: '设置结果页面的主标题文本，用于说明操作结果。',
      setter: { concept: 'InputSetter' },
    })
    private title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '副标题',
      description: '结果页面的副标题',
      docDescription: '设置结果页面的副标题文本，用于提供详细说明或补充信息。',
      setter: { concept: 'InputSetter' },
    })
    private subTitle: nasl.core.String;

    // @Slot({
    //   title: '图标',
    //   description: '自定义图标',
    // })
    // slotIcon: () => Array<ViewComponent>;

    @Slot({
      title: '标题',
      description: '自定义标题',
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '二级标题',
      description: '自定义二级标题',
    })
    slotSubTitle: () => Array<ViewComponent>;

    @Slot({
      title: '底部额外区域',
      description: '自定义底部额外区域',
    })
    slotExtra: () => Array<ViewComponent>;
  }
}
