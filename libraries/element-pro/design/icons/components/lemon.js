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
      "d": "M3.6 12.34a6.84 6.84 0 001.23 4.6l.25.38-.57 2.18 2.17-.58.38.25c1.35.9 2.92 1.4 4.6 1.22 1.68-.19 3.6-1.06 5.63-3.1 2.04-2.04 2.91-3.95 3.1-5.63a6.87 6.87 0 00-1.22-4.6l-.25-.38.58-2.17-2.18.57-.38-.25a6.84 6.84 0 00-4.6-1.22c-1.67.18-3.59 1.05-5.63 3.1-2.05 2.04-2.92 3.96-3.1 5.63zm-1.98-.21c.24-2.23 1.39-4.55 3.67-6.84 2.29-2.28 4.6-3.43 6.84-3.67a8.74 8.74 0 015.54 1.3l1.55-.4h.04a1.95 1.95 0 012.23 2.25v.04l-.41 1.52a8.77 8.77 0 011.3 5.54c-.25 2.24-1.39 4.55-3.67 6.84-2.29 2.28-4.6 3.42-6.84 3.66a8.77 8.77 0 01-5.54-1.29l-1.52.4-.04.01a1.95 1.95 0 01-2.26-2.23l.01-.04.4-1.55a8.74 8.74 0 01-1.3-5.54zM7.88 9.3l1.41-1.42 1.42 1.42L9.3 10.7 7.88 9.3zm-.71 3.53l1.42-1.42L10 12.83 8.6 14.25l-1.42-1.42zm4.24-4.24l1.42-1.42 1.42 1.42L12.83 10 11.4 8.59z"
    }
  }]
};
var Lemon = Vue.extend({
  name: "LemonIcon",
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
      id: "lemon",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Lemon;
//lemon.js.map
