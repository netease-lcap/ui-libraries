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
      "d": "M13.5 4.56c1.65-.9 3.86-1.13 6.67-.69.11.69.22 1.71.14 2.86a8.43 8.43 0 01-1.6 4.66l-.16.2-.04.27v.02a3.95 3.95 0 01-.08.38 9.3 9.3 0 01-1.23 2.9l-.84-1.68-.96.72C13.65 15.51 10.9 16 9 16H8v1c0 .77 0 1.3-.1 1.8-.04.18-.09.35-.15.53l-4.01-4A8.2 8.2 0 015.98 15H7v-1c0-2.7.86-4 1.83-5.44L9.2 8 7.43 5.34l.11-.04a11.75 11.75 0 013.97-.47c.1.77.38 1.64.87 2.48a7.26 7.26 0 003.77 3.13l.94.35.7-1.88-.94-.35A5.26 5.26 0 0114.1 6.3a4.45 4.45 0 01-.6-1.73zm6.94 7.85a10.52 10.52 0 001.87-5.55c.12-1.8-.14-3.37-.34-4.12l-.17-.6-.62-.12c-3.42-.65-6.47-.5-8.85.9a7.65 7.65 0 00-1.34-.12 13.74 13.74 0 00-4.09.6c-.57.2-1.19.47-1.6.9l-.59.57L6.8 8a9.93 9.93 0 00-1.77 5.06c-.19.02-.4.04-.62.08-.86.13-2.03.4-2.96 1.03l-1.02.67 7.73 7.73.67-1.02A6.42 6.42 0 0010 17.96c1.7-.11 3.84-.54 5.61-1.52l1.12 2.25.98-.98a10.1 10.1 0 002.28-3.65 11.3 11.3 0 00.46-1.65zM17.5 4.58L18.92 6 17.5 7.4 16.08 6l1.42-1.42z"
    }
  }]
};
var Fish = Vue.extend({
  name: "FishIcon",
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
      id: "fish",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Fish;
//fish.js.map
