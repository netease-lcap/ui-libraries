declare namespace nasl.ui {
    export class Current<T> {
        item: T;
        index: nasl.core.Integer;
        rowIndex: nasl.core.Integer;
        columnIndex: nasl.core.Integer;
        value: nasl.core.String;
    }

    export class CurrentDynamic<T, T1> {
        item: T;
        index: nasl.core.Long;
        rowIndex: nasl.core.Long;
        columnIndex: nasl.core.Long;
        value: nasl.core.String;
        columnItem: T1;
    }

    export class DataSourceParams {
        page: nasl.core.Integer;
        size: nasl.core.Integer;
        sort: nasl.core.String;
        order: nasl.core.String;
        filterText: nasl.core.String;
    }

    export class BaseEvent { }
    export class EventTarget { }
    export class MouseEvent {
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
    }
    export class FocusEvent {
        cancelBubble: nasl.core.Boolean;
        detail: nasl.core.String;
        layerX: nasl.core.Integer;
        layerY: nasl.core.Integer;
        pageX: nasl.core.Integer;
        pageY: nasl.core.Integer;
        which: nasl.core.Integer;
    }
    export class ChangeEvent {
        value: nasl.core.String;
        oldValue: nasl.core.String;
        formattedValue: nasl.core.String;
        values: nasl.collection.List<nasl.core.String>;
        oldValues: nasl.collection.List<nasl.core.String>;
        label: nasl.core.String;
        valid: nasl.core.Boolean;
    }
    export class NavigateEvent {
        to: nasl.core.String;
        replace: nasl.core.Boolean;
        append: nasl.core.Boolean;
    }
    export class ChangeItemEvent {
        selected: nasl.core.String;
        value: nasl.core.String;
        oldValue: nasl.core.String;
        item: nasl.core.String;
        oldItem: nasl.core.String;
        label: nasl.core.String;
    }
    export class ChangeItemsEvent {
        selected: nasl.core.Boolean;
        item: nasl.core.String;
        value: nasl.collection.List<nasl.core.String>;
        oldValue: nasl.collection.List<nasl.core.String>;
        items: nasl.collection.List<nasl.core.String>;
        oldItems: nasl.collection.List<nasl.core.String>;
    }
    export class CascadeCapsulesEvent {
        level: nasl.core.Integer;
        value: nasl.core.String;
        oldValue: nasl.core.String;
        values: nasl.collection.List<nasl.core.String>;
        oldValues: nasl.collection.List<nasl.core.String>;
        item: nasl.core.String;
    }
    export class CollapseEvent {
        expanded: nasl.core.Boolean;
        open: nasl.core.Boolean;
        value: nasl.core.Boolean;
        oldValue: nasl.core.Boolean;
        node: nasl.core.String;
    }
    export class SliderEvent {
        value: nasl.core.Integer;
        oldValue: nasl.core.Integer;
        percent: nasl.core.Integer;
    }
    export class DateEvent {
        date: nasl.core.String;
        time: nasl.core.String;
    }
    export class OperatorItemEvent {
        item: nasl.core.String;
        index: nasl.core.Integer;
        data: nasl.core.String;
    }
    export class ValidateEvent {
        rawValue: nasl.core.String;
        value: nasl.core.String;
        trigger: nasl.core.String;
        muted: nasl.core.String;
        valid: nasl.core.Boolean;
        touched: nasl.core.Boolean;
        dirty: nasl.core.Boolean;
        firstError: nasl.core.String;
    }
    export class PaginationEvent {
        page: nasl.core.Integer;
        oldPage: nasl.core.Integer;
        pageSize: nasl.core.Integer;
        oldPageSize: nasl.core.Integer;
        size: nasl.core.Integer;
        oldSize: nasl.core.Integer;
        number: nasl.core.Integer;
        oldNumber: nasl.core.Integer;
    }
    export class DurationEvent {
        text: nasl.core.String;
        color: nasl.core.String;
        duration: nasl.core.Integer;
    }
    export class TransferEvent {
        source: nasl.collection.List<nasl.core.String>;
        target: nasl.collection.List<nasl.core.String>;
        transfer: nasl.collection.List<nasl.core.String>;
        transferValues: nasl.collection.List<nasl.core.String>;
    }
    export class TreeChangeEvent {
        value: nasl.core.String;
        oldValue: nasl.core.String;
        node: nasl.core.String;
        oldNode: nasl.core.String;
    }
    export class CheckedEvent {
        checked: nasl.core.Boolean;
        oldChecked: nasl.core.Boolean;
        values: nasl.collection.List<nasl.core.String>;
        oldValues: nasl.collection.List<nasl.core.String>;
        node: nasl.core.String;
        item: nasl.core.String;
    }
    export class UploadEvent {
        item: nasl.ui.File;
        data: nasl.core.String;
        file: nasl.core.String;
        xhr: nasl.core.String;
        formData: nasl.core.String;
        xml: nasl.core.String;
    }
    export class UploadErrorEvent {
        name: nasl.core.String;
        message: nasl.core.String;
        extensions: nasl.core.String;
        maxSize: nasl.core.String;
        size: nasl.core.String;
        count: nasl.core.Integer;
        limit: nasl.core.Integer;
    }
    export class SortEvent {
        field: nasl.core.String;
        order: nasl.core.String;
        compare: nasl.core.String;
    }
    export class PoiInfo {
        source: nasl.core.String;
        id: nasl.core.String;
        name: nasl.core.String;
        location: nasl.core.String;
        address: nasl.core.String;
    }
    export class File {
        status: nasl.core.String;
        url: nasl.core.String;
        name: nasl.core.String;
        size: nasl.core.Integer;
        type: nasl.core.String;
    }

    export class SelectData {
        parent: nasl.core.String;
        item: nasl.core.String;
        level: nasl.core.Integer;
        index: nasl.core.Integer;
    }
    class DragAndDropUpdateData {
        sourceList: nasl.collection.List<nasl.core.String>;
        targetList: nasl.collection.List<nasl.core.String>;
    }
    export class DragAndDropEvent {
        source: nasl.ui.SelectData;
        target: nasl.ui.SelectData;
        finalSource: nasl.ui.SelectData;
        position: nasl.core.String;
        updateData: nasl.ui.DragAndDropUpdateData;
    }
    export class ExpandEvent {
        item: nasl.core.String;
        expanded: nasl.core.Boolean;
    }
    export class ScrollEvent {
        scrollTop: nasl.core.Integer;
        scrollLeft: nasl.core.Integer;
        scrollWidth: nasl.core.Integer;
        scrollHeight: nasl.core.Integer;
        clientWidth: nasl.core.Integer;
        clientHeight: nasl.core.Integer;
    }

    export class KeyboardEvent {
        // altKey: nasl.core.Boolean;
        // code: nasl.core.String;
        // ctrlKey: nasl.core.Boolean;
        // isComposing: nasl.core.Boolean;
        // key: nasl.core.String;
        // metaKey: nasl.core.Boolean;
        // repeat: nasl.core.Boolean;
        // shiftKey: nasl.core.Boolean;
    }
}
