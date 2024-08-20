import { createNamespace, isDef } from '../utils';
import { ParentMixin } from '../mixins/relation';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

const [createComponent, bem] = createNamespace('collapse');

export default createComponent({
  mixins: [ParentMixin('vanCollapse')],

  props: {
    accordion: Boolean,
    valueprop: [String, Number, Array], // 废弃
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentValue: this.fromValue(this.value ?? this.valueprop) ?? (this.accordion ? '' : []),
    };
  },
  watch: {
    value(val) {
      this.currentValue = this.fromValue(val) ?? (this.accordion ? '' : []);
    },
    valueprop(val) {
      this.currentValue = this.fromValue(val) ?? (this.accordion ? '' : []);
    },
    accordion(val) {
      if (!this.fromValue(this.value ?? this.valueprop)) {
        this.currentValue = val ? '' : [];
      }
    },
  },
  computed: {
    hasLinkChild() {
      return this.children.some((child) => child.isLink);
    }
  },
  methods: {
    fromValue(value) {
      try {
        if (value === null || value === undefined) return null;

        if (!this.accordion && !Array.isArray(value)) {
          return [value]
        }

        return value;
      } catch (err) {
        return null;
      }
    },
    switch(name, expanded) {
      if (!this.accordion) {
        name = expanded
          ? this.currentValue.concat(name)
          : this.currentValue.filter((activeName) => activeName !== name);
      }
      this.$emit('input', name);
      this.$emit('update:value', name);
      this.$emit('update:valueprop', name);
      this.$emit('change', name);
      this.currentValue = name;
    },
  },

  render() {
    return (
      <div class={[bem(), { [BORDER_TOP_BOTTOM]: this.border }]}>
        {this.slots()}
      </div>
    );
  },
});
