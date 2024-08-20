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
      "d": "M3 1.59L22.41 21 21 22.41l-4.04-4.03c.03.2.04.4.04.62v2h-2v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2H0v-2a5 5 0 015-5h7c.21 0 .42.01.62.04l-2.35-2.36a4.99 4.99 0 01-6.45-6.44L1.6 3 3 1.59zm2.5 5.33V7a3 3 0 003.08 3L5.5 6.92zM8.5 4c-.12 0-.24 0-.36.02l-.99.12-.23-1.99.99-.12L8.5 2a5 5 0 014.97 5.59l-.12 1-1.99-.24.12-1L11.5 7a3 3 0 00-3-3zm12.08 1.65l.5.87a7 7 0 010 6.97l-.5.87-1.74-1 .5-.87a5 5 0 000-4.98l-.5-.87 1.74-1zm-3.04 1.74l.5.87a3.5 3.5 0 010 3.49l-.5.86-1.74-1 .5-.86a1.5 1.5 0 000-1.5l-.5-.86 1.74-1z"
    }
  }]
};
var UserTalkOff1 = Vue.extend({
  name: "UserTalkOff1Icon",
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
      id: "user-talk-off-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default UserTalkOff1;
//user-talk-off-1.js.map
