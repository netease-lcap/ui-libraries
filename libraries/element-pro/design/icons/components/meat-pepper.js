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
      "d": "M21.21 5.73l-.97.24c-1 .25-1.85.8-2.45 1.36a7.35 7.35 0 014.05 3.5c.86 1.67.54 3.31-.34 4.72a12.26 12.26 0 01-3.82 3.54c-1.56 1-3.33 1.81-4.96 2.39-1.6.56-3.16.91-4.32.92a4.31 4.31 0 01-3.15-.93 3.76 3.76 0 01-1.14-1.81c-.67-.2-1.3-.56-1.8-1.14-.69-.79-1.01-1.86-.94-3.15 0-1.16.36-2.68.92-4.22.58-1.57 1.4-3.25 2.42-4.75 1-1.48 2.22-2.84 3.6-3.7a5.24 5.24 0 014.73-.6 5.47 5.47 0 013.6 3.58 7.68 7.68 0 013.12-1.65l.97-.24.48 1.94zM17 9.18v1.47h-2V8c0-1.4-.43-3.26-2.62-4h-.02l-.02-.02c-.96-.37-1.95-.2-2.98.43a10.6 10.6 0 00-3 3.11 20.63 20.63 0 00-2.19 4.32c-.53 1.46-.8 2.73-.8 3.56v.06c-.06.9.17 1.44.44 1.75.28.33.71.54 1.27.61l.76.1.1.76c.08.56.3 1 .62 1.27.31.28.84.5 1.75.45h.06c.83 0 2.16-.27 3.69-.81 1.5-.53 3.13-1.29 4.54-2.19 1.43-.9 2.57-1.91 3.2-2.92.61-.96.71-1.85.26-2.72A5.35 5.35 0 0017 9.18z"
    }
  }]
};
var MeatPepper = Vue.extend({
  name: "MeatPepperIcon",
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
      id: "meat-pepper",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MeatPepper;
//meat-pepper.js.map
