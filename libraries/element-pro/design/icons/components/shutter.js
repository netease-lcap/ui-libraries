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
      "d": "M5.29 6L7.5 9.96l3.93-6.94A8.98 8.98 0 005.29 6zm8.36-2.85L11.47 7h8.01a9 9 0 00-5.83-3.85zM20.49 9h-4.53l4.03 7.16a8.96 8.96 0 00.5-7.16zm-1.77 8.99l-2.22-3.95-3.9 6.94a8.98 8.98 0 006.12-3zm-8.35 2.86L12.54 17H4.52a9 9 0 005.85 3.85zM3.51 15h4.53l-1.41-2.51-2.61-4.66a8.96 8.96 0 00-.5 7.17zm6.82 0h3.34l1.68-3-1.68-3h-3.33l-1.7 3 1.7 3zM3.3 5.28a10.98 10.98 0 0118.8 2.32 10.97 10.97 0 01-1.37 11.1A10.98 10.98 0 011 12c0-2.53.85-4.86 2.29-6.72z"
    }
  }]
};
var Shutter = Vue.extend({
  name: "ShutterIcon",
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
      id: "shutter",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Shutter;
//shutter.js.map
