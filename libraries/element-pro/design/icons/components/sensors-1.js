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
      "d": "M5.64 4.22l-.71.71a9.97 9.97 0 000 14.14l.7.7-1.4 1.42-.72-.7a11.97 11.97 0 010-16.97l.71-.71 1.42 1.41zm14.14-1.41l.7.7a11.97 11.97 0 010 16.98l-.7.7-1.42-1.41.71-.7a9.97 9.97 0 000-14.15l-.7-.7 1.4-1.42zM8.46 7.05l-.7.7a5.98 5.98 0 000 8.5l.7.7-1.41 1.41-.7-.7a7.98 7.98 0 010-11.32l.7-.7 1.41 1.41zm8.49-1.41l.7.7a7.98 7.98 0 010 11.32l-.7.7-1.41-1.41.7-.7a5.98 5.98 0 000-8.5l-.7-.7 1.4-1.41zM12 10a2 2 0 100 4 2 2 0 000-4zm-4 2a4 4 0 115 3.87v4.9h-2v-4.9A4 4 0 018 12z"
    }
  }]
};
var Sensors1 = Vue.extend({
  name: "Sensors1Icon",
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
      id: "sensors-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Sensors1;
//sensors-1.js.map
