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
      "d": "M11 2.5a5 5 0 013.98 8.02h-1.22V7.57a2.76 2.76 0 10-5.52 0v4.1A5 5 0 0111 2.5zm5.91 8.75a7 7 0 10-8.67 2.69v1.16l-2.14-.47a1.88 1.88 0 00-1.97.79l-.94 1.41 4.3 5.6a2.76 2.76 0 002.18 1.07h7.09c1.18 0 2.24-.76 2.61-1.89l1.78-5.35c.42-1.23-.1-2.6-1.22-3.25l-3.02-1.76zM11 6.81c.42 0 .76.34.76.76v4.95h3.15a.76.76 0 01.39.1l3.62 2.12c.3.18.45.55.34.9l-1.79 5.34c-.1.31-.39.52-.71.52H9.67a.76.76 0 01-.6-.3l-3.42-4.45.1-.15 4.5 1V7.57c0-.42.33-.76.75-.76z"
    }
  }]
};
var GesturePress = Vue.extend({
  name: "GesturePressIcon",
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
      id: "gesture-press",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GesturePress;
//gesture-press.js.map
