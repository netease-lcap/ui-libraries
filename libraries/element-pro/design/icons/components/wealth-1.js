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
      "d": "M5 7.97v3.53c0 .02.03.1.18.23.2.19.56.4 1.08.6 1.04.4 2.54.67 4.24.67 1.7 0 3.2-.27 4.24-.67.52-.2.87-.41 1.08-.6.15-.13.18-.21.18-.23V7.97a7.5 7.5 0 01-.54.23c-1.32.5-3.07.8-4.96.8-1.89 0-3.64-.3-4.96-.8A7.51 7.51 0 015 7.97zM18 5.5v6.52a5.5 5.5 0 11-4.9 8.78c-.8.13-1.69.2-2.6.2-1.89 0-3.64-.3-4.96-.8a5.45 5.45 0 01-1.7-.99A2.33 2.33 0 013 17.5v-12c0-.72.39-1.3.84-1.71a5.45 5.45 0 011.7-1C6.86 2.3 8.61 2 10.5 2c1.89 0 3.64.3 4.96.8.65.25 1.25.58 1.7.99.45.4.84.99.84 1.71zm-13 0c0 .02.04.1.18.23.2.19.56.4 1.08.6C7.3 6.73 8.8 7 10.5 7c1.7 0 3.2-.27 4.24-.67.52-.2.87-.41 1.08-.6.14-.13.17-.2.18-.23 0-.02-.04-.1-.18-.23-.2-.19-.56-.4-1.08-.6A12.3 12.3 0 0010.5 4c-1.7 0-3.2.27-4.24.67-.52.2-.87.41-1.08.6-.14.13-.17.2-.18.23zm0 8.47v3.53c0 .02.03.1.18.23.2.19.56.4 1.08.6 1.04.4 2.54.67 4.24.67.59 0 1.15-.03 1.68-.09a5.5 5.5 0 01.5-4.04c-.7.08-1.43.13-2.18.13-1.89 0-3.64-.3-4.96-.8a7.53 7.53 0 01-.54-.23zm12.5.03c-.13 0-.26 0-.39.02a3.5 3.5 0 10.39-.02z"
    }
  }]
};
var Wealth1 = Vue.extend({
  name: "Wealth1Icon",
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
      id: "wealth-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Wealth1;
//wealth-1.js.map
