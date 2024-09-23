import { _ as _defineProperty } from '../_chunks/dep-a77ab85e.js';
import { _ as _objectWithoutProperties } from '../_chunks/dep-0acb3ad3.js';
import Vue from 'vue';
import IconBase from '../icon.js';
import useSizeProps from '../utils/use-size-props.js';
import 'classnames';
import '../utils/use-common-classname.js';
import '../utils/config-context.js';

var _excluded = ["size"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var element = {
  "tag": "svg",
  "attrs": {
    "fill": "none",
    "viewBox": "0 0 24 24",
    "width": "1em",
    "height": "1em"
  },
  "children": [{
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M12 3a9 9 0 00-9 9c0 5 3.71 8.9 8.65 8.9l-.15-.25-.02-.04a4.03 4.03 0 01-.65-2.37c.06-.94.5-1.86 1.41-2.62 1.03-.86 2.26-.88 3.22-.84.21 0 .42.01.6.03.77.04 1.37.07 1.95-.09 1.86-.5 2.89-1.73 3-3.32C21.31 6.62 17.1 3 12 3zM1 12A11 11 0 0112 1c5.93 0 11.42 4.29 11 10.53-.17 2.57-1.91 4.43-4.46 5.12-.94.25-1.94.2-2.71.15l-.45-.03c-.92-.03-1.45.05-1.86.39-.52.44-.68.86-.7 1.2a2.04 2.04 0 00.38 1.23c.1.15.24.38.35.6.12.24.28.61.3 1.02 0 .49-.2 1-.7 1.34-.43.27-.97.35-1.5.35C5.55 22.9 1 18.04 1 12zm8.75-5a2 2 0 114 0 2 2 0 01-4 0zm-4.72 3a2 2 0 114 0 2 2 0 01-4 0zm9.49 0a2 2 0 114 0 2 2 0 01-4 0z"
    }
  }]
};
var Palette = Vue.extend({
  name: "PaletteIcon",
  functional: true,
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    }
  },
  render: function render(createElement, context) {
    var props = context.props,
      data = context.data;
    var size = props.size,
      otherProps = _objectWithoutProperties(props, _excluded);
    var _useSizeProps = useSizeProps(size),
      className = _useSizeProps.className,
      style = _useSizeProps.style;
    var fullProps = _objectSpread(_objectSpread({}, otherProps || {}), {}, {
      id: "palette",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Palette;
//palette.js.map
