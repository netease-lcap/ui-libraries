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
      "d": "M10.13 22.26l-.59.23c-1.32.57-2.61.9-3.77.93a4.12 4.12 0 01-3.1-1.1 4.08 4.08 0 01-1.1-2.93c0-1.1.28-2.33.78-3.58 1-2.51 2.94-5.34 5.53-7.93a25 25 0 017.94-5.52c1.25-.5 2.47-.8 3.57-.79 1.1 0 2.16.32 2.94 1.1a4.14 4.14 0 011.1 3.1 10.33 10.33 0 01-.95 3.78v.01l-.46 1.05c.08.54.13 1.1.13 1.66v1.46h-2.43l-11.9.12c.27.88.71 1.64 1.3 2.2A4.06 4.06 0 0012 17.13a5 5 0 002.99-.97l.13-.1h6.34l-.36.72c-.1.18-.18.35-.29.53a10.13 10.13 0 01-10.68 4.95zm2.81-16.04a27.56 27.56 0 00-4.36 3.81h8.48l-.19-.64c-.44-1.48-2-2.75-3.93-3.17zM3.71 18.15c-.1.45-.14.86-.14 1.22 0 .76.21 1.24.51 1.54.32.32.83.53 1.65.51.42 0 .9-.08 1.43-.21a10.2 10.2 0 01-3.45-3.06zM21.06 7.68c.23-.74.35-1.4.37-1.95.01-.81-.2-1.33-.52-1.65-.3-.3-.78-.5-1.53-.51-.5 0-1.08.08-1.72.27 1.43.96 2.6 2.29 3.4 3.84zM6.82 6.82a27.25 27.25 0 00-4.93 6.55 10.16 10.16 0 0111-11.22 28 28 0 00-6.07 4.67z"
    }
  }]
};
var LogoIeFilled = Vue.extend({
  name: "LogoIeFilledIcon",
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
      id: "logo-ie-filled",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoIeFilled;
//logo-ie-filled.js.map
