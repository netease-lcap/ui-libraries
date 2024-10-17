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
      "d": "M14.55.91l.02 1v.18c.09 2.9.14 4.67-.48 6.21l-.14.34 6.34-6.34L21.7 3.7l-6.34 6.34.34-.14c1.54-.62 3.3-.57 6.21-.49h.18l1 .03-.06 2-1-.02c-3.18-.1-4.5-.1-5.59.33-.53.22-1.02.54-1.64 1.07.72-.15 1.45-.2 2.17-.15 1.7.11 3.31.76 4.94 1.87l.83.57-1.13 1.65-.82-.56a7.9 7.9 0 00-3.95-1.53 7.9 7.9 0 00-4.12 1 6.77 6.77 0 00-2.4 2.4l-.56.87-.48.74c-.36.53-.74 1.06-1.18 1.52a5.8 5.8 0 01-2.81 1.71 3.39 3.39 0 01-3.21-1 3.39 3.39 0 01-1-3.2 5.8 5.8 0 011.71-2.82c.46-.44 1-.82 1.52-1.18l.74-.48.87-.56a6.77 6.77 0 002.4-2.4 7.9 7.9 0 001-4.12A7.9 7.9 0 007.8 3.21l-.56-.82 1.65-1.13.57.83a9.87 9.87 0 011.87 4.94c.05.72 0 1.44-.15 2.17.53-.62.85-1.11 1.07-1.64.43-1.1.42-2.4.33-5.6l-.02-1 2-.05zm-5.5 12.77c-.63.67-1.34 1.2-2.01 1.65l-.96.63-.66.43c-.5.33-.91.64-1.23.94a3.85 3.85 0 00-1.15 1.8c-.1.46-.02.9.45 1.38.48.47.92.55 1.38.45.52-.1 1.15-.49 1.8-1.15.3-.32.6-.73.94-1.23a53.93 53.93 0 001.06-1.62c.45-.67.98-1.38 1.65-2l-.28-.28-.71-.72-.29-.28z"
    }
  }]
};
var GreenOnion = Vue.extend({
  name: "GreenOnionIcon",
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
      id: "green-onion",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GreenOnion;
//green-onion.js.map
