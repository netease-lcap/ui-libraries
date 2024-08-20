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
      "d": "M12 1a11 11 0 110 22 11 11 0 010-22zM5.16 6.15L7.38 10l.22-.37A5.01 5.01 0 0112.1 7h7.38a9 9 0 00-14.33-.85zM3.93 8.02a9 9 0 006.43 12.84L12.58 17h-.5a5 5 0 01-4.49-2.64L3.93 8.02zm8.66 12.96A9 9 0 0020.5 9h-4.45l.24.42a5.01 5.01 0 010 5.16l-3.69 6.4zM9.4 13.5A3 3 0 0012 15h.04a2.99 2.99 0 002.53-1.45l.03-.05A3.06 3.06 0 0015 12a3.02 3.02 0 00-.4-1.5l-.03-.05A2.99 2.99 0 0012.07 9H12c-.12 0-.23 0-.35.02A3 3 0 009.4 10.5l-.05.1a2.99 2.99 0 000 2.8l.05.1z"
    }
  }]
};
var LogoChrome = Vue.extend({
  name: "LogoChromeIcon",
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
      id: "logo-chrome",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoChrome;
//logo-chrome.js.map
