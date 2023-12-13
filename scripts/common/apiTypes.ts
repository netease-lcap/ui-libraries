/// <reference types="@nasl/types" />

export type PropAPI = nasl.ui.PropOptions & {
    name: string;
    type: string;
    if?: string;
    disabledIf?: string;
    onToggle?: Array<{ update: any, if?: string }>,
}

export type EventAPI = nasl.ui.EventOptions & {
    name: string;
    type: string;
};
export type SlotAPI = nasl.ui.SlotOptions & {
    name: string;
    type: string;
};
export type MethodAPI = nasl.ui.MethodOptions & {
    name: string;
    type: string;
};

/**
 * 组件 TS 解析后的类型
 */
export interface ComponentAPI {
    // group: string;
    /**
     * 组件名称
     */
    name: string;
    /**
     * 组件标题
     */
    title: string;
    /**
     * 组件标题
     */
    description: string;
    /**
     * 组件图标
     */
    icon: string;
    /**
     * 是否高级
     * 在低代码 IDE 中不显示
     */
    advanced: boolean;
    typeParams: string;
    props?: Array<PropAPI>;
    readableProps?: Array<PropAPI>;
    slots?: Array<SlotAPI>;
    children?: Array<ComponentAPI>;
    events?: Array<EventAPI>;
    methods?: Array<MethodAPI>;
}


export interface BlockAPI {
    title: string;
    description: string;
    code: string;
} 