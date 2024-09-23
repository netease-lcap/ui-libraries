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
      "d": "M3 .59L5.41 3 4 4.41 1.59 2 3 .59zM22.41 2L20 4.41 18.59 3 21 .59 22.41 2zM10.36 3.3a.65.65 0 00-.65.52L7.43 14.49 6.2 15.71l2.7 2.7 1.53-1.53c.36-.35.56-.84.56-1.35V3.96a.65.65 0 00-.64-.66zM7.5 19.83l-2.7-2.7-.65.64 2.7 2.7.65-.64zM7.75 3.4A2.65 2.65 0 0112 1.88a2.64 2.64 0 014.25 1.52l2.16 10.1 4.27 4.27-5.53 5.53-5-5a3.9 3.9 0 01-.15-.16l-.15.16-5 5-5.53-5.53L5.6 13.5 7.75 3.4zm6.54.42a.65.65 0 00-1.29.14v11.57c0 .51.2 1 .56 1.35l1.53 1.53 2.7-2.7-1.22-1.22L14.3 3.82zm4.91 13.3l-2.7 2.7.65.65 2.7-2.7-.65-.65zM5.41 7L3 9.41 1.59 8 4 5.59 5.41 7zM20 5.59L22.41 8 21 9.41 18.59 7 20 5.59z"
    }
  }]
};
var GestureApplause = Vue.extend({
  name: "GestureApplauseIcon",
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
      id: "gesture-applause",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GestureApplause;
//gesture-applause.js.map
