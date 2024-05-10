<script>
import { UListView } from '../u-list-view.vue';
import i18n from './i18n';
import { isIE } from '../../utils/dom';
import i18nMixin from '../../mixins/i18n';

export default {
    name: 'u-grid-view',
    groupName: 'u-grid-view-group',
    childName: 'u-grid-view-item',
    extends: UListView,
    // i18n,
    mixins: [i18nMixin('u-grid-view')],
    props: {
        repeat: { type: Number, default: 5 },
        showTitle: { type: Boolean, default: () => !isIE() }, // IE 默认不展示 title
    },
    computed: {
        itemWidth() {
            return 1 / this.repeat * 100 + '%';
        },
    },
};
</script>

<style module>
@import '../u-list-view.vue/index.css';

/** 避免父级设置了white-space:nowrap，导致item没有换行 */
.root {
    white-space: normal;
    border-radius: var(--grid-view-border-radius);
}

.body{
    margin: 0 calc(var(--grid-view-item-space) / (-2));
}

.root .item {
    padding: calc(var(--grid-view-item-space) / 2);
}

.pagination {
    text-align: right;
    margin: 0;
}
/** Bug-2854963854918912: foot 数据网格分页栏超出容器长度 */
.foot {
    padding: var(--grid-view-foot-padding);
    border-bottom-left-radius: var(--grid-view-border-radius);
    border-bottom-right-radius: var(--grid-view-border-radius);
}
</style>
