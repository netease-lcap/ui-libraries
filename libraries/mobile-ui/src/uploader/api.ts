/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '文件上传',
    icon: 'uploader',
    description: '上传文件。',
    group: "Form"
  })
  export class VanUploader extends ViewComponent {
    constructor(options?: Partial<VanUploaderOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '主动调起文件选择，由于浏览器安全限制，只在触发操作的上下文中调用才有效'
    })
    chooseFile(): any {}
  }
  export class VanUploaderOptions extends ViewComponentOptions {
    @Prop({
      title: '文件读取结果的类型',
      description: '文件读取结果的类型，上传大文件时，建议使用 file 类型，避免卡顿',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'dataUrl'
        }, {
          title: 'text'
        }, {
          title: 'file'
        }]
      }
    })
    private resultType: 'dataUrl' | 'text' | 'file' = 'dataUrl';
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识文件上传的值',
      sync: true
    })
    value: nasl.collection.List<{
      name: nasl.core.String;
      url: nasl.core.String;
      size: nasl.core.Integer;
    }> | nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '字段名',
      description: '当前上传的文件字段名'
    })
    name: nasl.core.String = 'file';
    @Prop({
      group: '数据属性',
      title: '支持上传文件类型',
      description: '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      tooltipLink: 'https://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/10.H5%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/06.%E8%A1%A8%E5%8D%95/150.%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.html',
      setter: {
        concept: "InputSetter",
        placeholder: '所有类型'
      }
    })
    accept: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '文件上传地址'
    })
    url: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '请求 headers'
    })
    headers: Object;
    @Prop({
      group: '数据属性',
      title: '附加数据'
    })
    data: Object;
    @Prop({
      group: '数据属性',
      title: '设置cookie值',
      description: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      setter: {
        concept: "SwitchSetter"
      }
    })
    withCredentials: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: 'URL 字段名',
      description: '请求返回的 URL 字段名'
    })
    urlField: nasl.core.String = 'filePath';
    @Prop({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: 'JSON'
        }, {
          title: 'URL字符串'
        }]
      }
    })
    converter: 'json' | 'simple' = 'json';
    @Prop({
      group: '主要属性',
      title: '自动上传',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private autoUpload: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '多文件上传',
      description: '是否支持多文件上传',
      setter: {
        concept: "SwitchSetter"
      }
    })
    multiple: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '列表数量上限',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      }
    })
    maxCount: nasl.core.Integer = 999;
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
      group: '主要属性',
      title: '图片选择模式',
      description: '设置图片选择模式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '图库'
        }, {
          title: '相机'
        }]
      }
    })
    capture: 'waga' | 'camera' = 'waga';
    @Prop({
      group: '主要属性',
      title: '文件访问策略',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '任何人可访问'
        }, {
          title: '用户登录后可访问'
        }]
      }
    })
    access: 'public' | 'private';
    @Prop({
      group: '主要属性',
      title: '文件有效期',
      description: '是否开启文件有效期控制',
      setter: {
        concept: "SwitchSetter"
      }
    })
    ttl: nasl.core.Boolean;
    @Prop<VanUploaderOptions, 'ttlValue'>({
      group: '主要属性',
      title: '文件有效期天数',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      },
      if: _ => _.ttl === true
    })
    ttlValue: nasl.core.Integer;
    @Prop({
      group: '主要属性',
      title: '源地址访问',
      description: '开启后支持通过文件存储源地址访问文件',
      docDescription: '开启后支持通过文件存储源地址访问文件',
      setter: {
        concept: "SwitchSetter"
      }
    })
    viaOriginURL: nasl.core.Boolean;
    @Prop({
      group: '主要属性',
      title: '启用压缩',
      description: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      docDescription: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      setter: {
        concept: "SwitchSetter"
      }
    })
    lcapIsCompress: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '点击',
      description: '点击上传区域时触发'
    })
    onClickUpload: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
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
      name: nasl.core.String;
      size: nasl.core.Integer;
      status: nasl.core.String;
      uid: nasl.core.Integer;
    }) => void;
    @Event({
      title: '删除预览',
      description: '删除文件预览时触发'
    })
    onDelete: (event: {
      massage: nasl.core.String;
      name: nasl.core.String;
      size: nasl.core.Integer;
      uid: nasl.core.Integer;
      url: nasl.core.String;
      index: nasl.core.Integer;
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
        name: nasl.core.String;
        percent: nasl.core.Integer;
        size: nasl.core.Integer;
        status: nasl.core.String;
        uid: nasl.core.Integer;
        url: nasl.core.String;
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
        name: nasl.core.String;
        percent: nasl.core.Integer;
        size: nasl.core.Integer;
        status: nasl.core.String;
        uid: nasl.core.Integer;
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
        size: nasl.core.Integer;
        status: nasl.core.String;
        uid: nasl.core.Integer;
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
        name: nasl.core.String;
        percent: nasl.core.Integer;
        size: nasl.core.Integer;
        status: nasl.core.String;
        uid: nasl.core.Integer;
        url: nasl.core.String;
        response: {
          filePath: nasl.core.String;
          msg: nasl.core.String;
          result: nasl.core.String;
          success: nasl.core.Boolean;
        };
      };
    }) => void;
    @Slot({
      title: '配置文件上传图标'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
