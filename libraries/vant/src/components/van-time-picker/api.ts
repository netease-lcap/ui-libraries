/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: "drawerdropdown",
      cacheOpenKey: "show",
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
  }

  export class VanTimePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行时间区间选择，关闭则为时间点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [{ clear: ['startPlaceholder', 'endPlaceholder'] }],
    })
    isRange: nasl.core.Boolean = false;

    @Prop<VanTimePickerOptions, 'modelValue'>({
      group: '数据属性',
      title: '绑定值',
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
    })
    unit: 'hour' | 'minute' | 'second' = 'minute';

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
      title: '是否显示顶部栏',
      setter: {
        concept: "SwitchSetter"
      },
      onChange: [{ clear: ['title', 'confirmButtonText', 'cancelButtonText'] }],
    })
    showToolbar: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '顶部栏标题',
      implicitToString: true,
      if: (_) => _.showToolbar === true,
    })
    title: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '确认按钮文本',
      implicitToString: true,
      if: (_) => _.showToolbar === true,
    })
    confirmButtonText: nasl.core.String = '确定';

    @Prop({
      group: '主要属性',
      title: '取消按钮文本',
      implicitToString: true,
      if: (_) => _.showToolbar === true,
    })
    cancelButtonText: nasl.core.String = '取消';

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

    @Slot({
      title: '组件插槽',
      description: '标题'
    })
    slotLabel: () => Array<ViewComponent>;
  }
}
