/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    show: true,
  })
  @Component({
    title: '上传',
    icon: 'upload',
    description: '',
    group: 'Form',
  })
  export class ElUploadPro extends ViewComponent {
    constructor(options?: Partial<ElUploadProOptions>) {
      super();
    }
  }

  export class ElUploadProOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'Abridge Name',
      description:
        '文件名过长时，需要省略中间的文本，保留首尾文本。示例：[10, 7]，表示首尾分别保留的文本长度。',
      setter: { concept: 'InputSetter' },
    })
    abridgeName: any[];

    @Prop({
      group: '主要属性',
      title: 'Accept',
      description: '接受上传的文件类型，',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Action',
      description:
        '上传接口。设接口响应数据为字段 `response`，那么 `response.error` 存在时会判断此次上传失败，并显示错误文本信息；`response.url` 会作为文件上传成功后的地址，并使用该地址显示图片或文件',
      setter: { concept: 'InputSetter' },
    })
    action: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Allow Upload Duplicate File',
      description: '是否允许重复上传相同文件名的文件',
      setter: { concept: 'SwitchSetter' },
    })
    allowUploadDuplicateFile: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Auto Upload',
      description: '是否在选择文件后自动发起请求上传文件',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Before All Files Upload',
      description:
        '如果是自动上传模式 `autoUpload=true`，表示全部文件上传之前的钩子函数，函数参数为上传的文件，函数返回值决定是否继续上传，若返回值为 `false` 则终止上传。<br/>如果是非自动上传模式 `autoUpload=false`，则函数返回值为 `false` 时表示本次选中的文件不会加入到文件列表中，即不触发 `onChange` 事件。',
      setter: { concept: 'InputSetter' },
    })
    beforeAllFilesUpload: any;

    @Prop({
      group: '主要属性',
      title: 'Before Upload',
      description:
        '如果是自动上传模式 `autoUpload=true`，表示单个文件上传之前的钩子函数，若函数返回值为 `false` 则表示不上传当前文件。<br/>如果是非自动上传模式 `autoUpload=false`，函数返回值为 `false` 时表示从上传文件中剔除当前文件。',
      setter: { concept: 'InputSetter' },
    })
    beforeUpload: any;

    @Prop({
      group: '主要属性',
      title: 'Cancel Upload Button',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“取消上传”按钮属性。',
      setter: { concept: 'InputSetter' },
    })
    cancelUploadButton: any;

    @Prop({
      group: '主要属性',
      title: 'Data',
      description:
        '上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。`autoUpload=true` 时有效。也可以使用 `formatRequest` 完全自定义上传请求的字段。',
      setter: { concept: 'InputSetter' },
    })
    data: object;

    @Prop({
      group: '主要属性',
      title: 'Default',
      description:
        '非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域。',
      setter: { concept: 'InputSetter' },
    })
    default: any;

    @Prop({
      group: '主要属性',
      title: 'Disabled',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Drag Content',
      description:
        '用于自定义拖拽区域，`theme=custom` 且 `draggable=true` 时有效。',
      setter: { concept: 'InputSetter' },
    })
    dragContent: any;

    @Prop({
      group: '主要属性',
      title: 'Draggable',
      description:
        '是否启用拖拽上传，不同的组件风格默认值不同。`theme=file` 或 `theme=image` 时有效',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: 'Files',
      description: '已上传文件列表，同 `value`。',
      setter: { concept: 'InputSetter' },
    })
    files: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Files',
      description: '已上传文件列表，同 `value`。',
      setter: { concept: 'InputSetter' },
    })
    defaultFiles: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Format',
      description:
        '转换文件 `UploadFile` 的数据结构，可新增或修改 `UploadFile` 的属性，注意不能删除 `UploadFile` 属性。`action` 存在时有效。',
      setter: { concept: 'InputSetter' },
    })
    format: any;

    @Prop({
      group: '主要属性',
      title: 'Format Request',
      description:
        '用于新增或修改文件上传请求 参数。`action` 存在时有效。一个请求上传一个文件时，默认请求字段有 `file`。<br/>一个请求上传多个文件时，默认字段有 `file[0]/file[1]/file[2]/.../length`，其中 `length` 表示本次上传的文件数量。<br/>⚠️非常注意，此处的 `file[0]/file[1]` 仅仅是一个字段名，并非表示 `file` 是一个数组，接口获取字段时注意区分。<br/>可以使用 `name` 定义 `file` 字段的别名。<br/>也可以使用 `formatRequest` 自定义任意字段，如添加一个字段 `fileList` ，存储文件数组。',
      setter: { concept: 'InputSetter' },
    })
    formatRequest: any;

    @Prop({
      group: '主要属性',
      title: 'Format Response',
      description:
        '用于格式化文件上传后的接口响应数据，`response` 便是接口响应的原始数据。`action` 存在时有效。<br/> 示例返回值：`{ error, url, status, files }` <br/> 此函数的返回值 `error` 会作为错误文本提醒，表示上传失败的原因，如果存在会判定为本次上传失败。<br/> 此函数的返回值 `url` 会作为单个文件上传成功后的链接。<br/> `files` 表示一个请求同时上传多个文件后的文件列表。',
      setter: { concept: 'InputSetter' },
    })
    formatResponse: any;

    @Prop({
      group: '主要属性',
      title: 'Headers',
      description: '设置上传的请求头部，`action` 存在时有效。',
      setter: { concept: 'InputSetter' },
    })
    headers: object;

    @Prop({
      group: '主要属性',
      title: 'Image Viewer Props',
      description: '透传图片预览组件全部属性。',
      setter: { concept: 'InputSetter' },
    })
    imageViewerProps: object;

    @Prop({
      group: '主要属性',
      title: 'Input Attributes',
      description: '用于添加属性到 HTML 元素 `input`。',
      setter: { concept: 'InputSetter' },
    })
    inputAttributes: object;

    @Prop({
      group: '主要属性',
      title: 'Is Batch Upload',
      description:
        '多个文件是否作为一个独立文件包，整体替换，整体删除。不允许追加文件，只允许替换文件。`theme=file-flow` 时有效',
      setter: { concept: 'SwitchSetter' },
    })
    isBatchUpload: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Locale',
      description:
        '上传组件文本语言配置，支持自定义配置组件中的全部文本。优先级高于全局配置中语言。',
      setter: { concept: 'InputSetter' },
    })
    locale: object;

    @Prop({
      group: '主要属性',
      title: 'Max',
      description:
        '用于控制文件上传数量，值为 0 则不限制。注意，单文件上传场景，请勿设置 `max` 属性',
      setter: { concept: 'NumberInputSetter' },
    })
    max: nasl.core.Decimal = 0;

    @Prop({
      group: '主要属性',
      title: 'Method',
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
      title: 'Mock Progress Duration',
      description:
        '模拟进度间隔时间，单位：毫秒，默认：300。由于原始的上传请求，小文件上传进度只有 0 和 100，故而新增模拟进度，每间隔 `mockProgressDuration` 毫秒刷新一次模拟进度。小文件设置小一点，大文件设置大一点。注意：当 `useMockProgress` 为真时，当前设置有效',
      setter: { concept: 'NumberInputSetter' },
    })
    mockProgressDuration: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: 'Multiple',
      description: '支持多文件上传',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Name',
      description: '文件上传时的名称',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '主要属性',
      title: 'Placeholder',
      description: '占位符',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: 'Request Method',
      description:
        '自定义上传方法。返回值 `status` 表示上传成功或失败；`error` 或 `response.error` 表示上传失败的原因；<br/>`response` 表示请求上传成功后的返回数据，`response.url` 表示上传成功后的图片/文件地址，`response.files` 表示一个请求上传多个文件/图片后的返回值。<br/>示例一：`{ status: "fail", error: "上传失败", response }`。<br/>示例二：`{ status: "success", response: { url: "https://tdesign.gtimg.com/site/avatar.jpg" } }`。<br/> 示例三：`{ status: "success", files: [{ url: "https://xxx.png", name: "xxx.png" }]}`。',
      setter: { concept: 'InputSetter' },
    })
    requestMethod: any;

    @Prop({
      group: '主要属性',
      title: 'Show Image File Name',
      description: '是否显示图片的文件名称',
      setter: { concept: 'SwitchSetter' },
    })
    showImageFileName: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Show Thumbnail',
      description: '是否在文件列表中显示缩略图，`theme=file-flow` 时有效',
      setter: { concept: 'SwitchSetter' },
    })
    showThumbnail: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Show Upload Progress',
      description: '是否显示上传进度',
      setter: { concept: 'SwitchSetter' },
    })
    showUploadProgress: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Size Limit',
      description:
        '图片文件大小限制，默认单位 KB。可选单位有：`"B" | "KB" | "MB" | "GB"`。示例一：`1000`。示例二：`{ size: 2, unit: "MB", message: "图片大小不超过 {sizeLimit} MB" }`。',
      setter: { concept: 'InputSetter' },
    })
    sizeLimit: nasl.core.Decimal | object;

    @Prop({
      group: '主要属性',
      title: 'Status',
      description:
        '文件上传提示文本状态。可选项：default/success/warning/error',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'default' },
          { title: 'success' },
          { title: 'warning' },
          { title: 'error' },
        ],
      },
    })
    status: 'default' | 'success' | 'warning' | 'error';

    @Prop({
      group: '主要属性',
      title: 'Theme',
      description:
        '组件风格。custom 表示完全自定义风格；file 表示默认文件上传风格；file-input 表示输入框形式的文件上传；file-flow 表示文件批量上传；image 表示默认图片上传风格；image-flow 表示图片批量上传。可选项：custom/file/file-input/file-flow/image/image-flow',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'custom' },
          { title: 'file' },
          { title: 'file-input' },
          { title: 'file-flow' },
          { title: 'image' },
          { title: 'image-flow' },
        ],
      },
    })
    theme:
      | 'custom'
      | 'file'
      | 'file-input'
      | 'file-flow'
      | 'image'
      | 'image-flow' = 'file';

    @Prop({
      group: '主要属性',
      title: 'Tips',
      description: '组件下方文本提示，可以使用 `status` 定义文本。',
      setter: { concept: 'InputSetter' },
    })
    tips: any;

    @Prop({
      group: '主要属性',
      title: 'Trigger Button Props',
      description: '透传选择按钮全部属性。',
      setter: { concept: 'InputSetter' },
    })
    triggerButtonProps: object;

    @Prop({
      group: '主要属性',
      title: 'Upload All Files In One Request',
      description:
        '是否在同一个请求中上传全部文件，默认一个请求上传一个文件。多文件上传时有效',
      setter: { concept: 'SwitchSetter' },
    })
    uploadAllFilesInOneRequest: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: 'Upload Button',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“点击上传”按钮属性。',
      setter: { concept: 'InputSetter' },
    })
    uploadButton: any;

    @Prop({
      group: '主要属性',
      title: 'Upload Pasted Files',
      description: '是否允许粘贴上传剪贴板中的文件',
      setter: { concept: 'SwitchSetter' },
    })
    uploadPastedFiles: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Use Mock Progress',
      description:
        '是否在请求时间超过 300ms 后显示模拟进度。上传进度有模拟进度和真实进度两种。一般大小的文件上传，真实的上传进度只有 0 和 100，不利于交互呈现，因此组件内置模拟上传进度。真实上传进度一般用于大文件上传。',
      setter: { concept: 'SwitchSetter' },
    })
    useMockProgress: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: 'Value',
      description: '已上传文件列表，同 `files`。',
      setter: { concept: 'InputSetter' },
    })
    value: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'Default Value',
      description: '已上传文件列表，同 `files`。',
      setter: { concept: 'InputSetter' },
    })
    defaultValue: any[] = [];

    @Prop({
      group: '主要属性',
      title: 'With Credentials',
      description: '上传请求时是否携带 cookie',
      setter: { concept: 'SwitchSetter' },
    })
    withCredentials: nasl.core.Boolean = false;

    @Event({
      title: 'On Cancel Upload',
      description: '点击「取消上传」时触发',
    })
    onCancelUpload: (event: any) => any;

    @Event({
      title: 'On Change',
      description:
        '已上传文件列表发生变化时触发，`trigger` 表示触发本次的来源。',
    })
    onChange: (event: any) => any;

    @Event({
      title: 'On Dragenter',
      description: '进入拖拽区域时触发',
    })
    onDragenter: (event: any) => any;

    @Event({
      title: 'On Dragleave',
      description: '离开拖拽区域时触发',
    })
    onDragleave: (event: any) => any;

    @Event({
      title: 'On Drop',
      description: '拖拽结束时触发',
    })
    onDrop: (event: any) => any;

    @Event({
      title: 'On Fail',
      description:
        '上传失败后触发。`response` 指接口响应结果，`response.error` 会作为错误文本提醒。如果希望判定为上传失败，但接口响应数据不包含 `error` 字段，可以使用 `formatResponse` 格式化 `response` 数据结构。如果是多文件多请求上传场景，请到事件 `onOneFileFail` 中查看 `response`。',
    })
    onFail: (event: any) => any;

    @Event({
      title: 'On One File Fail',
      description:
        '多文件/图片场景下，单个文件上传失败后触发，如果一个请求上传一个文件，则会触发多次。单文件/图片不会触发',
    })
    onOneFileFail: (event: any) => any;

    @Event({
      title: 'On One File Success',
      description:
        '单个文件上传成功后触发，在多文件场景下会触发多次。`context.file` 表示当前上传成功的单个文件，`context.response` 表示上传请求的返回数据',
    })
    onOneFileSuccess: (event: any) => any;

    @Event({
      title: 'On Preview',
      description: '点击图片预览时触发，文件没有预览',
    })
    onPreview: (event: any) => any;

    @Event({
      title: 'On Progress',
      description:
        '上传进度变化时触发，真实进度和模拟进度都会触发。<br/>⚠️ 原始上传请求，小文件的上传进度只有 0 和 100，故而不会触发 `progress` 事件；只有大文件才有真实的中间进度。如果你希望很小的文件也显示上传进度，保证 `useMockProgress=true` 的情况下，设置 `mockProgressDuration` 为更小的值。<br/>参数 `options.type=real` 表示真实上传进度，`options.type=mock` 表示模拟上传进度。',
    })
    onProgress: (event: any) => any;

    @Event({
      title: 'On Remove',
      description: '移除文件时触发。',
    })
    onRemove: (event: any) => any;

    @Event({
      title: 'On Select Change',
      description: '选择文件或图片之后，上传之前，触发该事件。',
    })
    onSelectChange: (event: any) => any;

    @Event({
      title: 'On Success',
      description:
        '上传成功后触发。<br/>`context.currentFiles` 表示当次请求上传的文件（无论成功或失败），`context.fileList` 表示上传成功后的文件，`context.response` 表示上传请求的返回数据。<br/>`context.results` 表示单次选择全部文件上传成功后的响应结果，可以在这个字段存在时提醒用户上传成功或失败。<br />。',
    })
    onSuccess: (event: any) => any;

    @Event({
      title: 'On Validate',
      description:
        '文件上传校验结束事件，文件数量超出、文件大小超出限制、文件同名、`beforeAllFilesUpload` 返回值为假、`beforeUpload` 返回值为假等场景会触发。<br/>注意：如果设置允许上传同名文件，即 `allowUploadDuplicateFile=true`，则不会因为文件重名触发该事件。<br/>结合 `status` 和 `tips` 可以在组件中呈现不同类型的错误（或告警）提示。',
    })
    onValidate: (event: any) => any;

    @Event({
      title: 'On Waiting Upload Files Change',
      description:
        '待上传文件列表发生变化时触发。`context.files` 表示事件参数为待上传文件，`context.trigger` 引起此次变化的触发来源',
    })
    onWaitingUploadFilesChange: (event: any) => any;

    @Slot({
      title: 'Cancel Upload Button',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“取消上传”按钮属性。',
    })
    slotCancelUploadButton: () => Array<ViewComponent>;

    @Slot({
      title: 'Default',
      description:
        '非拖拽场景，指触发上传的元素，如：“选择文件”。如果是拖拽场景，则是指拖拽区域。',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: 'Drag Content',
      description:
        '用于自定义拖拽区域，`theme=custom` 且 `draggable=true` 时有效。',
    })
    slotDragContent: () => Array<ViewComponent>;

    @Slot({
      title: 'File List Display',
      description: '用于完全自定义文件列表界面内容(UI)，单文件和多文件均有效。',
    })
    slotFileListDisplay: () => Array<ViewComponent>;

    @Slot({
      title: 'Tips',
      description: '组件下方文本提示，可以使用 `status` 定义文本。',
    })
    slotTips: () => Array<ViewComponent>;

    @Slot({
      title: 'Trigger',
      description: '触发上传的元素，`files` 指本次显示的全部文件。',
    })
    slotTrigger: () => Array<ViewComponent>;

    @Slot({
      title: 'Upload Button',
      description:
        '批量文件/图片上传，`autoUpload=false` 场景下，透传“点击上传”按钮属性。',
    })
    slotUploadButton: () => Array<ViewComponent>;
  }
}
