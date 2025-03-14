/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      childAccept: true,
      selector: {
        expression: 'this',
        cssSelector: '.el-upload',
      },
    },
  })
  @Component({
    title: '上传',
    icon: 'upload',
    description: '通过点击或者拖拽上传文件',
    group: 'Form',
  })
  export class ElUpload extends ViewComponent {
    constructor(options?: Partial<ElUploadOptions>) {
      super();
    }

    @Method({
      title: '清空已上传文件列表',
      description: '清空已上传的文件列表',
    })
    clearFiles(): void {}

    @Method({
      title: '取消上传请求',
      description: '取消上传请求',
    })
    abort(): void {}

    @Method({
      title: '手动上传文件列表',
      description: '手动上传文件列表',
    })
    submit(): void {}
  }

  export class ElUploadOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '上传地址',
      description: '请求URL',
      setter: { concept: 'InputSetter' },
    })
    action: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '请求头',
      description: '设置上传的请求头部',
      setter: { concept: 'InputSetter' },
    })
    headers: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '上传时附带的额外参数',
      description: '上传时附带的额外参数',
      setter: { concept: 'InputSetter' },
    })
    data: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否支持多选文件',
      description: '是否支持多选文件',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '接受上传的文件类型',
      description: '接受上传的文件类型',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否启用拖拽上传',
      description: '是否启用拖拽上传',
      setter: { concept: 'SwitchSetter' },
    })
    drag: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示已上传文件列表',
      description: '是否显示已上传文件列表',
      setter: { concept: 'SwitchSetter' },
    })
    showFileList: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否自动上传',
      description: '是否在选取文件后立即进行上传',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Event({
      title: '文件上传成功时',
      description: '文件上传成功时的钩子',
    })
    onSuccess: (response: any, file: File, fileList: File[]) => any;

    @Event({
      title: '文件上传失败时',
      description: '文件上传失败时的钩子',
    })
    onError: (err: Error, file: File, fileList: File[]) => any;

    @Event({
      title: '文件状态改变时',
      description: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
    })
    onChange: (file: File, fileList: File[]) => any;

    @Event({
      title: '文件列表移除文件时',
      description: '文件列表移除文件时的钩子',
    })
    onRemove: (file: File, fileList: File[]) => any;

    @Event({
      title: '点击文件时',
      description: '点击文件时的钩子',
    })
    onPreview: (file: File) => any;

    @Slot({
      title: '默认内容',
      description: '自定义默认内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '触发内容',
      description: '触发文件选择框的内容',
    })
    slotTrigger: () => Array<ViewComponent>;

    @Slot({
      title: '提示内容',
      description: '提示说明文字',
    })
    slotTip: () => Array<ViewComponent>;
  }
}
