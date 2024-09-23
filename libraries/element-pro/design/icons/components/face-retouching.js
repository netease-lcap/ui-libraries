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
      "d": "M4 .7l1.1 2.2L7.3 4 5.1 5.1 4 7.3 2.9 5.1.7 4l2.2-1.1L4 .7zM12 3c-.62 0-1.23.06-1.81.18l-.98.2-.4-1.96.97-.2a11 11 0 11-8.48 8.2l.24-.97 1.94.47-.23.97A9.03 9.03 0 0012 21a9 9 0 000-18zm2.51 5.93h2v2h-2v-2zm-7.05 0h2v2h-2v-2zm2.45 4.26l.49.87a1.83 1.83 0 003.2 0l.5-.87 1.74.97-.5.88a3.83 3.83 0 01-6.69 0l-.49-.88 1.75-.97zm10.92 7.63l-1.57.78 1.57.78.78 1.57.78-1.57 1.57-.78-1.57-.78-.78-1.57-.78 1.57z"
    }
  }]
};
var FaceRetouching = Vue.extend({
  name: "FaceRetouchingIcon",
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
      id: "face-retouching",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default FaceRetouching;
//face-retouching.js.map
