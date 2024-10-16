/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '单选组',
        icon: 'radios',
        description: '多项中选择一个时使用',
        group: 'Form'
    })
    export class URadios<T, V> extends ViewComponent {
        @Prop({
            title: '数据',
        })
        data: nasl.collection.List<T>;

        @Prop({
            title: '选中值',
        })
        value: URadiosOptions<T, V>['value'];

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

        @Method({
            title: 'undefined',
            description: '清除缓存，重新加载',
        })
        reload(): void {}
        constructor(options?: Partial<URadiosOptions<T, V>>) { super(); }
    }

    export class URadiosOptions<T, V> extends ViewComponentOptions {
        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
            docDescription: '支持动态绑定集合类型变量（List\<T>）或输出参数为集合类型的逻辑',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T> | { list: nasl.collection.List<T>; total: nasl.core.Integer };

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
            docDescription: '该属性为只读状态，当数据源动态绑定集合List\<T>后，会自动识别T的类型并进行展示',
        })
        dataSchema: T;

        @Prop<URadiosOptions<T, V>, any>({
            group: '数据属性',
            title: '选项文本',
            description: '集合的元素类型中，用于显示文本的属性名称',
            setter: {
                concept: 'PropertySelectSetter',
            },
        })
        private textField: (item: T) => any;

        @Prop<URadiosOptions<T, V>, 'valueField'>({
            group: '数据属性',
            title: '选项值字段',
            description: '集合的元素类型中，用于标识选中值的字段',
            docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
            setter: {
                concept: 'PropertySelectSetter',
            },
        })
        valueField: (item: T) => V = ((item: any)  => item.value) as any;

        @Prop({
            group: '数据属性',
            title: '选中值',
            description: '当前选中的值',
            sync: true,
            docDescription: '当前选择的值',
            settable: true,
        })
        value: V;

        @Prop({
            group: '主要属性',
            title: '排列方向',
            description: '选择水平或垂直排列',
            setter: {
              concept: "EnumSelectSetter",
              options: [{ title: '水平' }, { title: '垂直' }]
            }
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

        @Prop<URadiosOptions<T, V>, 'column'>({
            group: '主要属性',
            title: '每行排列数',
            description: '水平排列时每行展示的选项数量',
            setter: {
                concept: "NumberInputSetter",
                precision: 0,
                min: 1
            },
            if: _ => _.direction === 'horizontal'
        })
        column: nasl.core.Integer;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            docDescription: '正常显示，但禁止选择或输入',
            setter: {
                concept: 'SwitchSetter',
            },
            settable: true,
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                concept: 'SwitchSetter',
            },
            settable: true,
        })
        disabled: nasl.core.Boolean = false;

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
            title: '选择前',
            description: '选择某一项前触发',
        })
        onBeforeSelect: (event: {
            value: V;
            oldValue: V;
        }) => any;

        @Event({
            title: '输入时',
            description: '选择某一项时触发',
        })
        onInput: (event: nasl.core.String) => any;

        @Event({
            title: '选择后',
            description: '选择某一项时触发',
        })
        onSelect: (event: {
            value: V;
            oldValue: V;
        }) => any;

        @Event({
            title: '改变后',
            description: '选择值改变时触发',
        })
        onChange: (event: {
            value: V;
            oldValue: V;
        }) => any;

        @Event({
            title: '加载前',
            description: '加载前触发',
        })
        onBeforeLoad: (event: any) => any;

        @Event({
            title: '加载后',
            description: '加载后触发',
        })
        onLoad: (event: any) => any;

        @Slot({
            title: '默认',
            description: '插入`<u-radio>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '单选项',
                    code: '<u-radio><template slot="item">节点</template></u-radio>',
                },
            ],
        })
        slotDefault: () => Array<URadio<V>>;

        @Slot({
            title: '组件插槽',
            description: '自定义选项的结构和样式',
        })
        slotItem: (current: Current<T>) => Array<ViewComponent>;
    }

    @Component({
        title: '单选项',
        description: '单选项',
    })
    export class URadio<V> extends ViewComponent {
        @Prop({
          title: '禁用',
        })
        disabled: nasl.core.Boolean;

        @Prop({
          title: '只读',
        })
        readonly: nasl.core.Boolean;

        constructor(options?: Partial<URadioOptions<V>>) { super(); }
    }

    export class URadioOptions<V> extends ViewComponentOptions {
        @Prop({
            title: '文本',
            description: '显示文本内容',
        })
        private text: nasl.core.String;

        @Prop({
            group: '数据属性',
            title: '选项值',
            description: '用于标识选项的值',
            docDescription: '单选框返还的选项值',
        })
        label: V | nasl.core.String | nasl.core.Boolean | nasl.core.Integer;

        @Prop({
            group: '主要属性',
            title: '自动获取焦点',
            description: '设置是否自动获取焦点',
            setter: {
                concept: 'SwitchSetter',
            },
        })
        autofocus: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            docDescription: '正常显示，但禁止选择或输入。',
            setter: {
                concept: 'SwitchSetter',
            },
            settable: true,
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                concept: 'SwitchSetter',
            },
            settable: true,
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '选择前',
            description: '选择此项前触发',
        })
        onBeforeSelect: (event: {
            value: V;
            oldValue: V;
        }) => any;

        @Slot({
            title: '组件插槽',
            description: '自定义选项的结构和样式',
        })
        slotItem: () => Array<ViewComponent>;
    }
}
