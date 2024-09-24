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
      "d": "M8.8 17.03h-.05c-1.15 0-2.25-.2-3.26-.53l-2.84 1.42.35-2.71a6.95 6.95 0 01-3-5.57c0-4.08 3.92-7.39 8.75-7.39 4.17 0 7.66 2.47 8.54 5.77a9.4 9.4 0 00-.6-.02c-4.36 0-8.19 3.04-8.19 7.11 0 .67.1 1.31.3 1.92zM6 8a1 1 0 100-2 1 1 0 000 2zm5.5 0a1 1 0 100-2 1 1 0 000 2z"
    }
  }, {
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M21.87 19.52A5.72 5.72 0 0024 15.16C24 11.76 20.75 9 16.75 9S9.5 11.76 9.5 15.16c0 3.4 3.25 6.16 7.25 6.16.95 0 1.86-.15 2.69-.43l2.43 1.4v-2.77zm-7.56-5.36a1 1 0 110-2 1 1 0 010 2zm4.88 0a1 1 0 110-2 1 1 0 010 2z"
    }
  }]
};
var LogoWechat = Vue.extend({
  name: "LogoWechatIcon",
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
      id: "logo-wechat",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoWechat;
//logo-wechat.js.map
