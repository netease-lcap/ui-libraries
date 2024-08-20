import _get from 'lodash/get';
import { createNamespace } from '../utils';
import { CheckboxMixin } from '../mixins/checkbox';

const [createComponent, bem] = createNamespace('checkbox');

export default createComponent({
  mixins: [
    CheckboxMixin({
      bem,
      role: 'checkbox',
      parent: 'vanCheckbox',
    }),
  ],
  props: {
    label: { type: String },
  },
  computed: {
    checked: {
      get() {
        if (this.parent) {
          return this.parent.currentValue.indexOf(this.name) !== -1;
        }
        return this.value;
      },

      set(val) {
        if (this.parent) {
          this.setParentValue(val);
        } else {
          this.$emit('input', val);
          // this.$emit('update:value', val);
        }
      },
    },
    name() {
      try {
        // 非数据源渲染出来的checkbox，使用label或者index作为name
        if(!this.parent.options?.length || (this.index >= this.parent.options?.length)) {
          return this.label ?? this.index;
        }
        // 从数据源渲染出来的checkbox，优先使用valueField
        const name = _get(
          this.parent.options[this.index],
          this.parent.valueField
        );
        return name ?? this.label ?? this.index;
      } catch (err) {
        console.log('checkbox获取name出错，', err)
        return ''
      }
    }
  },

  watch: {
    value: {
      handler(val, oldVal) {
        this.$emit('update:value', val);
        this.$emit('change', val);
        if (val === true && typeof oldVal === 'undefined') {
          if (this.parent) {
            this.setParentValue(val);
          }
        }
      },
      immediate: true,
    },
  },

  methods: {
    // @exposed-api
    toggle(checked = !this.checked) {
      // When toggle method is called multiple times at the same time,
      // only the last call is valid.
      // This is a hack for usage inside Cell.
      clearTimeout(this.toggleTask);
      this.toggleTask = setTimeout(() => {
        this.checked = checked;
      });
    },

    setParentValue(val) {
      const { parent } = this;
      const value = parent.currentValue.slice();
      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }

        /* istanbul ignore else */
        if (value.indexOf(this.name) === -1) {
          value.push(this.name);
          parent.updateCurrentValue(value);
          // parent.currentValue = value;
          // parent.$emit('input', value);
          // parent.$emit('update:value', value);
        }
      } else {
        const index = value.indexOf(this.name);
        if (parent.min && value.length <= parent.min) {
          return;
        }
        /* istanbul ignore else */
        if (index !== -1) {
          value.splice(index, 1);
          parent.updateCurrentValue(value);
          // parent.currentValue = value;
          // parent.$emit('input', value);
          // parent.$emit('update:value', value);
        }
      }
    },
  },
});
