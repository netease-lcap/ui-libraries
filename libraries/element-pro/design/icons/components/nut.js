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
      "d": "M17.47 4.8a9.4 9.4 0 001.08-2.12l1.9.64a11.75 11.75 0 01-1.52 2.9 10.83 10.83 0 012.34 4.6c.47 2.06.25 4.4-1.5 6.13l-2.11 2.12-.73-.73c-1.9 1.7-4.1 2.97-6.26 3.5-2.47.59-5 .24-6.88-1.63-1.87-1.88-2.22-4.4-1.62-6.88a14.94 14.94 0 013.49-6.26l-.73-.73 2.12-2.12c1.73-1.72 4.06-1.95 6.11-1.5 1.6.35 3.14 1.13 4.31 2.08zm-1.25 1.56a8.67 8.67 0 00-3.49-1.68c-1.65-.37-3.18-.13-4.27.96l-.7.7 5.36 5.37h3.42v3.41l1.12 1.12.7-.7c1.1-1.1 1.34-2.63.96-4.28a8.85 8.85 0 00-1.7-3.48l-.65.66-.02.02-1.41-1.41.68-.69zm-.7 10.57l-.98-.98v-2.24h-2.25L7.07 8.49a12.9 12.9 0 00-2.96 5.31c-.48 2-.15 3.74 1.1 5 1.25 1.24 2.99 1.57 4.99 1.09a12.9 12.9 0 005.31-2.96z"
    }
  }]
};
var Nut = Vue.extend({
  name: "NutIcon",
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
      id: "nut",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Nut;
//nut.js.map
