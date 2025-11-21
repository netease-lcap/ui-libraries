/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 9,
    ideusage: {
      idetype: 'container',
      childAccept: false,
      selector: {
        expression: "this.getElement(el => el.slotTarget === 'placeholder' )",
        cssSelector: '.el-image',
      },
      defaultStyleInBoard: {
        width: '300px',
      },
    },
  })
  @Component({
    title: '图片',
    icon: 'image',
    description: '图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等',
    group: 'Display',
  })
  export class ElImage extends ViewComponent {
    constructor(options?: Partial<ElImageOptions>) {
      super();
    }
  }

  export class ElImageOptions extends ViewComponentOptions {
    // ========== 数据来源相关属性 ==========
    @Prop({
      group: '数据属性',
      title: '图片地址',
      description: '图片的URL地址',
      docDescription: '设置要显示的图片URL地址，支持相对路径和绝对路径。',
      setter: { concept: 'ImageSetter' },
    })
    src: nasl.core.String = '';

    @Prop({
      group: '数据属性',
      title: '预览列表',
      description: '预览图片的URL列表',
      docDescription: '设置开启图片预览功能后的预览图片URL列表，多个URL用逗号分隔。',
      setter: { concept: 'InputSetter', autoClear: true },
    })
    previewSrcList: nasl.core.String = '';

    @Prop({
      group: '数据属性',
      title: '初始索引',
      description: '预览时的初始图片索引',
      docDescription: '设置打开预览时显示的初始图片索引值，从0开始计数。',
      setter: { concept: 'NumberInputSetter', min: 0 },
    })
    initialIndex: nasl.core.String | nasl.core.Decimal;

    // ========== 展示类型/内容/效果/方式相关属性 ==========
    @Prop({
      group: '主要属性',
      title: '适应方式',
      description: '图片适应容器的方式',
      docDescription: '控制图片如何适应容器。拉伸：拉伸填满；适应：保持比例适应；填充：保持比例填充；原尺寸：原始大小；适应（小图）：小于容器时原尺寸。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '拉伸' },
          { title: '适应' },
          { title: '填充' },
          { title: '原尺寸' },
          { title: '适应（图片小于父元素时以原尺寸展示）' },
          { title: '默认' },
        ],
      },
    })
    fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | '' = '';

    // ========== 涉及可选的交互操作和操作效果相关属性 ==========
    @Prop({
      group: '交互属性',
      title: '点击遮罩关闭',
      description: '点击遮罩层是否关闭预览',
      docDescription: '开启后，用户可以点击背景遮罩层来关闭图片预览。',
      setter: { concept: 'SwitchSetter' },
    })
    hideOnClickModal: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否开启无限滚动',
      description: '是否开启无限滚动',
      setter: { concept: 'SwitchSetter' },
    })
    infinite: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '图片预览的z-index值',
      description: '设置图片预览的 z-index',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Decimal = 2000;

    @Prop({
      group: '状态属性',
      title: '是否开启懒加载',
      description: '是否开启懒加载',
      setter: { concept: 'SwitchSetter' },
    })
    lazy: nasl.core.Boolean = false;

    @Event({
      title: '图片预览',
      description: '图片预览',
    })
    onShow: (event: {}) => any;

    @Event({
      title: '图片加载成功时',
      description: '图片加载成功触发',
    })
    onLoad: (event: {}) => any;

    @Event({
      title: '图片加载失败时',
      description: '图片加载失败触发',
    })
    onError: (event: {}) => any;

    @Event({
      title: '图片预览切换时',
      description: '图片预览切换时',
    })
    onSwitchChange: (index: nasl.core.Integer) => any;

    @Event({
      title: '图片预览关闭时',
      description: '图片预览关闭时',
    })
    onClose: (event: {}) => any;

    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
    })
    onClick: (event: MouseEvent) => any;

    @Event({
      title: '双击',
      description: '在元素上双击鼠标按钮时触发。',
    })
    onDblclick: (event: MouseEvent) => any;

    @Event({
      title: '右键点击',
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: MouseEvent) => any;

    @Event({
      title: '鼠标按下',
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: MouseEvent) => any;

    @Event({
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移入',
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: MouseEvent) => any;

    @Event({
      title: '鼠标移出',
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: MouseEvent) => any;

    @Slot({
      title: '图片未加载的占位内容',
      description: '图片未加载的占位内容',
    })
    slotPlaceholder: () => Array<ViewComponent>;

    @Slot({
      title: '加载失败的内容',
      description: '加载失败的内容',
    })
    slotError: () => Array<ViewComponent>;

    @Slot({
      title: '图片预览',
      description: '图片预览',
    })
    slotViewer: () => Array<ViewComponent>;
  }

  @IDEExtraInfo({
    order: 10,
    ideusage: {
      idetype: 'modal',
      cacheOpenKey: 'modelValue',
      structured: true,
      bindStyleAttr: 'dialogStyle',
      selector: {
        expression: 'this',
        cssSelector: '.el-dialog',
      },
    },
  })
  export class ElImageViewer extends ViewComponent {
    @Method({
      title: '手动切换图片',
      description: '手动切换图片',
    })
    setActiveItem(
      @Param({
        title: '图片索引',
        description: '图片索引',
      })
      index: nasl.core.Integer,
    ): void {}

    constructor(options?: Partial<ElImageViewerOptions>) {
      super();
    }
  }

  export class ElImageViewerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图片预览的图片地址列表',
      description: '图片预览的图片地址列表',
      setter: { concept: 'InputSetter' },
    })
    urlList: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '图片预览的z-index值',
      description: '设置图片预览的 z-index',
      setter: { concept: 'NumberInputSetter' },
    })
    zIndex: nasl.core.Decimal = 2000;

    @Prop({
      group: '主要属性',
      title: '图片预览的初始图片Index值',
      description: '图片预览初始图片index',
      setter: { concept: 'NumberInputSetter' },
    })
    initialIndex: nasl.core.Integer;

    @Prop({
      group: '主要属性',
      title: '是否开启无限滚动',
      description: '是否开启无限滚动',
      setter: { concept: 'SwitchSetter' },
    })
    infinite: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '点击图片时是否隐藏预览',
      description: '点击图片时是否隐藏预览',
      setter: { concept: 'SwitchSetter' },
    })
    hideOnClickModal: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '是否将预览内容挂载到body上',
      description: '是否将预览内容挂载到body上',
      setter: { concept: 'SwitchSetter' },
    })
    teleported: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '图片预览的缩放比例',
      description: '图片预览的缩放比例',
      setter: { concept: 'NumberInputSetter' },
    })
    zoomRate: nasl.core.Decimal = 1.2;

    @Prop({
      group: '主要属性',
      title: '图片预览的最小缩放比例',
      description: '图片预览的最小缩放比例',
      setter: { concept: 'NumberInputSetter' },
    })
    minScale: nasl.core.Decimal = 0.2;

    @Prop({
      group: '主要属性',
      title: '图片预览的最大缩放比例',
      description: '图片预览的最大缩放比例',
      setter: { concept: 'NumberInputSetter' },
    })
    maxScale: nasl.core.Decimal = 7;

    @Prop({
      group: '主要属性',
      title: '是否在按下 ESC 后关闭预览',
      description: '是否在按下 ESC 后关闭预览',
      setter: { concept: 'SwitchSetter' },
    })
    closeOnPressEscape: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '是否显示进度条',
      description: '是否显示进度条',
      setter: { concept: 'SwitchSetter' },
    })
    showProgress: nasl.core.Boolean = false;

    @Event({
      title: '图片预览关闭时',
      description: '图片预览关闭时',
    })
    onClose: (event: {}) => any;

    @Event({
      title: '图片预览切换时',
      description: '图片预览切换时',
    })
    onSwitch: (index: nasl.core.Integer) => any;

    @Event({
      title: '旋转图像时触发',
      description: '旋转图像时触发',
    })
    onRotate: (deg: nasl.core.Decimal) => any;
  }
}
