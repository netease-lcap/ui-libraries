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
        class: 'el-icon--online',
        props: {
          purecss: !ie11(),
          url: this.name,
        },
        style: {
          verticalAlign: 'middle',
        },
      });
    }

    return h('i', { class: kebabCase(this.name) });
  },
};
