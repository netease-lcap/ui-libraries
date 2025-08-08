/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 2,
    ideusage: {
      idetype: 'element',
      ignoreProperty: ["showUpload"],
    },
  })
  @Component({
    title: '上传',
    icon: 'uploader',
    description: '上传组件允许用户传输文件或提交自己的内容。',
    group: 'Form',
  })
  export class VanUploader extends ViewComponent {
    constructor(options?: Partial<VanUploaderOptions>) {
      super();
    }
    @Prop({
      title: '值',
    })
    modelValue: VanUploaderOptions['modelValue'];

    @Prop({
      title: '上传地址',
    })
    action: VanUploaderOptions['action'];

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    @Method({
      title: '手动上传文件列表',
      description: '手动上传文件列表',
    })
    submit(): void {}
  }

  export class VanUploaderOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '接受上传的文件类型',
      description: '接受上传的文件类型',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String = 'image/*';

    @Prop({
      group: '主要属性',
      title: '上传地址',
      description: '请求URL',
      setter: { concept: 'InputSetter' },
    })
    action: nasl.core.String = '/upload';

    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前文件列表',
      sync: true,
      docDescription: '当前的文件列表',
    })
    modelValue: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。',
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
    urlField: nasl.core.String = 'filePath';

    @Prop({
      group: '数据属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      setter: { concept: 'InputSetter' },
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '数据属性',
      title: '是否携带Cookie',
      description: '上传请求时是否携带 cookie',
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

    @Prop({
      group: '主要属性',
      title: '请求头',
      description: '设置上传的请求头部',
      setter: { concept: 'InputSetter' },
    })
    headers: object;

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
    data: object;

    @Prop({
      group: '主要属性',
      title: '是否支持多选文件',
      description: '是否支持多选文件',
      setter: { concept: 'SwitchSetter' },
    })
    multiple: nasl.core.Boolean = false;

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

    @Prop<VanUploaderOptions, 'ttlValue'>({
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
      title: '是否自动上传',
      description: '是否在选取文件后立即进行上传',
      setter: { concept: 'SwitchSetter' },
    })
    autoUpload: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '列表数量上限',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    maxCount: nasl.core.Integer;
    
    @Prop({
      group: '主要属性',
      title: '最大文件大小',
      description: '设置最大文件大小,单位为MB，默认为50MB',
      setter: {
        concept: "NumberInputSetter",
        min: 0
      }
    })
    maxSize: nasl.core.Decimal = 50;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
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
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '删除按钮',
      description: '是否显示删除按钮',
      setter: { concept: 'SwitchSetter' },
    })
    deletable: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '覆盖上传',
      description: '是否开启覆盖上传，开启后会关闭图片预览',
      setter: { concept: 'SwitchSetter' },
    })
    reupload: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '展示上传区域',
      description: '是否展示上传区域',
      setter: { concept: 'SwitchSetter' },
    })
    showUpload: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '图片选取模式',
      description: '图片选取模式，可选值为 camera (直接调起摄像头)',
      setter: { concept: 'EnumSelectSetter', options: [{ title: '直接调起摄像头' }, { title: '相册' }] },
    })
    capture: 'camera' | 'album' = 'album';

    @Event({
      title: '文件读取前',
      description: '文件读取前的回调函数，返回 false 可终止文件读取'
    })
    onBeforeRead: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        index: nasl.core.Integer;
      };
    }) => void;

    @Event({
      title: '文件读取后',
      description: '文件读取后的回调函数'
    })
    onAfterRead: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        index: nasl.core.Integer;
      };
    }) => void;

    @Event({
      title: '文件删除前',
      description: '文件删除前的回调函数，返回 false 可终止文件删除'
    })
    onBeforeDelete: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        index: nasl.core.Integer;
      };
    }) => void;

    @Event({
      title: '文件大小超额',
      description: '文件大小超额时触发'
    })
    onOversize: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      message: nasl.core.String;
      status: nasl.core.String;
    }) => void;

    @Event({
      title: '上传开始时',
      description: '上传开始时触发'
    })
    onStart: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        message: nasl.core.String;
        percent: nasl.core.Integer;
        status: nasl.core.String;
        content: nasl.core.String;
        objectUrl: nasl.core.String;
      };
    }) => void;

    @Event({
      title: '上传中',
      description: '上传中进度'
    })
    onProgress: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        message: nasl.core.String;
        percent: nasl.core.Integer;
        status: nasl.core.String;
        content: nasl.core.String;
        objectUrl: nasl.core.String;
      };
    }) => void;

    @Event({
      title: '上传成功时',
      description: '上传成功时触发'
    })
    onSuccess: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        message: nasl.core.String;
        name: nasl.core.String;
        percent: nasl.core.Integer;
        status: nasl.core.String;
        url: nasl.core.String;
        response: {
          filePath: nasl.core.String;
          msg: nasl.core.String;
          result: nasl.core.String;
          success: nasl.core.Boolean;
        };
      };
    }) => void;

    @Event({
      title: '上传错误时',
      description: '上传报错时触发'
    })
    onError: (event: {
      file: {
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
      };
      item: {
        message: nasl.core.String;
        percent: nasl.core.Integer;
        status: nasl.core.String;
        content: nasl.core.String;
        objectUrl: nasl.core.String;
      };
    }) => void;
  }
}
