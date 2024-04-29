import { createNamespace, isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import { FieldMixin } from '../mixins/field';
import { ParentMixin } from '../mixins/relation';
import { Converter } from '../mixins/convertor';
import PreviewMixin from '../mixins/preview';

const [createComponent, bem] = createNamespace('checkbox-group');

export default createComponent({
  mixins: [ParentMixin('vanCheckbox'), FieldMixin, Converter, PreviewMixin],

  props: {
    dataSource: [Array, Object, Function, String],
    max: [Number, String],
    min: {
      type: Number,
      default: 0,
    },
    valueField: { type: String, default: 'value' },
    disabled: Boolean,
    direction: String,
    iconSize: [Number, String],
    checkedColor: String,
    value: {
      type: [Array, String],
      default: () => [],
    },
    converter: {
      type: String,
      default: 'json',
    },
    column: {
      type: Number,
    },
  },
  data() {
    return {
      currentValue: [],
      options: [],
    };
  },
  watch: {
    value(val) {
      this.currentValue = this.hasConverter ? this.currentConverter.set(val) : val;
    },
    dataSource: {
      deep: true,
      handler: 'update',
      immediate: true,
    },
  },
  computed: {
    hasConverter() {
      return this.converter && this.converter !== 'none';
    },
  },

  mounted() {
    this.currentValue = this.hasConverter ? this.currentConverter.set(this.value) : this.value || [];
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    fromValue(value) {
      try {
        if (value === undefined || value === null || value === '') return [];
        if (typeof value === 'string') return JSON.parse(value || '[]');
        if (typeof value === 'object') return value;
      } catch (err) {
        return [];
      }
    },
    toValue(value) {
      return Array.isArray(value) && value.length === 0 ? '[]' : JSON.stringify(value);
    },
    // @exposed-api
    toggleAll(options = {}) {
      if (typeof options === 'boolean') {
        options = { checked: options };
      }

      const { checked, skipDisabled } = options;

      const children = this.children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.checked;
        }
        return checked ?? !item.checked;
      });

      const names = children.map((item) => item.name);
      // this.currentValue = names;
      this.updateCurrentValue(names);
    },
    async update() {
      if (this.ifDesigner() && this.dataSource) {
        this.options = this.dataSource.map((item) => {
          item.disabled = true;
          return item;
        });
      } else if (isFunction(this.dataSource)) {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000,
          });
          this.options = formatResult(res);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = formatResult(this.dataSource);
      }
    },
    updateCurrentValue(value) {
      // 内部使用Array类型
      this.currentValue = value;

      // 对外使用converter转换
      if (this.hasConverter) {
        value = this.currentConverter.get(value);
      }

      this.$emit('input', value);
      this.$emit('update:value', value);
      this.$emit('change', {
        value,
      });
    },

    previewRender() {
      const nodes = [];

      if (this.$scopedSlots.default) {
        const slots = this.$scopedSlots.default();
        if (slots) {
          slots.forEach((slot) => {
            if (this.currentValue.includes(slot.componentOptions?.propsData?.label)) {
              nodes.push(slot);
            }
          });
        }
      }

      if (this.$scopedSlots.item) {
        this.options?.forEach((item, index) => {
          const slots = this.$scopedSlots.item({ item, index });
          if (slots) {
            slots.forEach((slot) => {
              if (this.currentValue.includes(slot.componentOptions?.propsData?.label)) {
                nodes.push(slot);
              }
            });
          }
        });
      }

      return <div class={bem([this.direction, this.isPreview ? 'preview' : ''])}>{nodes.length ? nodes : '--'}</div>;
    }
  },

  render() {
    // 水平排列时
    let itemWidth = 'auto';
    if (this.column > 0) {
      itemWidth = 100 / this.column + '%';
    }

    if (this.isPreview) {
      return this.previewRender();
    }

    return (
      <div class={bem([this.direction, this.isPreview ? 'preview' : ''])}>
        {this.options?.map((item, index) => (
          <div
            style={{
              position: 'relative',
              width: itemWidth,
            }}
          >
            {this.slots('item', { item, index })}
            {this.inDesigner() && index > 0 && <div class="mantle"></div>}
          </div>
        ))}
        {!this.slots() && this.options?.length === 0 && this.inDesigner() && <div style="text-align: center;width:100%">请绑定数据源或插入子节点</div>}
        {(this.slots() || []).map(item => (
          <div
            style={{
              position: 'relative',
              width: itemWidth,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  },
});
