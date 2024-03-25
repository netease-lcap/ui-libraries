<template>
    <div>
        <div v-for="(tableMeta, tableMetaIndex) in tableMetaList">
            <u-table :class="$style['head-table']">
                <colgroup>
                    <col v-for="(columnVM, columnIndex) in visibleColumnVMs" :key="columnIndex" :width="columnVM.computedWidth">
                </colgroup>
                <thead :grouped="hasGroupedColumn">
                    <tr v-for="(headTr, trIndex) in visibleTableHeadTrArr">
                        <template v-for="(columnVM, columnIndex) in headTr">
                        <th
                            v-if="columnVM&&columnVM.colSpan !== 0"
                            ref="th"
                            :class="[$style['head-title'], boldHeader ? $style.boldHeader : null]"
                            :key="columnIndex"
                            :is-sub="columnVM.$attrs['is-sub']"
                            :vusion-scope-id="columnVM.$vnode.context.$options._scopeId"
                            :vusion-node-path="columnVM.$attrs['vusion-node-path']"
                            :vusion-node-tag="columnVM.$attrs['vusion-node-tag']"
                            :vusion-disabled-move="columnVM.$attrs['vusion-disabled-move']"
                            :vusion-disabled-duplicate="columnVM.$attrs['vusion-disabled-duplicate']"
                            :vusion-disabled-cut="columnVM.$attrs['vusion-disabled-cut']"
                            :vusion-template-title-node-path="columnVM.$attrs['vusion-template-title-node-path']"
                            :sortable="columnVM.sortable && sortTrigger === 'head'" :filterable="!!columnVM.filters" @click="columnVM.sortable && sortTrigger === 'head' && onClickSort(columnVM)"
                            :style="getStyle('th', columnVM)"
                            :last-left-fixed="isLastLeftFixed(columnVM, columnIndex, headTr)"
                            :first-right-fixed="isFirstRightFixed(columnVM, columnIndex, headTr)"
                            :shadow="(isLastLeftFixed(columnVM, columnIndex, headTr) && (!scrollXStart || $env.VUE_APP_DESIGNER)) || (isFirstRightFixed(columnVM, columnIndex, headTr) && (!scrollXEnd || $env.VUE_APP_DESIGNER))"
                            :disabled="$env.VUE_APP_DESIGNER && columnVM.currentHidden"
                            :colspan="columnVM.colSpan"
                            :rowspan="columnVM.rowSpan"
                            :ellipsis="columnVM.thEllipsis !== undefined? columnVM.thEllipsis : thEllipsis"
                            v-ellipsis-title>
                            <!-- type === 'checkbox' -->
                            <span v-if="columnVM.type === 'checkbox'">
                                <u-checkbox :value="allChecked" @check="checkAll($event.value)" :disabled="disabled" :readonly="readonly"></u-checkbox>
                            </span>
                            <!-- Normal title -->
                            <template>
                                <span vusion-slot-name="title" vusion-slot-name-edit="title" :class="$style['column-title']">
                                    <f-slot name="title" :vm="columnVM" :props="{ columnVM, columnIndex, columnItem: columnVM.columnItem }">
                                        {{ columnVM.title }}
                                        <s-empty
                                            v-if="!(columnVM.$slots && columnVM.$slots.title)
                                                && !columnVM.title
                                                && $env.VUE_APP_DESIGNER
                                                && !!$attrs['vusion-node-path']">
                                        </s-empty>
                                    </f-slot>
                                </span>
                            </template>
                            <!-- Sortable -->
                            <span v-if="columnVM.sortable" :class="$style.sort"
                                :sorting="currentSorting && currentSorting.field === columnVM.field" :order="currentSorting && currentSorting.order"
                                @click="sortTrigger === 'icon' && ($event.stopPropagation(), onClickSort(columnVM))"></span>
                            <!-- Filterable -->
                            <span v-if="columnVM.filters" :class="$style['filter-wrap']" :active="isFilterActive(columnVM.field)">
                                <!-- <u-table-view-filters :value="getFiltersValue(columnVM.field)" @select="onSelectFilters(columnVM.field, $event)">
                                    <u-table-view-filter v-for="filter in columnVM.filters" :key="filter.value" :value="filter.value">{{ filter.text }}</u-table-view-filter>
                                </u-table-view-filters> -->
                                <u-table-view-filters-popper
                                    :value="getFiltersValue(columnVM.field)"
                                    :data="columnVM.filters"
                                    :multiple="columnVM.filterMultiple || filterMultiple"
                                    :max="columnVM.filterMax || filterMax"
                                    @select="onSelectFilters(columnVM.field, $event)">
                                </u-table-view-filters-popper>
                            </span>
                            <!-- Resizable -->
                            <f-dragger v-if="resizable && columnIndex !== headTr.length - 1" axis="horizontal"
                                @dragstart="onResizerDragStart($event, columnVM)"
                                @drag="onResizerDrag($event, columnVM, columnIndex)"
                                @dragend="onResizerDragEnd($event, columnVM, columnIndex)">
                                <div :class="$style.resizer" @click.stop></div>
                            </f-dragger>
                        </th>
                        </template>
                    </tr>
                </thead>
            </u-table>
        </div>
    </div>
</template>

<script>

export default {
    name: 'u-table-columns-render',
    props: {
        tableMetaList: Array,
        tableWidth: Number,
        color: String,
        line: String,
        striped: Boolean,
        useStickyFixed: Boolean,
        visibleColumnVMs: Array,
        visibleTableHeadTrArr: Array,
        boldHeader: Boolean,
        hasGroupedColumn: Boolean,
        sortTrigger: String,
        scrollXStart: Boolean,
        scrollXEnd: Boolean,
        thEllipsis: Boolean,
        currentSorting: Object,
        disabled: Boolean,
        readonly: Boolean,
        resizable: Boolean,
        filterMultiple: Boolean,
        filterMax: Number,
    },
    data() {
        return {
          
        };
    },
    created() {
       
    },
    updated() {
       console.log('updated 111111'); 
    },
    methods: {
        getStyle(type, columnVM) {
            
        },
        isLastLeftFixed(columnVM, columnIndex, headTr) {
            
        },
        isFirstRightFixed(columnVM, columnIndex, headTr) {
            
        },
        onClickSort(columnVM) {
            
        },
        checkAll(value) {
            
        },
        isFilterActive(field) {
            
        },
        getFiltersValue(field) {
            
        },
        onSelectFilters(field, value) {
            
        },
        onResizerDragStart(event, columnVM) {
            
        },
        onResizerDrag(event, columnVM, columnIndex) {
            
        },
        onResizerDragEnd(event, columnVM, columnIndex) {
            
        },
    },
};
</script>

<style module>

</style>
