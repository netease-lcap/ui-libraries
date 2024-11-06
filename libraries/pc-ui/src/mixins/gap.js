import { isNil } from 'lodash';

export default function Gap(GapEnums = ['shrink', 'none', 'mini', 'small', 'large', 'normal']) {
  return {
    props: {
      gap: {
        type: [String, Number],
      },
    },
    methods: {
      getGapAttrValue() {
        if (isNil(this.gap)) {
          return undefined;
        }
        return GapEnums.includes(this.gap) ? this.gap : 'normal';
      },
      getSpaceBaseValue() {
        const val = this.$vnode.data.staticStyle && this.$vnode.data.staticStyle['--space-base'];

        if (val) {
          return val;
        }

        return this.$vnode.data.style && this.$vnode.data.style['--space-base'];
      },
      setGapStyle(children) {
        const elements = children.filter((child) => child.tag && child.data);

        elements.forEach((child, i) => {
          if (elements.length === (i + 1)) {
            return;
          }
          if (!child.data.staticStyle) {
            child.data.staticStyle = {};
          }

          const gapProp = this.direction === 'horizontal' ? 'margin-right' : 'margin-bottom';

          if (
            this.gap
            && (this.gap === 'normal' || !GapEnums.includes(this.gap))
            && !child.data.staticStyle[gapProp]
          ) {
            const spaceBaseValue = this.getSpaceBaseValue();
            if (this.gap === 'normal' && spaceBaseValue) {
              child.data.staticStyle[gapProp] = spaceBaseValue;
            } else {
              child.data.staticStyle[gapProp] = typeof this.gap === 'number' ? `${this.gap}px` : this.gap;
            }
          }
        });
      },
    },
  };
}
