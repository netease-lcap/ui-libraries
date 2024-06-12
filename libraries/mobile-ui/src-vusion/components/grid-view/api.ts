/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '数据网格',
    icon: 'grid-view',
    description: '数据网格',
    group: "Table"
  })
  export class VanGridView<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<VanGridViewOptions<T, V, P, M>>) {
      super();
    }

    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;

    @Prop({
      title: '数据量',
    })
    total: nasl.core.Integer;

    @Prop({
      title: '当前页数',
    })
    page: nasl.core.Integer;

    @Prop({
      title: '当前页数',
    })
    size: nasl.core.Integer;

    @Prop({
      title: '过滤文本',
    })
    filterText: nasl.core.String;

    // 由于之前误开放出去了，有历史数据，防止ts报错临时补上
    @Prop({
      title: '排序属性'
    })
    sort: nasl.core.String;
    @Prop({
      title: '排序方式'
    })
    order: nasl.core.String;

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载'
    })
    reload(): any {}
  }
  export class VanGridViewOptions<T, V, P extends nasl.core.Boolean, M extends nasl.core.Boolean> extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '当前选择的值',
      sync: true
    })
    private value: any;
    @Prop({
      title: '值字段名',
      description: '选项值的字段名'
    })
    private valueField: (item: T) => V;
    @Prop({
      title: '可取消',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private cancelable: nasl.core.Boolean = false;
    @Prop({
      title: '可多选',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private multiple: nasl.core.Boolean = false;
    @Prop({
      title: '筛选清除按钮',
      description: '搜索框是否有清除按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private clearable: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}, {}, {}, {}, {}, {}]
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。'
    })
    dataSchema: T;
    @Prop({
      group: '主要属性',
      title: '分页方式',
      description: '设置分页方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '不分页'
        }, {
          title: '滚动加载更多'
        }, {
          title: '点击加载更多'
        }]
      }
    })
    pageable: '' | 'auto-more' | 'load-more' = '';
    @Prop<VanGridViewOptions<T, V, P, M>, any>({
      group: '主要属性',
      title: '分页大小',
      description: '设置分页大小，单位为px。',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1
      },
      if: _ => !!_.pageable
    })
    pageSize: nasl.core.Integer = 20;

    @Prop({
      group: '主要属性',
      title: '当前页数',
      description: '当前页数',
    })
    private pageNumber: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '可筛选',
      description: '是否可以过滤（搜索），开启将会显示搜索框。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    filterable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '后端分页',
      setter: {
        concept: "SwitchSetter"
      }
    })
    remotePaging: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '后端筛选',
      setter: {
        concept: "SwitchSetter"
      }
    })
    remoteFiltering: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '下拉刷新',
      description: '是否开启下拉刷新',
      setter: {
        concept: "SwitchSetter"
      }
    })
    pullRefresh: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '下拉过程中提示文案',
      implicitToString: true,
    })
    pullingText: nasl.core.String = '下拉刷新';
    @Prop({
      group: '交互属性',
      title: '释放过程中提示文案',
      implicitToString: true,
    })
    loosingText: nasl.core.String = '释放刷新';
    @Prop({
      group: '交互属性',
      title: '刷新成功提示文案',
      implicitToString: true,
    })
    successText: nasl.core.String = '已刷新';
    @Prop({
      group: '交互属性',
      title: '展示时长',
      description: '设置刷新成功后提示展示时长，单位为ms。',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    successDuration: nasl.core.Integer = 500;
    @Prop({
      group: '交互属性',
      title: '刷新距离',
      description: '设置触发下拉刷新的距离，单位为px。',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    pullDistance: nasl.core.Decimal = 50;
    @Prop({
      group: '交互属性',
      title: '搜索框占位符',
      description: '搜索框为空时的显示文本',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请输入';
    @Prop({
      group: '状态属性',
      title: '初始加载',
      description: '设置初始时是否立即加载',
      setter: {
        concept: "SwitchSetter"
      }
    })
    initialLoad: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '加载中文案',
      implicitToString: true,
    })
    loadingText: nasl.core.String = '加载中...';
    @Prop({
      group: '状态属性',
      title: '是否加载失败',
      description: '手动设置是否加载失败。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private error: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '加载失败文案',
      implicitToString: true,
    })
    errorText: nasl.core.String = '加载失败，请重试';
    @Prop({
      group: '状态属性',
      title: '暂无数据文案',
      implicitToString: true,
    })
    emptyText: nasl.core.String = '暂无数据';
    @Prop({
      group: '样式属性',
      title: '瀑布模式',
      description: '是否开启瀑布模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    iffall: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '网格数',
      description: '设置每页排列几项',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1
      }
    })
    col: nasl.core.Integer = 2;
    @Prop({
      group: '状态属性',
      title: '只读',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private disabled: nasl.core.Boolean = false;
    @Prop<VanGridViewOptions<T, V, P, M>, 'textField'>({
      group: '数据属性',
      title: '文本字段名',
      description: '选项文本的字段名，可用于前端筛选时的匹配',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;
    @Event({
      title: '加载后',
      description: '加载时触发'
    })
    onLoad: (event: nasl.ui.BaseEvent) => void;
    @Slot({
      title: 'undefined',
      description: '插入<van-cardu />',
      emptyBackground: 'drag-entity-here',
      snippets: [{
        title: '卡片',
        code: '<template #item="current"><van-cardu><template #head><van-text text="标题"></van-text></template><van-text  text="卡片内容"></van-text></van-cardu></template>'
      }]
    })
    slotDefault: () => Array<VanCardu>;
    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}
