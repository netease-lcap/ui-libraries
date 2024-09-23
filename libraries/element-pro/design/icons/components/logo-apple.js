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
      "d": "M11.86 3.94a3.5 3.5 0 013.5-3.5h1.05v1.05a3.5 3.5 0 01-3.5 3.5h-1.05V3.94zM16.31 5c.6.04 2.19.2 3.61 1.29.42.32.82.72 1.18 1.22l.67.93-1.02.53c0 .01-.2.11-.44.31-.6.48-1.43 1.4-1.42 2.8a3.43 3.43 0 001.16 2.6c.5.46 1.01.68 1.1.73h.01l.94.3-.28.94-.1.27a11.81 11.81 0 01-1.58 3.03c-.45.63-.98 1.36-1.62 1.93a3.88 3.88 0 01-2.55 1.07c-.94.03-1.59-.24-2.1-.45l-.02-.01a3.6 3.6 0 00-3.21.02h-.03c-.47.2-1.07.44-1.9.48-1.1.03-1.97-.5-2.64-1.1a14.04 14.04 0 01-4-7.48c-.4-2.06-.28-4.33.86-6.23a6.42 6.42 0 015.4-3.13h.01c1-.03 1.94.33 2.6.58l.05.02.67.24c.2.06.3.07.34.07.02 0 .1 0 .28-.06l.64-.23.05-.02c.8-.3 2-.75 3.34-.65zm-.14 2a6 6 0 00-2.55.54l-.01.01c-.24.09-.5.19-.75.26a3 3 0 01-.86.15c-.33 0-.65-.08-.92-.16-.26-.07-.53-.18-.78-.27h-.02a5.26 5.26 0 00-1.9-.48h-.01a4.42 4.42 0 00-3.73 2.16c-.8 1.33-.94 3.06-.61 4.84a12.04 12.04 0 003.37 6.35c.48.43.87.6 1.24.59.45-.02.77-.14 1.24-.34h.01c.58-.23 1.3-.53 2.4-.53 1.07 0 1.76.29 2.3.51h.02c.5.21.81.34 1.31.32h.01c.44 0 .84-.18 1.26-.56.45-.4.86-.95 1.33-1.6a10.5 10.5 0 001.09-1.95 5.43 5.43 0 01-2.71-4.74 5.47 5.47 0 011.9-4.15A4.62 4.62 0 0016.18 7z"
    }
  }]
};
var LogoApple = Vue.extend({
  name: "LogoAppleIcon",
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
      id: "logo-apple",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoApple;
//logo-apple.js.map
