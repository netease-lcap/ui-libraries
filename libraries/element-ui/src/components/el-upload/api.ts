/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: false,
  })
  @Component({
    title: '上传',
    icon: 'uploader',
    description: '通过点击或者拖拽上传文件',
    group: 'Form',
  })
  export class ElUpload extends ViewComponent {
    constructor(options?: Partial<ElUploadOptions>) {
      super();
    }

    @Method({
      title: '清空已上传的文件列表',
      description:
        '清空已上传的文件列表（该方法不支持在 before-upload 中调用）',
    })
    clearFiles(): any {}

    @Method({
      title: '手动上传文件列表',
      description: '手动上传文件列表',
    })
    submit(): any {}
  }

  export class ElUploadOptions extends ViewComponentOptions {
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
      title: '上传地址',
      description: '上传的 URL 地址',
      docDescription: '文件上传的URL地址，如/upload',
    })
    url: nasl.core.String;


    @Prop({
      group: '数据属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      docDescription: '默认file，支持自定义，后端通过该字段获取文件',
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '数据属性',
      title: '支持上传的文件类型',
      description: '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      docDescription: '支持对上传的文件类型进行限制，格式为“.后缀名”，如“.jpeg”表示仅支持上传jpeg格式的文件。多个文件类型时需使用英文逗号隔开，如“.jpeg,.png,.gif”表示仅支持上传jpeg、png、gif格式的文件。若为空值，则支持上传所有类型的文件',
      setter: {
          concept: 'InputSetter',
          placeholder: '所有类型',
      },
    })
    accept: nasl.core.String;


    @Prop({
      group: '数据属性',
      title: 'cookie值',
      description: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      docDescription: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    withCredentials: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '附加数据',
      docDescription: '补充描述',
    })
    data: object;

    @Prop({
      group: '数据属性',
      title: '列表数量上限',
      docDescription: '列表数量上限，默认为999',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    limit: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '最大文件大小',
      description: '可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`',
      docDescription: '可上传的最大文件大小。默认50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位kB、MB、GB',
      implicitToString: true,
    })
    maxSize: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: 'URL 字段',
      description: '请求返回的 URL 字段名',
      docDescription: '请求返回的URL字段名',
    })
    urlField: nasl.core.String = 'url';

    @Prop({
      group: '数据属性',
      title: '请求头部',
      description: '设置上传的请求头部',
      setter: { concept: 'InputSetter' },
    })
    headers: object;

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
    converter: 'json' | 'simple' = 'json';

    @Prop({
      group: '主要属性',
      title: '显示文件列表',
      description: '是否显示已上传文件列表',
      setter: { concept: 'SwitchSetter' },
    })
    showFileList: nasl.core.Boolean = true;

    @Prop<ElUploadOptions, 'listType'>({
      group: '主要属性',
      title: '列表类型',
      description: '文件列表的类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '文本' },
          { title: '图片' },
          { title: '卡片' },
        ],
      },
      if: (_) => _.showFileList,
    })
    listType: 'text' | 'picture' | 'picture-card' = 'text';

    @Prop({
      group: '主要属性',
      title: '多选文件',
      description: '是否支持多选文件',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean;

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
        if: _ => _.ttl === true,
    })
    ttlValue: nasl.core.Decimal;

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
        title: '启用压缩',
        description: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
        docDescription: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
        setter: {
            concept: 'SwitchSetter',
        },
    })
    lcapIsCompress: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '拖拽上传',
      description: '是否启用拖拽上传',
      setter: { concept: 'SwitchSetter' },
    })
    drag: nasl.core.Boolean = false;

    @Prop<ElUploadOptions, 'dragTipText'>({
      group: '主要属性',
      title: '提示文案',
      description: '拖拽上传提示文案',
      setter: { concept: 'InputSetter' },
      if: (_) => _.drag,
    })
    dragTipText: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '自动上传',
      description: '是否在选取文件后立即进行上传',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Event({
      title: '上传前',
      description: '上传前触发',
    })
    onBeforeUpload: (event: { file: File }) => any;

    @Event({
      title: '进度改变时',
      description: '发送进度改变时触发，在上传进度条时使用',
    })
    onProgress: (event: { file: File }) => any;

    @Event({
      title: '文件数量超额',
      description: '文件数量超额时触发',
    })
    onCountExceed: (event: {
      files: nasl.collection.List<File>;
      allFileList: nasl.collection.List<File>;
    }) => any;

    // @Event({
    //   title: '文件大小超额',
    //   description: '文件大小超额时触发',
    // })
    // onSizeExceed: (event: {
    //   maxSize: nasl.core.Decimal;
    //   size: nasl.core.Decimal;
    //   message: nasl.core.String;
    //   name: nasl.core.String;
    //   file: File;
    // }) => any;

    @Event({
      title: '上传成功时',
      description: '上传成功时触发',
    })
    onSuccess: (event: { file: File; fileList: nasl.collection.List<File> }) => any;

    @Event({
      title: '上传错误时',
      description: '上传报错时触发',
    })
    onError: (event: { file: File; fileList: nasl.collection.List<File> }) => any;

    @Event({
      title: '删除时',
      description: '点击删除按钮时触发',
    })
    onRemove: (event: {
      file: File,
      fileList: nasl.collection.List<File>,
    }) => any;

    @Slot({
      title: 'Default',
      description: '触发文件选择框的内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
