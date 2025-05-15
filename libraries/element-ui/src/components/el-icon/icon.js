import { kebabCase } from 'lodash';
import { onlineSvgIcon, ie11 } from 'online-svg-icon-vue2';
import './index.css';

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
    icotype: {
      type: String,
      default: () => 'top',
    }
  },
  render(h) {
    const renderIcon = () => {
      if (isSvgUrl(this.name)) {
        return h(onlineSvgIcon, {
          class: 'el-icon--online el-p-icon',
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
      if (!name.startsWith('Ri') && !name.startsWith('ri-') && !name.startsWith('el-icon-')) {
        name = `el-icon-${name} el-p-icon`;
      } else {
        name = name.startsWith('Ri') ? kebabCase(name) : name;
      }
      return h('i', {
        class: name,
        on: this.$listeners,
      });
    };

    // 如果没有默认插槽内容，只渲染图标
    if (this.icotype === 'only') {
      return renderIcon();
    }

    // 根据 icotype 渲染不同布局
    const children = this.icotype === 'left' 
      ? [renderIcon(), this.$slots.default]
      : [renderIcon(), this.$slots.default];

    return h('span', {
      class: ['el-icon-wrapper'],
      style: {
        display: 'inline-flex',
        alignItems: this.icotype === 'left' ? 'center' : 'center',
        flexDirection: this.icotype === 'left' ? 'row' : 'column',
        gap: '4px'
      }
    }, children);
  },
};