/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '画廊',
    icon: 'gallery',
    description: '画廊',
    group: "Display"
  })
  export class VanGallery<T> extends ViewComponent {
    constructor(options?: Partial<VanGalleryOptions<T>>) {
      super();
    }
  }
  export class VanGalleryOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。'
    })
    dataSource: nasl.collection.List<T> | { total: nasl.core.Integer; list: nasl.collection.List<T> };
  }
}
