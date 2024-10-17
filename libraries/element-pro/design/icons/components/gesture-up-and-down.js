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
    "tag": "g",
    "attrs": {
      "clipPath": "url(#clip0_8792_7013)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M.5.51h5.7v5h-2V3.4a11 11 0 000 13.19v-2.1h2v4.99H.5v-2h1.87a13.01 13.01 0 010-14.98H.5v-2zM10 7.65a.76.76 0 00-1.3.75l5.01 8.69-4.4 1.38v.18l5.2 2.15c.2.09.45.07.66-.04l6.13-3.55a.76.76 0 00.37-.8l-1.13-5.53a.76.76 0 00-.74-.6l-4.2-.02a.76.76 0 00-.38.1l-2.74 1.58-2.47-4.3zM7.98 5.64c1.32-.76 3-.31 3.77 1l1.48 2.56 1-.57c.42-.25.9-.38 1.39-.37l4.2.02c1.3 0 2.42.92 2.68 2.2L23.63 16a2.76 2.76 0 01-1.33 2.94l-6.13 3.55c-.74.43-1.64.49-2.43.16l-6.52-2.7.1-1.69c.06-.77.58-1.44 1.32-1.67l2.1-.66L6.96 9.4c-.77-1.32-.31-3 1-3.76z"
      }
    }]
  }]
};
var GestureUpAndDown = Vue.extend({
  name: "GestureUpAndDownIcon",
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
      id: "gesture-up-and-down",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GestureUpAndDown;
//gesture-up-and-down.js.map
