import { sync } from '@lcap/vue2-utils';
import { createNamespace } from '../utils';
import { BORDER_TOP_BOTTOM, IDE_EMPTY_PROPS_TYPE, IDE_EMPTY_STRUCTURED } from '../utils/constant';
import { callInterceptor } from '../utils/interceptor';
import { ParentMixin } from '../mixins/relation';

const [createComponent, bem] = createNamespace('tabbar');

export default createComponent({
  mixins: [
    ParentMixin('vanTabbar'),
    sync({
      value: 'curvalue',
    }),
  ],

  props: {
    route: {
      type: Boolean,
      default: false,
    },
    zIndex: [Number, String],
    placeholder: Boolean,
    activeColor: String,
    beforeChange: Function,
    inactiveColor: String,
    value: {
      type: [Number, String],
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    return {
      height: null,
      curvalue: this.value
    };
  },

  computed: {
    fit() {
      if (this.safeAreaInsetBottom !== null) {
        return this.safeAreaInsetBottom;
      }
      // enable safe-area-inset-bottom by default when fixed
      return this.fixed;
    },
  },

  watch: {
    value: function(newValue) {
      this.curvalue = newValue;
      this.setActiveItem();
    },
    children: 'setActiveItem',
  },

  mounted() {
    if (this.placeholder && this.fixed) {
      // this.height = this.$refs.tabbar.getBoundingClientRect().height;
      const setHeight = () => {
        this.height = this.$refs.tabbar.getBoundingClientRect().height;
      };

      setHeight();
      // https://github.com/youzan/vant/issues/10131
      setTimeout(setHeight, 100);
    }
  },

  methods: {
    setActiveItem() {
      this.children.forEach((item, index) => {
        if (item.name) {
          item.nameMatched = item.name === this.curvalue
        } else {
          item.nameMatched = index === this.curvalue;
        }
      });
    },

    onChange(active) {
      if (active !== this.curvalue) {
        this.curvalue = active;
        this.setActiveItem();
        callInterceptor({
          interceptor: this.beforeChange,
          args: [active],
          done: () => {
            this.$emit('input', active);
            this.$emit('update:value', active);
            this.$emit('change', active);
          },
        });
      }
    },

    genTabbar() {
      return (
        <div
          ref="tabbar"
          style={{ zIndex: this.zIndex }}
          class={[
            { [BORDER_TOP_BOTTOM]: this.border },
            bem({
              unfit: !this.fit,
              fixed: this.fixed,
              designerEmpty: this.isDesignerEmptyStructured(),
            }),
          ]}
        >
          {this.slots()}
        </div>
      );
    },

    isDesignerEmptyStructured() {
      if (!this.ifDesigner()) {
        return false;
      }
      const slotsList = this.slots();
      return slotsList?.length === 1 ? !!slotsList.find((s, _) => {
        const { componentOptions } = s || {};
        const { propsData, tag } = componentOptions || {};
        return !!(propsData.type === IDE_EMPTY_PROPS_TYPE && tag === IDE_EMPTY_STRUCTURED);
      }) : false;
    },

    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
  },

  render() {
    if (this.placeholder && this.fixed) {
      return (
        <div class={bem('placeholder')} style={{ height: `${this.height}px` }}>
          {this.genTabbar()}
        </div>
      );
    }

    return this.genTabbar();
  },
});
