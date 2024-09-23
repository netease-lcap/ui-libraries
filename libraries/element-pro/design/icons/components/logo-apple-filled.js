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
      "d": "M15.72 5.5c-.58 0-1.11.08-1.6.26-.5.17-.95.35-1.35.52-.41.17-.76.26-1.06.26-.32 0-.66-.09-1.05-.25-.38-.16-.8-.33-1.23-.49a4.07 4.07 0 00-1.41-.24 5.3 5.3 0 00-2.72.77 5.88 5.88 0 00-2.15 2.28c-.56 1-.84 2.24-.84 3.7 0 .92.1 1.84.32 2.76a14.87 14.87 0 002.06 4.78c.57.8 1.12 1.47 1.66 2.04.54.56 1.16.85 1.88.85.46 0 .87-.08 1.22-.23.34-.16.7-.31 1.1-.47.38-.16.86-.23 1.45-.23a3.85 3.85 0 011.93.45c.25.12.51.22.79.32.27.09.6.13 1 .13.51 0 .97-.13 1.38-.4.41-.28.8-.63 1.14-1.06.35-.42.69-.87 1.02-1.34a10.85 10.85 0 001.38-2.72l.17-.5-.5-.27a5.4 5.4 0 01-2.1-2.2c-.29-.58-.44-1.3-.44-2.13a4.7 4.7 0 011.18-3.23 5.96 5.96 0 011.27-1.1 4.9 4.9 0 00-2.58-1.96 5.91 5.91 0 00-1.92-.3zm-.8-1.87c.35-.42.63-.9.86-1.46a4.58 4.58 0 00.3-2.17 4.95 4.95 0 00-3.34 1.72c-.34.37-.63.83-.88 1.38a4.04 4.04 0 00-.36 1.96l.02.16c.1.02.2.03.31.03.52 0 1.06-.15 1.64-.46.58-.3 1.06-.7 1.44-1.16z"
    }
  }]
};
var LogoAppleFilled = Vue.extend({
  name: "LogoAppleFilledIcon",
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
      id: "logo-apple-filled",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoAppleFilled;
//logo-apple-filled.js.map
