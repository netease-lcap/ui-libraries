/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '地区选择',
    icon: 'region-select',
    description: '省市区三级联动选择',
    group: "Selector"
  })
  export class VanArea extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: nasl.core.String = '';

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Prop({
      title: '预览',
    })
    preview: nasl.core.Boolean;

    constructor(options?: Partial<VanAreaOptions>) {
      super();
    }
  }
  export class VanAreaOptions extends ViewComponentOptions {
    @Prop({
      title: '左侧标题',
      description: '左侧标题'
    })
    private labelField: nasl.core.String;
    @Prop({
      title: '是否使用新版外观',
      description: '是否使用新版外观',
      setter: {
        concept: "SwitchSetter"
      }
    })
    isNew: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识地区选择的值',
      sync: true,
      settable: true,
    })
    value: nasl.core.String = '';
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。'
      // { "province_list": { "110000": "北京市" }, "city_list": { "110100": "北京市" }, "county_list": { "110101": "东城区", "110102": "西城区", "110105": "朝阳区", "110106": "丰台区", "110107": "石景山区", "110108": "海淀区", "110109": "门头沟区", "110111": "房山区", "110112": "通州区", "110113": "顺义区", "110114": "昌平区", "110115": "大兴区", "110116": "怀柔区", "110117": "平谷区", "110118": "密云区", "110119": "延庆区" } };
    })
    areaListprop: {
      province_list: {
        [key: string]: string;
      };
      city_list: {
        [key: string]: string;
      };
      county_list: {
        [key: string]: string;
      };
    };
    // @Prop({
    //   group: '主要属性',
    //   title: '顶部栏标题',
    //   implicitToString: true,
    // })
    // title: nasl.core.String = '标题';
    @Prop<VanAreaOptions, 'confirmButtonText'>({
      group: '主要属性',
      title: '确认按钮文字',
      implicitToString: true,
      if: _ => !_.isNew
    })
    confirmButtonText: nasl.core.String = '确认';
    @Prop<VanAreaOptions, 'cancelButtonText'>({
      group: '主要属性',
      title: '取消按钮文字',
      implicitToString: true,
      if: _ => !_.isNew
    })
    cancelButtonText: nasl.core.String = '取消';
    @Prop({
      group: '主要属性',
      title: '可见选项个数',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1
      }
    })
    visibleItemCount: nasl.core.Integer = 6;
    @Prop({
      group: '主要属性',
      title: '显示列数',
      description: '显示列数，3-省市区，2-省市，1-省',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1,
      }
    })
    columnsNum: nasl.core.Integer = 3;
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right' = 'left';
    @Prop({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '地区名称'
        }, {
          title: '地区码'
        }]
      }
    })
    converter: 'name' | 'code';
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '占位提示',
      description: '',
      setter: {
        concept: "InputSetter"
      },
      implicitToString: true,
    })
    placeholder: nasl.core.String;
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '点击右上方完成按钮',
      description: '点击右上方完成按钮'
    })
    onConfirm: (values: nasl.collection.List<{
      code: nasl.core.String;
      name: nasl.core.String;
    }>, index: nasl.collection.List<nasl.core.Integer>, value: nasl.core.String) => void;
    @Event({
      title: '点击取消按钮时',
      description: '点击取消按钮时'
    })
    onCancel: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '选项改变时触发',
      description: '选项改变时触发'
    })
    onChange: (event: nasl.ui.BaseEvent) => void;

    @Slot({
      title: '组件插槽',
      description: '标题'
    })
    slotTitle: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'undefined',
    //   description: '插入`<van-picker-action-slot>`子组件',
    //   snippets: [{
    //     title: '事件插槽',
    //     code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>'
    //   }]
    // })
    // slotDefault: () => Array<VanPickerActionSlot>;

    @Slot({
      title: '组件插槽',
      description: '自定义',
    })
    'slot-pannel-title': () => Array<ViewComponent>;
    slotPannelTitle: () => Array<ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义选择器顶部内容',
    })
    'slot-picker-top': () => Array<ViewComponent>;
    slotPickerTop: () => Array<ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义选择器底部内容',
    })
    'slot-picker-bottom': () => Array<ViewComponent>;
    slotPickerBottom: () => Array<ViewComponent>;
  }
}
