import { createNamespace , isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import DataSourceMixin from '../mixins/support.datasource';
import Item from './item';

const [createComponent, bem] = createNamespace('for-components');


export default createComponent({
  mixins: [DataSourceMixin],
  props: {
    dataSource: {
      type: [Array, Object, Function, String],
      default: () => [],
    },
    // FIXME: typo column
    colnum: {
      type: Number,
      default: 5,
      validator: (val) => {
        return val >= 0;
      },
    },
    equalWidth: {
      type: Boolean,
      default: true,
    },
    wrap: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    options() {
      return this.divide(this.currentDataSource.data) || [];
    },
  },
  methods: {
    divide(arr) {
      if (!this.colnum) return [...arr];

      const num = this.colnum;
      const result = [];
      const arre = [...arr];
      while (arre.length > 0) {
        const temp = arre.splice(0, num);
        result.push(temp);
      }
      return result;
    },
    async update() {
      if (isFunction(this.dataSource)) {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000,
          });
          this.options = this.divide(formatResult(res));
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = this.divide(formatResult(this.dataSource));
      }

      console.log(this.options);
    },
    comIndex(index1, index2) {
      return index1 * this.colnum + index2;
    },

    // 兼容之前default插槽的使用
    renderItems() {
      if (this.colnum > 0) {
        return this.options.map((line, idx) => {
          return (
            <div key={idx} class={bem('frag')}>
              {line.map((item, index) => {
                const itemSlot = this.slots('item', {
                  item,
                  index: this.comIndex(idx, index),
                });
                const slot = this.slots('default', {
                  item,
                  index: this.comIndex(idx, index),
                });

                return (
                  <Item
                    key={index}
                    item={item}
                    equalWidth={this.equalWidth}
                    colnum={this.colnum}
                    index={this.comIndex(idx, index)}
                  >
                    {itemSlot || slot}
                  </Item>
                );
              })}
            </div>
          )
        })
      }

      return <div class={bem('frag', { nowrap: !this.wrap })}>
        {this.options.map((item, index) => {
          const itemSlot = this.slots('item', {
            item,
            index,
          });
          const slot = this.slots('default', {
            item,
            index,
          });
          return (
            <Item
              key={index}
              item={item}
              equalWidth={this.equalWidth}
              colnum={this.colnum}
              index={index}
            >
              {itemSlot || slot}
            </Item>
          );
        })}
      </div>;
    }
  },
  render() {
    return (
      <div class={bem}>
        {this.options.length > 0 ? this.renderItems() : this.slots()}
      </div>
    )
  }
});
