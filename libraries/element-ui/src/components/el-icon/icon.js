import { kebabCase } from 'lodash';
import { onlineSvgIcon, ie11 } from 'online-svg-icon-vue2';

const isSvgUrl = (name) => {
  return name && name.indexOf('/') !== -1 && /\.svg/i.test(name);
};

export default {
  name: 'ElIcon',
  props: {
    name: {
      type: String,
      default: () => '',
    },
  },
  render(h) {
    if (isSvgUrl(this.name)) {
      return h(onlineSvgIcon, {
        props: {
          purecss: !ie11(),
          url: this.name,
        },
        style: {
          verticalAlign: 'middle',
        },
        on: this.$listeners,
      });
    }

    let name = this.name || 'picture-outline';
    if (!name.startsWith('Ri')) {
      name = `el-icon-${name}`;
    }
    return h('i', {
      class: kebabCase(name),
      on: this.$listeners,
    });
  },
};
