/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      childAccept: true,
      disableSlotAutoFill: [
        {
          slot: 'tip',
          expression: "!this.getAttribute('hasTip')?.value",
        }
      ],
    },
  })
  @Component({
    title: '上传',
    icon: 'uploader',
    description: '上传组件允许用户传输文件或提交自己的内容。',
    group: 'Form',
  })
  export class ElUpload extends ViewComponent {
    constructor(options?: Partial<ElUploadOptions>) {
      super();
    }

    @Method({
      title: '触发选择文件',
      description: '组件实例方法，打开文件选择器',
    })
    handleStart(): void {}

    @Method({
      title: '移除文件',
      description: '移除文件',
    })
    handleRemove(): void {}

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

    @Prop({
      title: '文件列表',
    })
    fileList: nasl.collection.List<{
      name: nasl.core.String;
      percentage?: nasl.core.Decimal;
      status: 'ready' | 'uploading' | 'success' | 'fail';
      size?: nasl.core.Integer;
      response?: any;
      uid: nasl.core.Integer;
      url?: nasl.core.String;
      raw?: any;
    }>;
  }

  export class ElUploadOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '接受上传的文件类型',
      description: '接受上传的文件类型',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '上传地址',
      description: '请求URL',
      setter: { concept: 'InputSetter' },
    })
    action: nasl.core.String;


    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前文件列表',
      sync: true,
      docDescription: '当前的文件列表',
    })
    value: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '转换器',
      description:
        '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: 'JSON',
          },
          {
            title: 'URL字符串',
          },
        ],
      },
    })
    converter: 'json' | 'simple' = 'simple';

    @Prop({
      group: '数据属性',
      title: 'URL 字段',
      description: '请求返回的 URL 字段名',
      docDescription: '请求返回的URL字段名',
    })
    urlField: nasl.core.String = 'url';


    @Prop({
      group: '数据属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '主要属性',
      title: '请求头',
      description: '设置上传的请求头部',
      setter: { concept: 'InputSetter' },
    })
    headers: object;

    @Prop({
      group: '数据属性',
      title: 'HTTP 请求类型',
      description:
        'HTTP 请求类型。可选项：POST/GET/PUT/OPTIONS/PATCH/post/get/put/options/patch',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'POST' },
          { title: 'GET' },
          { title: 'PUT' },
          { title: 'OPTIONS' },
          { title: 'PATCH' },
          { title: 'post' },
          { title: 'get' },
          { title: 'put' },
          { title: 'options' },
          { title: 'patch' },
        ],
      },
    })
    method:
      | 'POST'
      | 'GET'
      | 'PUT'
      | 'OPTIONS'
      | 'PATCH'
      | 'post'
      | 'get'
      | 'put'
      | 'options'
      | 'patch' = 'POST';

    @Prop({
      group: '主要属性',
      title: '启用压缩',
      description:
        '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      docDescription:
        '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    lcapIsCompress: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '源地址访问',
      description: '开启后支持通过文件存储源地址访问文件',
      docDescription: '开启后支持通过文件存储源地址访问文件',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    viaOriginURL: nasl.core.Boolean;

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
      group: '数据属性',
      title: '是否携带Cookie',
      description: '上传请求时是否携带 cookie',
      setter: { concept: 'SwitchSetter' },
    })
    withCredentials: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文件访问策略',
      docDescription: '支持任何人可访问和用户登录后可访问两种方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '任何人可访问' }, { title: '用户登录后可访问' }],
      },
    })
    access: 'public' | 'private';

    @Prop({
      group: '主要属性',
      title: '文件有效期',
      description: '是否开启文件有效期控制',
      docDescription: '支持配置文件自动清理，开启后可自定义上传后有效天数',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ttl: nasl.core.Boolean;


    @Prop<ElUploadOptions, 'ttlValue'>({
      group: '主要属性',
      title: '上传后有效天数',
      description: '文件上传后的有效期天数',
      docDescription: '开启文件有效期开关后显示，可配置文件自动清理的时间',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.ttl === true,
    })
    ttlValue: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '是否启用拖拽上传',
      description: '是否启用拖拽上传',
      setter: { concept: 'SwitchSetter' },
    })
    drag: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示上传提示',
      description: '是否显示上传提示',
      setter: { concept: 'SwitchSetter' },
    })
    hasTip: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否显示已上传文件列表',
      description: '是否显示已上传文件列表',
      setter: { concept: 'SwitchSetter' },
    })
    showFileList: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '文件列表类型',
      description: '文件列表类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'text' },
          { title: 'picture' },
          { title: 'picture-card' },
        ],
      },
    })
    listType: 'text' | 'picture' | 'picture-card' = 'text';

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
    onSuccess: (event: any) => any;

    @Event({
      title: '文件上传失败时',
      description: '文件上传失败时的钩子',
    })
    onError: (event: any) => any;

    @Event({
      title: '文件状态改变时',
      description: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
    })
    onChange: (event: any) => any;

    @Event({
      title: '文件列表移除文件时',
      description: '文件列表移除文件时的钩子',
    })
    onRemove: (event: any) => any;

    @Event({
      title: '点击文件时',
      description: '点击文件时的钩子',
    })
    onPreview: (event: any) => any;

    @Event({
      title: '上传前',
      description: '上传前的钩子',
    })
    onBeforeUpload: (event: any) => any;

    @Event({
      title: '移除文件前',
      description: '移除文件前的钩子',
    })
    onBeforeRemove: (event: any) => any;

    @Slot({
      title: '上传提示',
      description: '上传提示',
    })
    slotTip: () => Array<ViewComponent>;

    @Slot({
      title: '触发内容',
      description: '触发文件选择框的内容',
    })
    slotTrigger: () => Array<ViewComponent>;
  }
}
