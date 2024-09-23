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
      "d": "M12.16 2.64a7.2 7.2 0 013.4-.64c1.9 0 3.6.78 4.78 2.17a7.75 7.75 0 011.64 5.52c-.21 3.91-1.8 7.02-4.25 9.13A13.79 13.79 0 018.65 22a8.4 8.4 0 01-5.17-1.82 6.24 6.24 0 01-1.41-8.48c.72-1 1.77-1.74 3.04-2.3.35-.15.7-.3 1.09-.42 1.35-.46 1.88-.82 2.13-1.34.46-.94.88-1.73 1.3-2.4a6.69 6.69 0 012.53-2.6zm-.43 3.05c1.7 2.19 1.3 4.74-.24 6.22a4.1 4.1 0 01-3.23 1.14 4.88 4.88 0 01-2.99-1.5c-.71.39-1.22.83-1.58 1.32a4.25 4.25 0 001.04 5.75A6.4 6.4 0 008.65 20c3 0 5.74-.95 7.77-2.7 2.01-1.73 3.38-4.32 3.57-7.72a5.76 5.76 0 00-1.18-4.12A4.14 4.14 0 0015.56 4a5.3 5.3 0 00-2.48.41c-.44.23-.86.6-1.35 1.28zm-4.36 4.99c.39.24.76.35 1.08.38a2.1 2.1 0 001.65-.6c.65-.61 1.01-1.69.48-2.84-.14.28-.3.57-.45.9-.56 1.15-1.6 1.73-2.76 2.16z"
    }
  }]
};
var Bean = Vue.extend({
  name: "BeanIcon",
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
      id: "bean",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Bean;
//bean.js.map
