/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: "drawerdropdown",
      cacheOpenKey: "popupOpened",
      drawerCSSSelector: ".van-popup",
      dataSource: {},
    },
  })
  @Component({
    title: '时间选择器',
    icon: 'time-picker',
    description: '时间选择器',
    group: 'Selector',
  })
  export class VanTimePicker extends ViewComponent {
    constructor(options?: Partial<VanTimePickerOptions>) {
      super();
    }

    @Prop({
      title: '值',
    })
    modelValue: VanTimePickerOptions['modelValue'];

    @Prop({
      title: '起始值',
    })
    startValue: VanTimePickerOptions['startValue'];

    @Prop({
      title: '结束值',
    })
    endValue: VanTimePickerOptions['endValue'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Method({
      title: 'undefined',
      description: '打开'
    })
    open(): any {}

    @Method({
      title: 'undefined',
      description: '关闭'
    })
    close(): any {}
  }

  export class VanTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{
        clear: ['nextStepText'],
      }],
    })
    isRange: nasl.core.Boolean = false;

    @Prop<VanTimePickerOptions, 'modelValue'>({
      group: '数据属性',
      title: '值',
      sync: true,
      description: '绑定值',
      setter: { concept: 'InputSetter' },
      if: (_) => !_.isRange,
    })
    modelValue: nasl.core.String | nasl.core.Time;
    
    @Prop<VanTimePickerOptions, 'startValue'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.isRange === true,
    })
    startValue: nasl.core.String | nasl.core.Time;

    @Prop<VanTimePickerOptions, 'endValue'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束时间值，格式如08:08:08',
      sync: true,
      if: (_) => _.isRange === true,
    })
    endValue: nasl.core.String | nasl.core.Time;

    @Prop<VanTimePickerOptions, 'unit'>({
      title: '最小单位',
      group: '数据属性',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '时',
        }, {
          title: '分',
        }, {
          title: '秒',
        }]
      },
      onChange: [{
        update: {
          showFormatter: 'HH',
        },
        if: (_) => _ === 'hour',
      }, {
        update: {
          showFormatter: 'HH:mm',
        },
        if: (_) => _ === 'minute',
      }, {
        update: {
          showFormatter: 'HH:mm:ss',
        },
        if: (_) => _ === 'second',
       }],
    })
    unit: 'hour' | 'minute' | 'second' = 'second';

    @Prop<VanTimePickerOptions, 'showFormatter'>({
      group: '数据属性',
      title: '展示格式',
      description: '展示格式',
      setter: {
        concept: "EnumSelectSetter",
        options: [
          {
            title: '12:09:09',
            if: _ => _.unit === 'second'
          },
          {
            title: '12时09分09秒',
            if: _ => _.unit === 'second'
          }, {
            title: '12:09',
            if: _ => _.unit === 'minute'
          }, {
            title: '12时09分',
            if: _ => _.unit === 'minute'
          },
          {
            title: '12',
            if: _ => _.unit === 'hour'
          },
          {
            title: '12时',
            if: _ => _.unit === 'hour'
          }
        ],
      }
    })
    showFormatter: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' | 'HH' | 'HH时' = 'HH:mm:ss';

    @Prop<VanTimePickerOptions, 'maxTime'>({
      group: '数据属性',
      title: '最大时间',
      description: '可选的最大时间，格式参考 10:20:00'
    })
    maxTime: nasl.core.String = '23:59:59';

    @Prop<VanTimePickerOptions, 'minTime'>({
      group: '数据属性',
      title: '最小时间',
      description: '可选的最小时间，格式参考 07:40:00'
    })
    minTime: nasl.core.String = '00:00:00';

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
    inputAlign: 'left' | 'center' | 'right' = 'right';

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
      group: '主要属性',
      title: '取消按钮文本',
      description: '取消按钮文本',
      setter: {
        concept: "InputSetter"
      },
    })
    cancelButtonText : nasl.core.String = '取消';

    @Prop({
      group: '主要属性',
      title: '确认按钮文本',
      description: '确认按钮文本',
      setter: {
        concept: "InputSetter"
      },
    })
    confirmButtonText : nasl.core.String = '确认';

    @Prop({
      group: '主要属性',
      title: '下一步按钮文本',
      description: '下一步按钮文本',
      setter: {
        concept: "InputSetter"
      },
      if: (_) => _.isRange === true,
    })
    nextStepText: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '开始时间标签项文本',
      description: '开始时间标签项文本',
      setter: {
        concept: "InputSetter"
      },
      if: (_) => _.isRange === true,
    })
    startTimeTabTitle : nasl.core.String = '开始时间';

    @Prop({
      group: '主要属性',
      title: '结束时间标签项文本',
      description: '结束时间标签项文本',
      setter: {
        concept: "InputSetter"
      },
      if: (_) => _.isRange === true,
    })
    endTimeTabTitle : nasl.core.String = '结束时间';

    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: "SwitchSetter"
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = true;

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
      group: '状态属性',
      title: '弹出状态',
      setter: {
        concept: "SwitchSetter"
      }
    })
    popupOpened: nasl.core.Boolean = false;

    @Event({
      title: '确认时',
      description: '点击完成按钮时触发的事件'
    })
    onConfirm: (event: {
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    } | Array<{
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    }>) => void;

    @Event({
      title: '取消时',
      description: '点击完成取消时触发的事件'
    })
    onCancel: (event: {
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    } | Array<{
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    }>) => void;

    @Event({
      title: '改变时',
      description: '值变化时触发的事件'
    })
    onChange: (event: {
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    } | Array<{
      selectedIndexes: Array<nasl.core.Integer>,
      selectedValues: Array<nasl.core.String>,
      selectedOptions: Array<{
        text: nasl.core.String,
        value: nasl.core.String,
      }>,
    }>) => void;

    @Slot({
      title: '组件插槽',
      description: '标题'
    })
    slotLabel: () => Array<ViewComponent>;

    @Slot({
      title: '组件插槽',
      description: '顶部栏标题'
    })
    slotTitle: () => Array<ViewComponent>;
  }
}
