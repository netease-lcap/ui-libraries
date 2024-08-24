/// <reference types="@nasl/types" />

namespace nasl.ui {
  interface UploadFile {
    /**
     * 上一次变更的时间
     */
    lastModified?: number;
    /**
     * 文件名称
     * @default ''
     */
    name?: string;
    /**
     * 下载进度
     */
    percent?: number;
    /**
     * 原始文件对象
     */
    raw?: File;
    /**
     * 上传接口返回的数据
     */
    response?: { [key: string]: any };
    /**
     * 文件大小
     */
    size?: number;
    /**
     * 文件上传状态：上传成功，上传失败，上传中，等待上传
     * @default ''
     */
    status?: 'success' | 'fail' | 'progress' | 'waiting';
    /**
     * 文件类型
     * @default ''
     */
    type?: string;
    /**
     * 上传时间
     */
    uploadTime?: string;
    /**
     * 文件上传成功后的下载/访问地址
     * @default ''
     */
    url?: string;
  }

  interface UploadFailContext {
    failedFiles: nasl.collection.List<UploadFile>;
    currentFiles: nasl.collection.List<UploadFile>;
    response?: any;
    file: UploadFile;
  }

  export interface SuccessContext {
    file?: UploadFile;
    files?: nasl.collection.List<UploadFile>;
  }

  @IDEExtraInfo({
    show: true,
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '上传',
    icon: 'uploader',
    description: '上传组件允许用户传输文件或提交自己的内容。',
    group: 'Form',
  })
  export class ElUploadPro extends ViewComponent {
    @Method({
      title: '触发选择文件',
      description: '组件实例方法，打开文件选择器',
    })
    triggerUpload(): void {}

    @Method({
      title: '手动触发上传未成功上传过的所有文件',
      description: '默认上传未成功上传过的所有文件',
    })
    uploadFiles(): void {}

    constructor(options?: Partial<ElUploadProOptions>) {
      super();
    }
  }

  export class ElUploadProOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '支持上传的文件类型',
      description:
        '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      tooltipLink:
        'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/06.%E8%A1%A8%E5%8D%95/150.%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.html#%E7%BB%84%E4%BB%B6%E8%AF%B4%E6%98%8E',
      docDescription:
        '支持对上传的文件类型进行限制，格式为“.后缀名”，如“.jpeg”表示仅支持上传jpeg格式的文件。多个文件类型时需使用英文逗号隔开，如“.jpeg,.png,.gif”表示仅支持上传jpeg、png、gif格式的文件。若为空值，则支持上传所有类型的文件',
      setter: {
        concept: 'InputSetter',
        placeholder: '所有类型',
      },
    })
    accept: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '上传地址',
      description: '文件上传的URL地址，如/upload',
      setter: { concept: 'InputSetter' },
    })
    action: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前文件列表',
      sync: true,
      docDescription: '当前的文件列表',
      settable: true,
    })
    value: nasl.core.String;

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
      group: '数据属性',
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
      group: '数据属性',
      title: '是否携带Cookie',
      description: '上传请求时是否携带 cookie',
      setter: { concept: 'SwitchSetter' },
    })
    withCredentials: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '附加数据',
      description:
        '上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。`autoUpload=true` 时有效。也可以使用 `formatRequest` 完全自定义上传请求的字段。',
      setter: { concept: 'InputSetter' },
    })
    data: object;

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

    @Prop<ElUploadProOptions, 'ttlValue'>({
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
      title: '类型',
      description:
        '组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传。可选项：custom/file/file-input/file-flow/image/image-flow',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '默认' },
          { title: '输入框形式的文件上传' },
          { title: '文件批量上传' },
          { title: '图片上传风格' },
          { title: '图片批量上传' },
          { title: '自定义' },
        ],
      },
    })
    theme:
      | 'file'
      | 'file-input'
      | 'file-flow'
      | 'image'
      | 'image-flow'
      | 'custom' = 'file';

    @Prop({
      group: '主要属性',
      title: '自动上传',
      description: '是否在选择文件后自动发起请求上传文件',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Prop<ElUploadProOptions, 'multiple'>({
      group: '主要属性',
      title: '多文件上传',
      description: '支持多文件上传',
      setter: { concept: 'SwitchSetter' },
      onChange: [
        {
          clear: ['max'],
          if: (_) => !_,
        },
      ],
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '启用拖拽上传',
      description:
        '是否启用拖拽上传，不同的组件风格默认值不同。`theme=file` 或 `theme=image` 时有效',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '允许重复上传相同文件名的文件',
      description: '是否允许重复上传相同文件名的文件',
      setter: { concept: 'SwitchSetter' },
    })
    allowUploadDuplicateFile: nasl.core.Boolean = false;

    @Prop<ElUploadProOptions, 'max'>({
      group: '主要属性',
      title: '最大上传文件数量',
      description: '用于控制文件上传数量，值为 0 则不限制',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.multiple,
    })
    max: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: '最大文件大小',
      description:
        '可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`',
      setter: { concept: 'InputSetter' },
    })
    sizeLimitStr: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '省略文件名中间文本',
      description:
        '文件名过长时，需要省略中间的文本，保留首尾文本。示例：[10, 7]，表示首尾分别保留的文本长度。',
      setter: { concept: 'InputSetter' },
    })
    abridgeName: nasl.collection.List<nasl.core.Integer>;

    @Prop({
      group: '主要属性',
      title: '所有文件上传前设置',
      description:
        '如果是自动上传模式 `autoUpload=true`，表示全部文件上传之前的钩子函数，函数参数为上传的文件，函数返回值决定是否继续上传，若返回值为 `false` 则终止上传。如果是非自动上传模式 `autoUpload=false`，则函数返回值为 `false` 时表示本次选中的文件不会加入到文件列表中，即不触发 `onChange` 事件。',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    beforeAllFilesUpload: (
      fileList: nasl.collection.List<UploadFile>,
    ) => nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '文件上传前设置',
      description:
        '如果是自动上传模式 `autoUpload=true`，表示单个文件上传之前的钩子函数，若函数返回值为 `false` 则表示不上传当前文件。如果是非自动上传模式 `autoUpload=false`，函数返回值为 `false` 时表示从上传文件中剔除当前文件。',
      setter: { concept: 'AnonymousFunctionSetter' },
    })
    beforeUpload: (file: UploadFile) => nasl.core.Boolean;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop<ElUploadProOptions, 'showImageFileName'>({
      group: '主要属性',
      title: '显示图片的文件名称',
      description: '是否显示图片的文件名称',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.theme === 'image' || _.theme === 'image-flow',
    })
    showImageFileName: nasl.core.Boolean = true;

    @Prop<ElUploadProOptions, 'showThumbnail'>({
      group: '主要属性',
      title: '显示缩略图',
      description: '是否在文件列表中显示缩略图',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.theme === 'file-flow',
    })
    showThumbnail: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示上传进度',
      description: '是否显示上传进度',
      setter: { concept: 'SwitchSetter' },
    })
    showUploadProgress: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '允许粘贴上传',
      description: '是否允许粘贴上传剪贴板中的文件',
      setter: { concept: 'SwitchSetter' },
    })
    uploadPastedFiles: nasl.core.Boolean = true;

    @Event({
      title: '点击取消上传时',
      description: '点击「取消上传」时触发',
    })
    onCancelUpload: (event: {}) => any;

    // @Event({
    //   title: '已上传文件列表改变时',
    //   description:
    //     '已上传文件列表发生变化时触发，`trigger` 表示触发本次的来源。',
    // })
    // onChange: (event: {}) => any;

    @Event({
      title: '上传失败后',
      description:
        '上传失败后触发。`response` 指接口响应结果，`response.error` 会作为错误文本提醒。如果希望判定为上传失败，但接口响应数据不包含 `error` 字段，可以使用 `formatResponse` 格式化 `response` 数据结构。如果是多文件多请求上传场景，请到事件 `onOneFileFail` 中查看 `response`。',
    })
    onFail: (event: UploadFailContext) => any;

    @Event({
      title: '单个文件上传失败后',
      description:
        '多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发',
    })
    onOneFileFail: (event: UploadFailContext) => any;

    @Event({
      title: '单个文件上传成功后',
      description:
        '单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据',
    })
    onOneFileSuccess: (event: Pick<SuccessContext, 'file'>) => any;

    @Event({
      title: '上传成功后',
      description:
        '上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件（无论成功或失败），`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br />。',
    })
    onSuccess: (event: SuccessContext) => any;

    @Event({
      title: '点击图片预览时',
      description: '点击图片预览时触发，文件没有预览',
    })
    onPreview: (event: { file: UploadFile; index: nasl.core.Integer }) => any;

    @Event({
      title: '移除文件时',
      description: '移除文件时触发。',
    })
    onRemove: (event: { index: nasl.core.Integer; file: UploadFile }) => any;

    @Event({
      title: '选择文件后',
      description: '选择文件或图片之后，上传之前，触发该事件。',
    })
    onSelectChange: (event: nasl.collection.List<File>) => any;

    @Event({
      title: '文件上传校验结束时',
      description:
        '文件上传校验结束事件，文件数量超出、文件大小超出限制、文件同名、`beforeAllFilesUpload` 返回值为假、`beforeUpload` 返回值为假等场景会触发。<br/>注意：如果设置允许上传同名文件，即 `allowUploadDuplicateFile=true`，则不会因为文件重名触发该事件。<br/>结合 `status` 和 `tips` 可以在组件中呈现不同类型的错误（或告警）提示。',
    })
    onValidate: (event: {
      type:
        | 'FILE_OVER_SIZE_LIMIT'
        | 'FILES_OVER_LENGTH_LIMIT'
        | 'FILTER_FILE_SAME_NAME'
        | 'BEFORE_ALL_FILES_UPLOAD'
        | 'CUSTOM_BEFORE_UPLOAD';
      files: nasl.collection.List<UploadFile>;
    }) => any;

    @Event({
      title: '待上传文件列表变化时',
      description:
        '待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源',
    })
    onWaitingUploadFilesChange: (event: {
      files: nasl.collection.List<UploadFile>;
      trigger: 'validate' | 'remove' | 'uploaded';
    }) => any;

    @Slot({
      title: '取消上传按钮',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“取消上传”按钮属性。',
    })
    slotCancelUploadButton: () => Array<ViewComponent>;

    @Slot({
      title: '上传元素',
      description:
        '非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域。',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '拖拽区域',
      description:
        '用于自定义拖拽区域，`theme=custom` 且 `draggable=true` 时有效。',
    })
    slotDragContent: () => Array<ViewComponent>;

    @Slot({
      title: '文件列表展示',
      description: '用于完全自定义文件列表界面内容(UI)，单文件和多文件均有效。',
    })
    slotFileListDisplay: () => Array<ViewComponent>;

    @Slot({
      title: '触发上传的元素',
      description: '触发上传的元素，`files` 指本次显示的全部文件。',
    })
    slotTrigger: () => Array<ViewComponent>;

    @Slot({
      title: '上传按钮',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“点击上传”按钮属性。',
    })
    slotUploadButton: () => Array<ViewComponent>;
  }
}
