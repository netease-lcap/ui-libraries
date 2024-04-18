/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '单元格组',
    icon: 'cell-group',
    description: '单元格为列表中的单个展示项',
    group: "Display"
  })
  export class VanCellGroup extends ViewComponent {
    constructor(options?: Partial<VanCellGroupOptions>) {
      super();
    }
  }
  export class VanCellGroupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '卡片风格',
      description: '是否显示为卡片风格',
      setter: {
        concept: "SwitchSetter"
      }
    })
    inset: nasl.core.Boolean = false;
    @Slot({
      title: 'undefined',
      description: '插入`<van-cell>`子组件。',
      emptyBackground: 'add-sub-large',
      snippets: [{
        title: '单元格',
        code: '<van-cell isLink center><template #title>左侧文本</template><template>右侧文本</template></van-cell>'
      }]
    })
    slotDefault: () => Array<VanCell>;
  }
  @Component({
    title: '单元格',
    group: "Display"
  })
  export class VanCell extends ViewComponent {
    constructor(options?: Partial<VanCellOptions>) {
      super();
    }
  }
  export class VanCellOptions extends ViewComponentOptions {
    @Prop({
      title: '左侧文本',
      description: '左侧文本'
    })
    private title: nasl.core.String;
    @Prop({
      title: '右侧文本',
      description: '右侧文本'
    })
    private rtitle: nasl.core.String;
    @Prop({
      title: '标题下方的描述信息',
      description: '标题下方的描述信息'
    })
    private label: nasl.core.String = '这是单元格';
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识单元格的值'
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '箭头图标',
      description: '是否显示箭头图标',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isLink: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '箭头方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '上'
        }, {
          title: '下'
        }, {
          title: '右'
        }]
      }
    })
    arrowDirection: 'left' | 'up' | 'down' | 'right' = 'right';
    @Prop({
      group: '主要属性',
      title: '垂直居中',
      description: '是否垂直居中展示',
      setter: {
        concept: "SwitchSetter"
      }
    })
    center: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '图标',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '链接类型',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '页面跳转'
        }, {
          title: '下载链接'
        }]
      }
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '打开方式',
      description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '新窗口'
        }, {
          title: '当前窗口'
        }, {
          title: '父级窗口'
        }, {
          title: '顶级窗口'
        }]
      }
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
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
  }) => void;
    @Slot({
      title: 'undefined',
      description: '插入文本或 HTML。'
    })
    slotDefault: () => Array<ViewComponent>;
    @Slot({
      title: 'undefined',
      description: '插入文本或 HTML。'
    })
    slotTitle: () => Array<ViewComponent>;
    @Slot({
      title: 'undefined',
      description: '右侧图标。'
    })
    private slotRightIcon: () => Array<ViewComponent>;
  }
}
