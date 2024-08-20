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
      "d": "M5.9 3.09A7.12 7.12 0 0112 0c2.78 0 4.8 1.23 6.1 3.08a11.23 11.23 0 011.78 6.87v.1l.91 2.28c.28.72.56 1.48.76 2.14.49 1.56.67 2.72.68 3.54.01.4-.02.75-.1 1.04-.04.14-.1.32-.2.48-.1.13-.34.45-.8.5-.44.06-.78-.15-.9-.23a2.85 2.85 0 01-.67-.62 7.33 7.33 0 01-.94 1.6c.2.1.39.2.55.33.35.26.6.6.7 1.01.08.4 0 .75-.16 1.02s-.4.41-.52.47c-.14.07-.29.12-.4.15-.26.07-.55.1-.84.14-.59.06-1.34.08-2.1.08-1.44 0-3.03-.09-3.85-.17-.82.08-2.4.16-3.85.17-.76 0-1.5-.02-2.1-.08-.3-.03-.58-.07-.83-.14a2.1 2.1 0 01-.4-.15c-.13-.06-.37-.2-.53-.47a1.4 1.4 0 01-.15-1.02c.09-.41.34-.75.7-1v-.01c.16-.12.34-.23.54-.34-.4-.5-.7-1.05-.94-1.6a5.6 5.6 0 01-.66.63c-.13.08-.47.3-.9.24-.46-.06-.71-.37-.8-.5-.11-.17-.17-.35-.21-.49-.08-.29-.11-.64-.1-1.04 0-.82.19-1.98.67-3.54.2-.66.49-1.42.76-2.13v-.02l.92-2.27a58.62 58.62 0 01-.01-.59c0-2.24.52-4.58 1.79-6.38zM4.07 16.27l1.85-3v3.52c0 1.05.56 2.52 1.84 3.6l1.4 1.19-1.32.4h.3c1.47 0 3.06-.09 3.75-.16l.11-.01h.11a41.78 41.78 0 004.06.17l-1.32-.4 1.4-1.18a5.01 5.01 0 001.83-3.6v-3.54l1.85 3v.01l.01.02.05.07v.01c-.08-.38-.2-.81-.35-1.3-.18-.6-.44-1.3-.7-2l-1.07-2.64v-.2a14.12 14.12 0 01.02-.76c0-1.97-.47-3.87-1.43-5.24A5.13 5.13 0 0012 2.01c-2.11 0-3.54.9-4.46 2.22A9.26 9.26 0 006.1 9.47v.7l.01.05v.2l-1.06 2.65c-.26.7-.52 1.4-.7 2m-.29 1.2l-.01.02-.04.07-.02.02c.09-.38.2-.82.35-1.3"
    }
  }]
};
var LogoQq = Vue.extend({
  name: "LogoQqIcon",
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
      id: "logo-qq",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoQq;
//logo-qq.js.map
