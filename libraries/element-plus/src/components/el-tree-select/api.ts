/// <reference types="@nasl/types" />

namespace nasl.ui {
  @IDEExtraInfo({
    order: 6,
    ideusage: {
      idetype: 'container',
      events: {
        click: true,
      },
    },
    extends: [
      {
        name: 'ElSelect',
      },
      {
        name: 'ElTree',
      },
    ],
  })
  @Component({
    title: '树形选择',
    icon: 'tree-view',
    description: '树形选择器，可以对树形结构数据进行选择',
    group: 'Selector',
  })
  export class ElTreeSelect<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(options?: Partial<ElSelectOptions<T, V, P, M, C> & ElTreeOptions<T, V, M>>) {
      super();
    }
  }

  export class ElTreeSelectOptions<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponentOptions {}

  @IDEExtraInfo({
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '表单树形选择',
    description: '表单树形选择器，可以对树形结构数据进行选择',
    group: 'Form',
  })
  export class ElFormTreeSelect<
    T,
    V,
    P extends nasl.core.Boolean,
    M extends nasl.core.Boolean,
    C extends nasl.core.Boolean,
  > extends ViewComponent {
    constructor(
      options?: Partial<
      ElFormTreeSelectOptions &
          ElFormItemProOptions &
          Omit<ElSelectOptions<T, V, P, M, C> & ElTreeOptions<T, V, M>, keyof ElFormItemProOptions>
      >,
    ) {
      super();
    }
  }

  export class ElFormTreeSelectOptions extends ViewComponentOptions {}
}
