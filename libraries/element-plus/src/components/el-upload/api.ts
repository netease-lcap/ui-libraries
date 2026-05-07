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
        },
      ],
      forceUpdateWhenAttributeChange: 'preview',
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

    @Prop({
      title: '禁用',
      description: '是否禁用上传组件',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '预览',
      description: '是否预览',
    })
    preview: nasl.core.Boolean;

    @Method({
      title: '触发选择文件',
      description: '组件实例方法，打开文件选择器',
    })
    handleStart(): void { }

    // @Method({
    //   title: '移除文件',
    //   description: '移除文件',
    // })
    // handleRemove(): void {}

    @Method({
      title: '清空已上传文件列表',
      description: '清空已上传的文件列表',
    })
    clearFiles(): void { }

    @Method({
      title: '取消上传请求',
      description: '取消上传请求',
    })
    abort(): void { }

    @Method({
      title: '手动上传文件列表',
      description: '手动上传文件列表',
    })
    submit(): void { }

    // @Prop({
    //   title: '文件列表',
    // })
    // fileList: nasl.collection.List<{
    //   name: nasl.core.String;
    //   percentage?: nasl.core.Decimal;
    //   status: 'ready' | 'uploading' | 'success' | 'fail';
    //   size?: nasl.core.Integer;
    //   response?: any;
    //   uid: nasl.core.Integer;
    //   url?: nasl.core.String;
    //   raw?: any;
    // }>;
  }

  export class ElUploadOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '文件列表',
      description: '当前上传的文件列表',
      docDescription: '绑定当前上传的文件列表，支持双向绑定。可以获取已上传文件的详细信息。',
      sync: true,
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '数据转换',
      description: '文件列表的数据转换格式',
      docDescription: '控制文件列表的数据格式。JSON：转换为JSON字符串格式；URL字符串：转换为URL字符串格式。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'JSON' }, { title: 'URL字符串' }],
      },
    })
    converter: 'json' | 'simple' = 'simple';

    @Prop({
      group: '数据属性',
      title: 'URL字段',
      description: '服务器返回的URL字段名',
      docDescription: '设置服务器返回的URL字段名，用于从响应中提取文件访问地址。',
    })
    urlField: nasl.core.String = 'filePath';

    @Prop({
      group: '数据属性',
      title: '文件字段名',
      description: '上传时的文件字段名',
      docDescription: '设置上传时的文件字段名，后端需要通过此字段名获取上传的文件。',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '数据属性',
      title: '请求方法',
      description: 'HTTP请求方法',
      docDescription:
        '设置上传请求的HTTP方法。POST：标准上传方法；GET：获取文件；PUT：更新文件；OPTIONS：预检请求；PATCH：部分更新。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'POST' }, { title: 'GET' }, { title: 'PUT' }, { title: 'OPTIONS' }, { title: 'PATCH' }],
      },
    })
    method: 'POST' | 'GET' | 'PUT' | 'OPTIONS' | 'PATCH' | 'post' | 'get' | 'put' | 'options' | 'patch' = 'POST';

    @Prop({
      group: '数据属性',
      title: '携带Cookie',
      description: '上传请求时是否携带Cookie',
      docDescription: '开启后，上传请求会携带浏览器的Cookie信息，用于身份验证等场景。',
      setter: { concept: 'SwitchSetter' },
    })
    withCredentials: nasl.core.Boolean = false;


    @Prop({
      group: '数据属性',
      title: '存储方式',
      description: "",
      bindHide: true,
    })
    fileConnectionGroup: () => any;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '上传地址',
      description: '文件上传的服务器地址',
      docDescription: '设置文件上传的服务器地址URL，支持相对路径和绝对路径。',
      setter: { concept: 'InputSetter' },
    })
    url: nasl.core.String = '/upload';

    @Prop({
      group: '主要属性',
      title: '文件类型',
      description: '允许上传的文件类型',
      docDescription: '设置允许上传的文件类型，支持MIME类型和文件扩展名。例如：image/*、.jpg,.png等。',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '多选文件',
      description: '是否支持同时选择多个文件',
      docDescription: '开启后，用户可以同时选择多个文件进行上传。关闭后，每次只能选择一个文件。',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '拖拽上传',
      description: '是否启用拖拽上传功能',
      docDescription: '开启后，用户可以通过拖拽文件到上传区域来上传文件，提供更便捷的操作方式。',
      setter: { concept: 'SwitchSetter' },
    })
    drag: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '显示文件列表',
      description: '是否显示已上传的文件列表',
      docDescription: '开启后，会显示已上传文件的列表，包括文件名、大小、状态等信息。',
      setter: { concept: 'SwitchSetter' },
    })
    showFileList: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '显示提示',
      description: '是否显示上传提示信息',
      docDescription: '开启后，会显示上传相关的提示信息，帮助用户了解上传规则和操作方式。',
      setter: { concept: 'SwitchSetter' },
    })
    hasTip: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '文件访问策略',
      description: '设置文件的访问权限',
      docDescription: '控制上传文件的访问权限。任何人可访问：文件公开访问；用户登录后可访问：需要登录才能访问。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '任何人可访问' }, { title: '用户登录后可访问' }],
      },
    })
    access: 'public' | 'private';

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '请求头',
      description: '上传请求的头部信息',
      docDescription: '设置上传请求的HTTP头部信息，用于传递认证信息、自定义参数等。',
      setter: { concept: 'InputSetter' },
    })
    headers: object;

    @Prop({
      group: '交互属性',
      title: '额外参数',
      description: '上传时附带的额外参数',
      docDescription: '设置上传时附带的额外参数，以key:value格式传递，用于向服务器发送自定义数据。',
      setter: { concept: 'InputSetter' },
    })
    data: nasl.core.String;

    @Prop({
      group: '交互属性',
      title: '文件压缩',
      description: '是否启用文件压缩上传',
      docDescription: '开启后，上传的文件会按照配置的压缩规则进行压缩后再上传，可以节省存储空间和传输时间。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    lcapIsCompress: nasl.core.Boolean;

    @Prop({
      group: '交互属性',
      title: '源地址访问',
      description: '是否支持通过源地址访问文件',
      docDescription: '开启后，支持通过文件存储的源地址直接访问文件，提供更灵活的文件访问方式。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    viaOriginURL: nasl.core.Boolean;

    @Prop({
      group: '交互属性',
      title: '文件有效期',
      description: '是否启用文件有效期控制',
      docDescription: '开启后，可以设置文件的有效期，过期文件会自动清理，节省存储空间。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ttl: nasl.core.Boolean;

    @Prop<ElUploadOptions, 'ttlValue'>({
      group: '交互属性',
      title: '有效期天数',
      description: '文件上传后的有效期天数',
      docDescription: '设置文件上传后的有效期天数，超过此时间文件会被自动清理。仅在开启文件有效期时有效。',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.ttl === true,
    })
    ttlValue: nasl.core.Decimal;

    // ========== 关于尺寸大小、间距、边框、颜色的设置 ==========

    @Prop({
      group: '交互属性',
      title: '删除图标',
      description: '自定义删除图标',
      setter: { concept: 'IconSetter', customIconFont: 'LCAP_ELEMENTPLUS_ICONS' },
    })
    deleteIcon: nasl.core.String = 'Close';

    @Prop({
      group: '样式属性',
      title: '文件数量限制',
      description: '限制上传文件的最大数量',
      docDescription: '设置允许上传文件的最大数量，超过此数量时会阻止继续上传。',
      setter: { concept: 'NumberInputSetter' },
    })
    limit: nasl.core.Decimal;

    @Prop({
      group: '样式属性',
      title: '文件大小限制',
      description: '限制单个文件的最大大小',
      docDescription: '设置单个文件的最大大小限制，单位为MB。超过此大小的文件会被拒绝上传。',
      setter: { concept: 'NumberInputSetter' },
    })
    fileSizeLimit: nasl.core.Decimal;

    @Prop({
      group: '主要属性',
      title: '文件列表类型',
      description: '文件列表类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '文本' }, { title: '图片' }, { title: '图片卡片' }],
      },
    })
    listType: 'text' | 'picture' | 'picture-card' = 'text';

    @Prop({
      group: '主要属性',
      title: '文件校验',
      description: '文件校验函数，可自定义校验规则，如文件名称包含特殊字符等，返回string类型的出错信息',
      docDescription: '文件校验函数，可自定义校验规则，如文件名称包含特殊字符等，返回string类型的出错信息',
      setter: {
        concept: 'AnonymousFunctionSetter',
      },
      bindOpen: true,
    })
    checkFile: (fileInfo: nasl.io.FileInfo) => nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '是否自动上传',
      description: '是否在选取文件后立即进行上传',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Prop<ElUploadOptions, 'triggerUploadText'>({
      group: '主要属性',
      title: '上传按钮文本',
      description: '上传按钮文本',
      setter: { concept: 'InputSetter' },
      if: (_) => _.autoUpload !== true,
    })
    triggerUploadText: nasl.core.String = '上传到服务器';

    @Prop<ElUploadOptions, 'showUploadButton'>({
      group: '主要属性',
      title: '是否显示上传按钮',
      description: '是否显示上传按钮',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.autoUpload !== true,
    })
    showUploadButton: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用上传组件',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '预览',
      description: '是否预览',
      setter: { concept: 'SwitchSetter' },
    })
    preview: nasl.core.Boolean = false;

    @Event({
      title: '文件上传成功时',
      description: '文件上传成功时的钩子',
    })
    onSuccess: (event: {
      filePath: nasl.core.String;
      msg: nasl.core.String;
      result: nasl.core.String;
      success: nasl.core.Boolean;
    }) => any;

    @Event({
      title: '文件上传失败时',
      description: '文件上传失败时的钩子',
    })
    onError: (event: any) => any;

    @Event({
      title: '文件状态改变时',
      description: '文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用',
    })
    onChange: (event: {
      name:nasl.core.String;
      percentage:nasl.core.Decimal;
      status:'ready' | 'uploading' | 'success' | 'fail';
      raw:nasl.io.File;
    }) => any;

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
    onBeforeRemove: () => any;

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

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
      translateBindingProperty: ['hasTip'],
      forceRefresh: 'parent',
      forceUpdateWhenAttributeChange: true,
      additionalAttribute: {
        ':isRequired': {
          condition:
            "(!this.getAttribute('isRequired')?.value) && (this.getAttribute('rules')?.rules || []).find(r => r.calleeName === 'filled')",
          value: '"true"',
        },
      },
      disableSlotAutoFill: [
        {
          slot: 'tip',
          expression: "!this.getAttribute('hasTip')?.value",
        },
      ],
    },
    extends: [
      {
        name: 'ElUpload',
      },
      {
        name: 'ElFormItemPro',
        excludes: ['slotDefault'],
      },
    ],
  })
  @Component({
    title: '表单上传组件',
    description: '表单上传组件',
    group: 'Form',
  })
  export class ElFormUpload extends ViewComponent {
    constructor(
      options?: Partial<ElFormUploadOptions & ElFormItemProOptions & Omit<ElUploadOptions, keyof ElFormItemProOptions>>,
    ) {
      super();
    }
  }

  export class ElFormUploadOptions extends ViewComponentOptions { }
}
