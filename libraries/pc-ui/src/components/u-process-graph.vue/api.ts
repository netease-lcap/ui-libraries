/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '流程图',
        icon: 'processinfo',
        description: '',
        group: 'Process'
    })
    export class UProcessGraph extends ViewComponent {

        constructor(options?: Partial<UProcessGraphOptions>) { super(); }
    }

    export class UProcessGraphOptions  extends ViewComponentOptions {
        @Prop({
            group: '主要属性',
            title: '流程任务ID',
            description: '',
        })
        taskId: nasl.core.String;

        @Prop({
            title: '初始缩放比',
            description: '',
        })
        initialZoom: nasl.core.String;

    }
}
