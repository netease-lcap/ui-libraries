/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '流程记录',
        icon: 'table-view',
        description: '',
        group: 'Process'
    })
    export class UProcessRecord extends ViewComponent {

        constructor(options?: Partial<UProcessRecordOptions>) { super(); }
    }

    export class UProcessRecordOptions  extends ViewComponentOptions {
        @Prop({
            group: '交互属性',
            title: '展示类型',
            docDescription: '',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '表格' }, { title: '时间线' }],
            },
        })
        type: 'table' | 'timeline' = 'table';
    }
}

