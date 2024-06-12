<template>
<div :class="[$style.root, 'list-view']" :readonly="readonly" :readonly-mode="readonlyMode" :disabled="disabled"
    :tabindex="readonly || disabled ? '' : 0"
    :vusion-designer="$env.VUE_APP_DESIGNER">
    <u-input
      v-if="filterable"
      :class="$style.filter"
      :disabled="disabled"
      :placeholder="placeholder"
      size="small"
      suffix="search"
      :clearable="clearable"
      :value="filterText"
      @input="onInput">
    </u-input>

    <div :class="$style.scrollwrap" @scroll="onScroll">
      <van-pull-refresh :value="$env.VUE_APP_DESIGNER ? false : refreshing" :disabled="!pullRefresh || pageable === 'pagination'"
        :pulling-text="pullingText" :loosing-text="loosingText" :loading-text="loadingText" :success-text="successText" :success-duration="successDuration" :pull-distance="pullDistance"
        @refresh="refresh">
        <div ref="body" :class="$style.body">
            <slot></slot>
            <div
              :class="$style.list"
              :striped="striped"
              :selectable="selectable"
              ref="virtual"
              v-if="(!currentLoading && !currentError && !currentEmpty || pageable === 'auto-more' || pageable === 'load-more') && currentData && currentData.length"
              :style="{ paddingTop: virtualTop + 'px', paddingBottom: virtualBottom + 'px' }">
                <component :is="ChildComponent"
                    v-for="(item, index) in virtualList"
                    v-if="item"
                    :key="$at(item, valueField)"
                    :value="$at(item, valueField)"
                    :disabled="item.disabled || disabled"
                    :item="item"
                    :index="index"
                    vusion-slot-name="item">
                    <slot name="item" :item="item" :index="index" :text="$at(item, field || textField)" :value="$at(item, valueField)" :disabled="item.disabled || disabled">{{ $at(item, field || textField) }}
                        <van-empty-col v-if="(!$slots.item) && $env.VUE_APP_DESIGNER"></van-empty-col>
                    </slot>
                </component>
            </div>
            <div :class="$style.status" status="loading" v-if="currentLoading && !notext">
                <slot name="loading"><u-spinner></u-spinner> {{ loadingText }}</slot>
            </div>
            <div :class="$style.status" status="error" v-else-if="(currentData === null || currentError)  && !notext">
                <slot name="error">{{ errorText }}</slot>
            </div>
            <div :class="$style.status" v-else-if="pageable === 'load-more' && currentDataSource && currentDataSource.hasMore() && !notext">
                <u-link @click="load(true)">{{ $t('loadMore') }}</u-link>
            </div>
            <div :class="$style.status" v-else-if="(pageable === 'auto-more' || pageable === 'load-more') && currentDataSource && !currentDataSource.hasMore() && !$env.VUE_APP_DESIGNER && !notext && !hiddenempty">
                {{ $t('noMore') }}
            </div>
            <div :class="$style.status" v-else-if="(currentData && !currentData.length || currentEmpty) && !notext">
                <slot name="empty">{{ emptyText }}</slot>
            </div>
        </div>
      </van-pull-refresh>
    </div>

    <div
        v-if="(pageable === 'pagination')" :class="$style.foot">
            <van-pagination
                :value="currentDataSource && currentDataSource.paging && currentDataSource.paging.number"
                :total-items="currentDataSource && currentDataSource.total"
                :items-per-page="currentDataSource && currentDataSource.paging && currentDataSource.paging.size"
                mode="simple"
                @change="page($event)"
            >
                <div slot="prev-text" vusion-slot-name="prev" style="width: 100%; display: flex; justify-content: center; align-items: center;">
                    <slot name="prev">
                        <van-empty-col v-if="$env.VUE_APP_DESIGNER"></van-empty-col>
                    </slot>
                </div>
                <div slot="next-text" vusion-slot-name="next" style="width: 100%; display: flex; justify-content: center; align-items: center;">
                    <slot name="next">
                        <van-empty-col v-if="$env.VUE_APP_DESIGNER"></van-empty-col>
                    </slot>
                </div>
            </van-pagination>
    </div>
</div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import UListView from 'cloud-ui.vusion/src/components/u-list-view.vue/index.vue';
import UCheckbox from 'cloud-ui.vusion/src/components/u-checkbox.vue/index.vue';
import UInput from 'cloud-ui.vusion/src/components/u-input.vue/index.vue';
import USpinner from 'cloud-ui.vusion/src/components/u-spinner.vue/index.vue';
import ULink from 'cloud-ui.vusion/src/components/u-link.vue/index.vue';
import DataSource from '../../../src/utils/DataSource';
import VanPullRefresh from '../../../src/pull-refresh';
import VanEmptyCol from '../../../src/emptycol';
import VanPagination from '../../../src/pagination';
import Iconv from '../../../src/iconv';

import './index.css';

export default {
    name: 'van-list-view',
    groupName: 'van-list-view-group',
    childName: 'van-list-view-item',
    components: { VanPullRefresh, VanEmptyCol, VanPagination, UCheckbox, UInput, USpinner, ULink, Iconv },
    extends: UListView,
    mixins: [
      sync({
        data: 'currentData',
        total() {
          return this.currentDataSource && this.currentDataSource.total ? this.currentDataSource.total : 0;
        },
        size() {
          return this.currentDataSource && this.currentDataSource.size ? this.currentDataSource.paging.size : this.pageSize;
        },
        page() {
          return this.currentDataSource && this.currentDataSource.paging ? this.currentDataSource.paging.number : this.pageNumber;
        },
        sort() {
          return this.currentDataSource && this.currentDataSource.sorting ? this.currentDataSource.sorting.field : '';
        },
        order() {
          return this.currentDataSource && this.currentDataSource.sorting ? this.currentDataSource.sorting.order : '';
        },
        filterText: 'filterText',
      }),
    ],
    props: {
        border: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        readonlyMode: { type: String, default: 'initial' },
        pageable: { type: String, default: '' },
        pageSize: { type: Number, default: 20 },
        pullRefresh: { type: Boolean, default: true },
        pullingText: { type: String, default: '下拉刷新' },
        loosingText: { type: String, default: '释放刷新' },
        successText: { type: String, default: '已刷新' },
        successDuration: { type: Number, default: 500 },
        pullDistance: { type: Number, default: 50 },
        notext: { type: Boolean, default: false },
        hiddenempty: { type: Boolean, default: false },
        striped: { type: Boolean, default: false },
        dataSource: [DataSource, Function, Object, Array],

        // override
        cancelable: { type: Boolean, default: true },

        selectable: {
          type: Boolean,
          default: true,
        },
        selectedIcon: String,
        unselectedIcon: String,
    },
    data() {
      return {
        refreshing: false,
      }
    },
    methods: {
        getDataSourceOptions() {
          return {
            viewMode: this.pageable === 'pagination' ? 'page' : 'more',
            paging: this.paging,
            filtering: this.filtering,
            getExtraParams: this.getExtraParams,
            refreshing: false,
          };
        },
        normalizeDataSource(dataSource) {
          const options = this.getDataSourceOptions();
          if (dataSource instanceof DataSource)
            return dataSource;
          if (dataSource instanceof Array) {
            options.data = Array.from(dataSource);
            return new DataSource(options);
          } if (dataSource instanceof Function) {
            const self = this;
            options.load = function load(params) {
              self.$emitSyncParams(params);
              const result = dataSource(params);
              if (result instanceof Promise)
                return result.catch(() => (this.currentLoading = false));
              if (result instanceof Array)
                return Promise.resolve(result);
              return Promise.resolve(result);
            };

            return new DataSource(options);
          } if (dataSource instanceof Object) {
            if (dataSource.hasOwnProperty('list') && Array.isArray(dataSource.list)) {
              return new DataSource(Object.assign(options, dataSource, {
                data: dataSource.list,
              }));
            }
            return new DataSource(Object.assign(options, dataSource));
          }
          return undefined;
        },
        async refresh() {
            // 分页器分页时忽略下拉刷新
            if (this.pageable === 'pagination') {
              return
            }
            this.refreshing = true;

            await this.reload();

            this.refreshing = false;
        },

        async reload() {
            // readme: 目前使用场景中存在着用户通过props间接改变组件内部状态后同步调用reload的情况，在这里等待组件内部状态更新完成。
            await new Promise((res) => { this.$nextTick(() => res()); });

            this.currentLoading = true;

            try {
              await this.currentDataSource.reload();

              const {
                paging: oldPaging,
              } = this.currentDataSource;
              let paging;

              if (oldPaging) {
                const { size, number } = oldPaging;
                paging = {
                  size,
                  oldSize: size,
                  number: 1,
                  oldNumber: number,
                };
              }
              this.$emit('page', paging, this);
              this.$emit('update:page-number', 1, this);
            } catch (error) {
              console.log(error);
            }

            this.currentLoading = false;
        },

        onScroll(e) {
          if (this?.$env.VUE_APP_DESIGNER) return;
          this.throttledVirtualScroll(e);
          if (this.currentLoading)
              return;
          if (!(this.pageable === 'auto-more' || (this.pageable === true && this.$options.isSelect)))
            return;

          const el = e.target;
          if (el.scrollHeight <= el.scrollTop + el.clientHeight+30 && this.currentDataSource && this.currentDataSource.hasMore()) {
            this.debouncedLoad(true);
          }
        },
    },
}
</script>

<style module>
.root {
    display: flex;
    flex-direction: column;
    background: var(--van-list-view-bgcolor);
    /* border: 1px solid var(--list-view-border-color); */
    border-radius: 4px;
    height: var(--van-list-view-height);
    min-width: 280px;
    max-width: 100%;
}

.root:focus {
    border-color: #e5e5e5;
    outline: none;
}

.status {
    color: #999999;
    text-align: center;
    padding: 5px 12px;
}

.root[disabled] {
    border: 1px solid #ebebeb;
}

.head {
    padding: 8px 12px;
    border-bottom: 1px solid e5e5e5;
}

.extra {
    float: right;
    color: #999;
}

.body {
    /* height: 100%; */
    flex: auto;
    user-select: none;
    /* overflow: auto; */
    position: relative;
}

.body .list[striped] > div:nth-of-type(odd) {
  background: var(--van-list-view-striped-background);
}

.root .body .list[selectable] > div > div {
  background: var(--van-list-view-item-unselected-backgroud);
}

.root .body .list[selectable] > div[selected] > div {
  background: var(--van-list-view-item-selected-backgroud);
}

.root[readonly-mode="initial"] .body {
    user-select: initial;
}

.root[disabled] .body {
    background: #fff;
}

.root[vusion-empty-background] .foot {
  display: none;;
}

.foot {
    /* background: var(--list-view-foot-background);
    padding: var(--list-view-foot-padding);
    border-top: 1px solid var(--list-view-border-color); */
}

.filter[class][class] {
    box-sizing: border-box;
    margin: 12px;
    width: calc(100% - 24px);

    height: var(--van-list-view-input-height);
    padding: 0 var(--van-list-view-input-padding-x);
    line-height: calc(var(--van-list-view-input-height) - var(--van-list-view-input-border-width) * 2);
    background: var(--van-list-view-input-background);
    border: var(--van-list-view-input-border-width) solid var(--van-list-view-input-border-color);
    border-radius: var(--van-list-view-input-border-radius);
    cursor: text;
    color: var(--van-list-view-input-color);
}

.filter[class][class] [class^="u-input_input__"]::placeholder {
  color: var(--van-list-view-placeholder-color);
}

.pagination {
    text-align: center;
    margin: 0 -12px;
}

/* .root[size^="normal"] { height: var(--list-view-height); }
.root[size^="large"] { height: var(--list-view-height-large); }
.root[size^="huge"] { height: var(--list-view-height-huge); }
.root[size^="full"] { height: 100%; }
.root[size^="auto"] { height: auto; }
.root[size$="normal"] { width: var(--list-view-width); }
.root[size$="large"] { width: var(--list-view-width-large); }
.root[size$="huge"] { width: var(--list-view-width-huge); }
.root[size$="full"] { width: 100%; }
.root[size$="auto"] { width: auto; } */


/* .root {
    height: 100vh;
} */
.scrollwrap {
  height: 100%;
  overflow-y: auto;
}
.root[vusion-designer] {
    height: auto;
}
</style>
