import { sync } from '@lcap/vue2-utils';
import { createNamespace, isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import { FieldMixin } from '../mixins/field';
import { ParentMixin } from '../mixins/relation';
import PreviewMixin from '../mixins/preview';

const [createComponent, bem] = createNamespace('radio-group');

export default createComponent({
  mixins: [
    ParentMixin('vanRadio'),
    FieldMixin,
    PreviewMixin,
    sync({
      value: 'datatemp',
      data: 'options',
      preview: 'isPreview',
      readonly: 'readonly',
      disabled: 'disabled',
    }),
  ],

  props: {
    isNew: Boolean,
    icon: String,
    dataSource: [Array, Object, Function, String],
    value: null,
    disabled: Boolean,
    readonly: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String],
    column: {
      type: Number,
    },
  },
  data() {
    return {
      datatemp: this.value ?? null,
      options: [],
    };
  },
  watch: {
    value(value) {
      this.datatemp = value;
    },
    datatemp(val) {
      this.$emit('input', val);
      this.$emit('update:value', val);
      this.$emit('change', val);
    },
    dataSource: {
      deep: true,
      handler: 'update',
      immediate: true,
    },
  },
  computed: {
    currentIcon() {
      return this.icon || (this.isNew ? undefined : 'sure');
    },
  },
  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
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

    previewRender() {
      const nodes = [];

      if (this.$scopedSlots.default) {
        const slots = this.$scopedSlots.default();
        if (slots) {
          slots.forEach((slot) => {
            if (this.datatemp === slot.componentOptions?.propsData?.name) {
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
              if (this.datatemp === slot.componentOptions?.propsData?.name) {
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
      <div class={bem([this.direction])}>
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
        {(this.slots() || []).map((item) => (
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
