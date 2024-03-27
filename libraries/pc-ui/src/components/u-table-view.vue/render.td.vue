<template>
    <td :class="$style.cell"
        :ellipsis="getTdEllipsis()"
        v-ellipsis-title>
        <!-- type === 'index' -->
        <span v-if="vm.type === 'index'">
            <template v-if="vm.autoIndex && usePagination && currentDataSource">
                {{ 1 + ((currentDataSource.paging.number - 1) * currentDataSource.paging.size) + rowIndex }}
            </template>
            <template v-else>{{ (vm.startIndex - 0) + rowIndex }}</template>
        </span>
        <!-- type === 'radio' -->
        <span v-if="vm.type === 'radio'">
            <u-radio
                :value="selectedItem === item"
                :disabled="item.disabled"
                @click.native="select(item, rowIndex)"
                :readonly="readonly">
            </u-radio>
        </span>
        <!-- type === 'checkbox' -->
        <span v-if="vm.type === 'checkbox'">
            <u-checkbox
                :value="item.checked"
                :label="$at(item, valueField)"
                :disabled="item.disabled || disabled"
                @check="check(item, $event.value)" :readonly="readonly">
            </u-checkbox>
        </span>
        <!-- type === 'expander' left -->
        <f-slot
            v-if="vm.type === 'expander' && vm.expanderPosition === 'left'"
            name="expander"
            :vm="vm"
            :props="{
                item: item,
                value: $at(item, vm.field),
                vm,
                rowIndex,
                columnIndex,
                index: rowIndex,
                columnItem: vm.columnItem,
                toggle: () => toggleExpanded(item)
            }">
            <u-table-view-expander
                :item="item"
                @toggle="() => toggleExpanded(item)">
            </u-table-view-expander>
        </f-slot>
        <!-- tree -->
        <template v-if="treeDisplay && item.tableTreeItemLevel !== undefined && columnIndex === treeColumnIndex">
            <span :class="$style.indent" :style="{ paddingLeft: number2Pixel(20 * item.tableTreeItemLevel) }"></span>
            <span :class="$style.tree_expander" v-if="$at(item, hasChildrenField)" :expanded="item.treeExpanded" @click.stop="toggleTreeExpanded(item)" :loading="item.loading"></span>
            <span :class="$style.tree_placeholder" v-else></span>
        </template>
        <!-- type === 'dragHandler' -->
        <span v-if="vm.type === 'dragHandler'">
            <i-ico :class="$style.dragHandler" name="dragHandler" :draggable="handlerDraggable && item.draggable || undefined" :disabled="!(handlerDraggable && item.draggable)"></i-ico>
        </span>
        <!-- Editable text -->
        <template v-if="vm.type === 'editable'">
            <!-- <div @dblclick.stop="onSetEditing(item, columnVM)" :class="$style.editablewrap"
                :ellipsis="columnVM.ellipsis !== undefined? columnVM.ellipsis : ellipsis"
                :style="{width:getEditablewrapWidth(item, columnIndex, treeColumnIndex)}"
                :editing="item.editing === columnVM.field">
                <div>
                    <template v-if="item.editing === columnVM.field">
                        <f-slot name="editcell" :vm="columnVM" :props="{ item: item, value: $at(item, columnVM.field), columnVM, rowIndex: rowIndex + virtualIndex, columnIndex, index: rowIndex + virtualIndex }">
                            <span v-if="columnVM.field && !['radio', 'checkbox'].includes(columnVM.type)" :class="$style['column-field']">{{ columnVM.currentFormatter.format($at(item, columnVM.field)) }}</span>
                        </f-slot>
                    </template>
                    <template v-else>
                        <f-slot name="cell" :vm="columnVM" :props="{ item: item, value: $at(item, columnVM.field), columnVM, rowIndex: rowIndex + virtualIndex, columnIndex, index: rowIndex + virtualIndex, columnItem: columnVM.columnItem }">
                            <span v-if="columnVM.field && !['radio', 'checkbox'].includes(columnVM.type)" :class="$style['column-field']">{{ columnVM.currentFormatter.format($at(item, columnVM.field)) }}</span>
                        </f-slot>
                    </template>
                </div>
            </div> -->
        </template>
        <f-slot v-else :name="slotName" :vm="vm" :props="slotProps">
            <slot></slot>
        </f-slot>
        <!-- type === 'expander' right -->
        <f-slot
            v-if="vm.type === 'expander' && vm.expanderPosition === 'right'"
            name="expander"
            :vm="vm"
            :props="{
                item: item,
                value: $at(item, vm.field),
                vm,
                rowIndex,
                columnIndex,
                index: rowIndex,
                columnItem: vm.columnItem,
                toggle: () => toggleExpanded(item)
            }">
            <u-table-view-expander
                :item="item"
                @toggle="() => toggleExpanded(item)">
            </u-table-view-expander>
        </f-slot>
    </td>
</template>
<script>
export default {
    name: 'u-table-render-td',
    inject: [
        'currentDataSource',
        'toggleExpanded',
        'number2Pixel',
    ],
    props: {
        vm: Object,
        slotProps: Object,
        slotName: String,
        rowIndex: Number,
        index: Number,
        columnIndex: Number,
        columnItem: Object,
        item: Object,
        selectedItem: Object,
        valueField: String,
        readonly: Boolean,
        disabled: Boolean,
        usePagination: Boolean,
        ellipsis: Boolean,

        treeDisplay: Boolean,
        hasChildrenField: String,
        treeColumnIndex: Number,
    },
    methods: {
        getTdEllipsis() {
            const columnVM = this.vm;
            let ellipsis = false;
            if (columnVM.ellipsis === undefined) {
                ellipsis = this.ellipsis;
            } else {
                ellipsis = columnVM.ellipsis;
            }
            return ellipsis && columnVM.type !== 'editable';
        },
        select() {

        },
        check(item, checked) {
            this.$emit('check', {item, checked});
        },
        toggleTreeExpanded(item) {
            this.$emit('tree-toggle-expanded', item);
        },
    },
}
</script>

<style module>
.resizer {
    position: absolute;
    top: 4px;
    bottom: 4px;
    right: -3px;
    z-index: 1;
    cursor: col-resize;
    padding: 2px;
    background: var(--border-color-base) content-box;
    width: 5px;
}

.cell {
    position: relative;
    white-space: normal;
    word-break: break-all;
    /* 解决在火狐浏览器下英文换行显示问题 */
    word-wrap: break-word;
}

.cell[ellipsis] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cell[ellipsis] > div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cell[ellipsis] > * {
    white-space: nowrap;
}
.cell[last-left-fixed]::after,
.cell[first-right-fixed]::after{
    content: "";
    position: absolute;
    top: 0;
    left: 6px;
    bottom: -1px;
    width: 6px;
    pointer-events: none;
    transform: translateX(-100%);
    transition: box-shadow .1s linear;
    box-shadow: none;
    display:block;
}
.cell[last-left-fixed]::after {
    left: unset;
    transform: translateX(100%);
    right: 6px;
}
.cell[shadow][last-left-fixed]::after {
    box-shadow: inset -4px 0 5px -3px rgb(0 0 0 / 15%);
}
.cell[shadow][first-right-fixed]::after {
    box-shadow: inset 3px 0 5px -3px rgb(0 0 0 / 15%);
}

.cell[disabled] {
    color: var(--text-color-disabled);
    background-color: var(--table-view-expander-background-disabled);
}
.dragHandler {
    cursor: var(--table-view-drag-cursor);
}
.dragHandler[disabled] {
    cursor: var(--table-view-drag-cursor-disabled);
    color: var(--table-view-drag-color-disabled);
}

/**
 * 树型展示
 */
.tree_expander {
    display: inline-block;
    width: var(--table-view-tree-expander-size);
    height: var(--table-view-tree-expander-size);
    line-height: var(--table-view-tree-expander-size);
    transition: transform var(--transition-duration-base);
    margin-right: var(--table-view-tree-expander-margin);
    text-align: center;
    vertical-align: middle;
}
.tree_expander::before {
content: "\e679";
    font-family: "lcap-ui-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-decoration: inherit;
    text-rendering: optimizeLegibility;
    text-transform: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
}
.tree_expander {
    cursor: pointer;
}
.tree_expander[expanded] {
    transform: rotate(90deg);
}
.tree_placeholder{
    display: inline-block;
    width: var(--table-view-tree-expander-size);
    height: var(--table-view-tree-expander-size);
    line-height: var(--table-view-tree-expander-size);
    text-align: center;
    margin-right: var(--table-view-tree-expander-margin);
}
.tree_expander[loading]{
    margin-right: calc(4px + var(--table-view-tree-expander-margin));
}
.tree_expander[loading]::before {
    content: '';
    font: inherit;
    display: inline-block;
    width: var(--table-view-tree-expander-loading-size);
    height: var(--table-view-tree-expander-loading-size);
    border: var(--table-view-tree-expander-loading-border-width) solid currentColor;
    border-radius: var(--table-view-tree-expander-loading-size);
    animation: rotate var(--spinner-animation-duration) ease-in-out var(--spinner-animation-delay) infinite;
}
.tree_expander + div,
.tree_placeholder + div
{
    display: inline-flex;
    align-items: center;
    width: auto;
}

.tree_expander[loading]::before {
    border-top-color: transparent;
}

.indent {}
</style>