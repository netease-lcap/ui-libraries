/// <reference types="@nasl/types" />

namespace nasl.ui {
    @Component({
        title: '流程按钮',
        icon: 'processbutton',
        description: '',
        group: 'Process'
    })
    export class UProcessButton extends ViewComponent {

        constructor(options?: Partial<UProcessButtonOptions>) { super(); }
    }

    export class UProcessButtonOptions  extends ViewComponentOptions {
        @Prop({
            group: '主要属性',
            title: '提交按钮样式',
            description: '设置提交按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        submit_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '主要属性',
            title: '同意按钮样式',
            description: '设置同意按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        approve_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '主要属性',
            title: '拒绝按钮样式',
            description: '设置拒绝按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        reject_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        // @Prop({
        //     group: '主要属性',
        //     title: '回退按钮样式',
        //     description: '设置回退按钮的颜色和按钮样式类型',
        //     docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
        //     setter: {
        //         concept: 'EnumSelectSetter',
        //         options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
        //     },
        // })
        // revert_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '主要属性',
            title: '转派按钮样式',
            description: '设置转派按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        reassign_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '主要属性',
            title: '加签按钮样式',
            description: '设置加签按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        addSign_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '主要属性',
            title: '撤回按钮样式',
            description: '设置撤回按钮的颜色和按钮样式类型',
            docDescription: '- 支持定义按钮样式，包括主要按钮、次要按钮、普通按钮、危险操作按钮和次要危险操作按钮。',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '主要按钮' }, { title: '次要按钮' }, { title: '普通按钮' }, { title: '危险操作按钮' }, { title: '次要危险操作按钮' }],
            },
        })
        withdraw_color: 'primary' | 'primary_secondary' | 'default' | 'danger' | 'danger_secondary' = 'default';

        @Prop({
            group: '交互属性',
            title: '操作成功响应方式',
            docDescription: '支持页面跳转、刷新当前页',
            bindHide: true,
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '页面跳转' }],
            },
        })
        linkType: 'destination' = 'destination';

        @Prop({
            group: '交互属性',
            title: '链接地址',
            docDescription: '链接的详细地址',
        })
        hrefAndTo: nasl.core.String;

        @Prop({
            group: '交互属性',
            title: '链接打开方式',
            description: '链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。',
            docDescription: '可选新窗口、父级窗口、当前窗口和顶级窗口，其中父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '新窗口' }, { title: '当前窗口' }, { title: '父级窗口' }, { title: '顶级窗口' }],
            },
        })
        target: '_blank' | '_self' | '_parent' | '_top' = '_self';

        @Event({
            title: '提交时',
            description: '提交时按钮成功执行后触发。',
        })
        onSubmit: (event: any) => void;

        @Event({
            title: '同意时',
            description: '同意时按钮成功执行后触发。',
        })
        onApprove: (event: any) => void;

        @Event({
            title: '拒绝时',
            description: '拒绝时按钮成功执行后触发。',
        })
        onReject: (event: any) => void;

        // @Event({
        //     title: '回退时',
        //     description: '回退时按钮成功执行后触发。',
        // })
        // onRevert: (event: any) => void;

        @Event({
            title: '转派时',
            description: '转派时按钮成功执行后触发。',
        })
        onReassign: (event: any) => void;

        @Event({
            title: '加签时',
            description: '加签时按钮成功执行后触发。',
        })
        onAddSign: (event: any) => void;

        @Event({
            title: '撤回时',
            description: '撤回时按钮成功执行后触发。',
        })
        onWithdraw: (event: any) => void;
    }
}

