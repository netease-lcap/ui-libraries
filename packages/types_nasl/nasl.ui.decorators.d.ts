declare namespace nasl.ui {
    export class VueComponent {
        // name: '__VueComponent';
    }

    export interface InputSetter {
        type: 'input'
        placeholder: string;
    }
    export interface EnumSelectSetter {
        type: 'enumSelect'
        titles: string[];
    }
    export interface CapsulesSetter {
        type: 'capsules'
        titles: string[];
        icons: string[];
        tooltips: string[];
    }
    export interface NumberInputSetter {
        type: 'numberInput'
        placement?: string;
        min?: number;
        max?: number;
        precision?: number;
        placeholder?: string;
    }
    export interface IconSetter {
        type: 'iconSelect',
    }
    export interface ImageSetter {
        type: 'imageSelect',
    }
    export interface PropertySelectSetter {
        type: 'propertySelect',
    }

    export interface ComponentOptions {
        title: string;
        icon?: string;
        description?: string;
    }
    export function Component(options?: ComponentOptions): (target: any) => void;

    export interface PropOptions {
        group?: '基础信息' | '数据属性' | '主要属性' | '交互属性' | '状态属性' | '样式属性' | '工具属性';
        title: string;
        icon?: string;
        description?: string;
        syncMode?: 'both' | 'onlyModel' | 'onlySync';
        tooltipLink?: string;
        docDescription?: string;
        bindHide?: boolean;
        bindOpen?: boolean;
        setter?: InputSetter | EnumSelectSetter | CapsulesSetter | NumberInputSetter | IconSetter | ImageSetter | PropertySelectSetter;
        designerValue?: any;
    }
    export function Prop(options?: PropOptions): (target: any, key: string) => void;

    export interface GenericPropOptions<T extends VueComponent, K extends keyof T> {
        group?: '基础信息' | '数据属性' | '主要属性' | '交互属性' | '状态属性' | '样式属性' | '工具属性';
        title: string;
        icon?: string;
        description?: string;
        syncMode?: 'both' | 'onlyModel' | 'onlySync';
        tooltipLink?: string;
        docDescription?: string;
        bindHide?: boolean;
        bindOpen?: boolean;
        setter?: InputSetter | EnumSelectSetter | CapsulesSetter | NumberInputSetter | IconSetter | ImageSetter | PropertySelectSetter;
        default?: T[K];
        designerValue?: any;
        if?: (target: T) => boolean;
        disabledIf?: (target: T) => boolean;
        onToggle?: Array<{ update: any, if?: (value: T[K]) => boolean } | { clear: string[], if?: (value: T[K]) => boolean }>,
    }
    export function Prop<T extends VueComponent, K extends keyof T>(options?: GenericPropOptions<T, K>): (target: T, key: K) => void;

    export interface EventOptions {
        title: string;
        description?: string;
    }
    export function Event(options?: EventOptions): (target: any, key: string) => void;

    export interface SlotOptions {
        title: string;
        description?: string;
        emptyBackground?: string;
        snippets?: Array<{ title: string, code: string }>;
    }
    export function Slot(options?: SlotOptions): (target: any, key: string) => void;

    export interface MethodOptions {
        title: string;
        description?: string;
    }
    export function Method(options?: MethodOptions): (target: any, key: string) => void;

    export interface ParamOptions {
        title: string;
        description?: string;
        setter?: InputSetter | EnumSelectSetter | CapsulesSetter | NumberInputSetter | IconSetter;
    }
    export function Param(options?: ParamOptions): (target: any, key: string, paramIndex: number) => void;
}
