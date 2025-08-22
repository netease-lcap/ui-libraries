/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 1,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: 'target.tag === "van-cell"',
      selector: [
        {
          expression: "this.getElement(el => el.slotTarget === 'title')",
          cssSelector: '.van-cell-group__title',
        },
        {
          expression: "this",
          cssSelector: '.van-cell-group',
        },
      ],
    }
  })

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

    // @Prop({
    //   group: '主要属性',
    //   title: '分组标题',
    //   description: '分组标题',
    //   setter: {
    //     concept: "InputSetter"
    //   }
    // })
    // title: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '边框',
      description: '是否显示边框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    border: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '分组标题',
      description: '是否使用分组标题',
      setter: {
        concept: "SwitchSetter"
      }
    })
    useTitle: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '插入`<van-cell>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '单元格',
        code: '<van-cell><template #title>单元格标题</template><template #value>单元格内容</template></van-cell>'
      }]
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '自定义分组标题',
      description: '插入文本或 HTML。'
    })
    slotTitle: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      parentAccept: "target.tag === 'van-cell-group'",
      // selector: {
      //   expression: 'this',
      //   cssSelector: 'van-cell',
      // },
    },
  })
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
      group: '主要属性',
      title: '大小',
      description: '大小',
      setter: {
        concept: "EnumSelectSetter",
        options: [
          { title: '大'},
          { title: '默认' },
        ]
      }
    })
    size: 'large' | 'normal' = 'normal';

    @Prop({
      group: '主要属性',
      title: '左侧图标',
      description: '左侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    icon: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '右侧图标',
      description: '右侧图标名称或图片链接，等同于 Icon 组件的 name 属性',
      setter: {
        concept: 'IconSetter',
        customIconFont: 'LCAP_VANT4_ICONS',
      },
    })
    rightIcon: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '替换当前路由',
      description: '是否在跳转时替换当前页面历史',
      setter: {
        concept: "SwitchSetter"
      }
    })
    replace: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '边框',
      description: '是否显示边框',
      setter: {
        concept: "SwitchSetter"
      }
    })
    border: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '开启点击反馈',
      description: '是否开启点击反馈',
      setter: {
        concept: "SwitchSetter"
      }
    })
    clickable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '展示右侧箭头并开启点击反馈',
      description: '是否展示右侧箭头并开启点击反馈，优先级低于右侧图标',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isLink: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示表单必填星号',
      description: '是否显示表单必填星号',
      setter: {
        concept: "SwitchSetter"
      }
    })
    required: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '垂直居中',
      description: '是否使内容垂直居中',
      setter: {
        concept: "SwitchSetter"
      }
    })
    center: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '箭头方向',
      description: '箭头方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [
          { title: '左' },
          { title: '上' },
          { title: '下' },
          { title: '右' },
        ]
      }
    })
    arrowDirection: 'left' | 'up' | 'down' | 'right' = 'right';

    @Event({
      title: '点击后',
      description: '点击单元格时触发'
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
      title: '自定义左侧标题',
      description: '插入文本或 HTML。'
    })
    slotTitle: () => Array<ViewComponent>;

    @Slot({
      title: '自定义右侧内容',
      description: '插入文本或 HTML。'
    })
    slotValue: () => Array<ViewComponent>;

    @Slot({
      title: '自定义标题下方的描述信息',
      description: '插入文本或 HTML。'
    })
    slotLabel: () => Array<ViewComponent>;

    // 这两个插槽用属性来实现
    // @Slot({
    //   title: '自定义左侧图标',
    //   description: '插入文本或 HTML。'
    // })
    // slotIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: '自定义右侧图标',
    //   description: '插入文本或 HTML。'
    // })
    // slotRightIcon: () => Array<ViewComponent>;

    @Slot({
      title: '自定义单元格最右侧的额外内容',
      description: '插入文本或 HTML。'
    })
    slotExtra: () => Array<ViewComponent>;
  }
}
