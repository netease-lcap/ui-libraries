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
      "d": "M15 2.72a4.55 4.55 0 00-7.02 4.1L2.08 19.3l-.01.02a2 2 0 002.62 2.62h.02l12.47-5.9A4.55 4.55 0 0021.28 9a4.57 4.57 0 00-.57-5.7A4.57 4.57 0 0015 2.71zm1.41 1.5a2.57 2.57 0 012.88.49c.98.97.98 2.6 0 3.58-.76.77-1.94.93-2.88.5a4.6 4.6 0 000-4.58zm3.38 6.2c.43.94.27 2.1-.5 2.87-.5.5-1.17.76-1.84.74L9.97 6.55c-.02-.67.24-1.34.74-1.84a2.56 2.56 0 013.58 0c.98.97.98 2.6 0 3.58l-.7.71.7.7a4.57 4.57 0 005.5.71zm-4.5 4.28L3.9 20.1 9.3 8.7l5.99 6z"
    }
  }]
};
var IceCream = Vue.extend({
  name: "IceCreamIcon",
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
      id: "ice-cream",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default IceCream;
//ice-cream.js.map
