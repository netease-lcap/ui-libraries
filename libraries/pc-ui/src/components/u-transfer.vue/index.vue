<template>
    <div :class="[$style.root, isPreview ? $style.preview : '']">
        <u-preview v-if="isPreview" :text="previewText"></u-preview>
        <u-list-view
            :class="$style.listView"
            multiple
            :checkbox="checkbox"
            :data-source="source"
            v-model="sourceValues"
            :text-field="textField"
            :value-field="valueField"
            :show-head="showHead"
            :title="sourceTitle"
            :show-foot="showFoot"
            :loading="loading"
            :error="error"
            :filterable="filterable"
            :filter-size="filterSize"
            :placeholder="placeholder"
            :clearable="clearable"
            :match-method="matchMethod"
            :case-sensitive="caseSensitive"
            :pageable="pageable"
            ref="source"
            :page-size="pageSize"
            empty-text="请从右侧添加"
            :readonly="readonly"
            :disabled="disabled"
        >
            <template #item="props">
                <slot name="item" v-bind="props"></slot>
            </template>
        </u-list-view>
        <div :class="$style.buttons">
            <u-button
                color="primary"
                shape="square"
                icon="left-arrow"
                role="reverse"
                :class="$style.button"
                :disabled="!targetValues.length || disabled"
                @click="reverse()"
            ></u-button>
            <u-button
                color="primary"
                shape="square"
                icon="right-arrow"
                role="forward"
                :class="$style.button"
                :disabled="!sourceValues.length || disabled"
                @click="forward()"
            ></u-button>
        </div>
        <u-list-view
            :class="$style.listView"
            multiple
            :checkbox="checkbox"
            :data-source="target"
            v-model="targetValues"
            :text-field="textField"
            :value-field="valueField"
            :show-head="showHead"
            :title="targetTitle"
            :show-foot="showFoot"
            :loading="loading"
            :error="error"
            :filterable="filterable"
            :filter-size="filterSize"
            :placeholder="placeholder"
            :clearable="clearable"
            :match-method="matchMethod"
            :case-sensitive="caseSensitive"
            :pageable="pageable"
            ref="target"
            :page-size="pageSize"
            empty-text="请从左侧添加"
            :readonly="readonly"
            :disabled="disabled"
        >
            <template #item="props">
                <slot name="item" v-bind="props"></slot>
            </template>
        </u-list-view>
        <slot></slot>
    </div>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import UListView from '../u-list-view.vue';
import UPreview from '../u-text.vue';
import MPreview from '../u-text.vue/preview';

export default {
    name: 'u-transfer',
    mixins: [
      MPreview,
      sync({
        readonly: 'readonly',
        preview: 'isPreview',
        disabled: 'disabled',
      }),
    ],
    components: {
      UPreview
    },
    props: {
        source: Array,
        target: Array,
        textField: UListView.props.textField,
        valueField: UListView.props.valueField,
        showHead: UListView.props.showHead,
        sourceTitle: { type: String, default: '列表' },
        targetTitle: { type: String, default: '列表' },
        loading: UListView.props.loading,
        error: UListView.props.error,
        showFoot: UListView.props.showFoot,
        filterable: UListView.props.filterable,
        filterSize: { type: String, default: 'medium' },
        checkbox: { type: Boolean, default: true },
        placeholder: UListView.props.placeholder,
        clearable: UListView.props.clearable,
        matchMethod: UListView.props.matchMethod,
        caseSensitive: UListView.props.caseSensitive,
        pageable: UListView.props.pageable,
        pageSize: UListView.props.pageSize,
        readonly: UListView.props.readonly,
        disabled: UListView.props.disabled,
        preview: { type: Boolean, default: false },
    },
    data() {
        return { sourceValues: [], targetValues: [] };
    },
    computed: {
      previewText() {
        if (!this.isPreview) {
          return '';
        }

        return (this.target || []).map((item) => this.$at(item, this.textField)).join('，') || '--';
      }
    },
    methods: {
        transfer(direction = 'forward', values) {
            const [from, to]
                = direction === 'forward' ? [this.source, this.target] : [this.target, this.source];
            const transfer = [];
            for (let i = 0; i < from.length; i++) {
                const item = from[i];
                if (values.includes(this.$at(item, this.valueField) || item)) {
                    from.splice(i--, 1);
                    to.push(item);
                    transfer.push(item);
                }
            }
            const transferValues = Array.from(values);
            values.splice(0, values.length);
            this.$refs.source.handleData();
            this.$refs.target.handleData();
            this.$emit(
                'transfer',
                {
                    source: this.source,
                    target: this.target,
                    transfer,
                    transferValues,
                },
                this,
            );
            this.$emit(
                'change',
                {
                    source: this.source,
                    target: this.target,
                    transfer,
                    transferValues,
                },
                this,
            );
        },
        forward(values) {
            this.transfer('forward', values || this.sourceValues);
        },
        reverse(values) {
            this.transfer('reverse', values || this.targetValues);
        },
    },
};
</script>

<style module>
.root {
    display: flex;
    align-items: center;
}

.listView {
    width: var(--transfer-width);
    height: var(--transfer-height);
}

.buttons {
    margin: 0 12px;
}

.button {
    display: block;
}
.button:not(:last-child) {
    margin-bottom: var(--transfer-button-space);
}

/* 修复穿梭框ide 样式问题 */
.button span:empty::after {
  content: none !important;
}
.root[size^="normal"] .listView {
    height: var(--transfer-height);
}
.root[size^="large"] .listView {
    height: var(--transfer-height-large);
}
.root[size^="huge"] .listView {
    height: var(--transfer-height-huge);
}
.root[size^="full"] .listView {
    height: 100%;
}
.root[size^="auto"] .listView {
    height: auto;
}
.root[size$="normal"] .listView {
    width: var(--transfer-width);
}
.root[size$="large"] .listView {
    width: var(--transfer-width-large);
}
.root[size$="huge"] .listView {
    width: var(--transfer-width-huge);
}
.root[size$="full"] .listView {
    width: 100%;
}
.root[size$="auto"] .listView {
    width: auto;
}
.preview .listView,
.preview .buttons {
  display: none;
}
</style>
