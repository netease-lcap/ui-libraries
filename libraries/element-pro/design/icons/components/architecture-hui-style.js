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
      "d": "M12.8 1.4L12 .33l-.8 1.07-.02.02-.04.07a51.9 51.9 0 01-.9 1.14C9.67 3.37 8.87 4.36 8 5.34 7.13 6.33 6.23 7.3 5.43 8c-.4.36-.75.63-1.04.8-.24.16-.37.19-.4.2V8H2v1c0 .4.11.91.47 1.33.37.45.93.67 1.54.67v9H2v2h20v-2h-2v-9c.61 0 1.16-.22 1.54-.67.36-.42.46-.92.46-1.33V8h-2v1c-.03-.01-.15-.05-.4-.2a7.84 7.84 0 01-1.03-.8c-.8-.7-1.7-1.67-2.57-2.66a73.4 73.4 0 01-3.14-3.85l-.04-.07-.02-.02zM16.7 9H7.3c.73-.7 1.5-1.53 2.2-2.34A75.4 75.4 0 0012 3.64a88.21 88.21 0 002.5 3.02A37.9 37.9 0 0016.7 9zM6 11h12v9h-3v-3a3 3 0 00-6 0v3H6v-9zm7 9h-2v-3a1 1 0 112 0v3z"
    }
  }]
};
var ArchitectureHuiStyle = Vue.extend({
  name: "ArchitectureHuiStyleIcon",
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
      id: "architecture-hui-style",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default ArchitectureHuiStyle;
//architecture-hui-style.js.map
