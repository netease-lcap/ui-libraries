import './index.css';
import { uid } from 'uid';
import Menu from 'element-ui/lib/menu';
import Submenu from 'element-ui/lib/submenu';
import MenuItem from 'element-ui/lib/menu-item';
import MenuItemGroup from 'element-ui/lib/menu-item-group';
import { registerComponent } from '@lcap/vue2-utils/plugins/index';
import * as plugins from './plugins';

export const ElMenu = registerComponent(Menu, plugins, {
  nativeEvents: [],
  slotNames: ['default'],
  methodNames: ['open', 'close'],
});

Submenu.props.index = {
  type: String,
  default: () => uid(),
  require: false,
};

MenuItem.props.index = {
  type: String,
  default: () => uid(),
  require: false,
};

MenuItem.props.link = {
  type: String,
};

MenuItem.props.destination = {
  type: String,
};

MenuItem.props.href = {
  type: String,
};

MenuItem.props.target = {
  type: String,
  default: '_self',
};
MenuItem.props.replace = {
  type: Boolean,
  default: false,
};

Menu.methods.handleItemClick = function (item) {
  const { index, indexPath } = item;
  const oldActiveIndex = this.activeIndex;
  const hasIndex = item.index !== null;

  if (hasIndex) {
    this.activeIndex = item.index;
  }

  this.$emit('select', index, indexPath, item);

  if (this.mode === 'horizontal' || this.collapse) {
    this.openedMenus = [];
  }

  const url = item.link || item.href || item.destination;
  if (item.destination && this.$router && item.target === '_self') {
    const handleError = (error) => {
      if (error) {
        this.activeIndex = oldActiveIndex;
      }
    };

    if (item.replace === true) {
      this.$router.replace(item.destination, handleError);
    } else {
      this.$router.push(item.destination, handleError);
    }
  } else if (url) {
    if (item.target === '_blank') {
      window.open(url);
      return;
    }

    if (item.replace === true) {
      window.location.replace(url);
      return;
    }

    window.location.href = url;
  }
};

export const ElSubmenu = Submenu;
export const ElMenuItem = MenuItem;
export const ElMenuItemGroup = MenuItemGroup;

export default ElMenu;
