<script>
import { sync } from '@lcap/vue2-utils';
import { UListView } from '../u-list-view.vue';
import MPreview from '../u-text.vue/preview';

export default {
    name: 'u-capsules',
    childName: 'u-capsule',
    extends: UListView,
    mixins: [MPreview, sync({
      value() {
        if (this.currentMultiple) {
          return this.selectedVMs.map((itemVM) => itemVM.value);
        }

        return this.selectedVM ? this.selectedVM.value : undefined;
      }
    })],
    props: {
      preview: { type: Boolean, default: false },
    },
};
</script>

<style module>
.root {
    /* @Private */
    user-select: none;
    display: inline-table;
    font-size: 0;
}

.root:focus {
    outline: var(--focus-outline);
}
</style>
