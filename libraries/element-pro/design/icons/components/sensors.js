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
    "tag": "g",
    "attrs": {
      "clipPath": "url(#clip0_8726_7450)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M22 12c0-2.44-.87-4.67-2.32-6.4l-.64-.77 1.54-1.28.64.77a11.96 11.96 0 010 15.36l-.64.77-1.54-1.28.64-.77A9.96 9.96 0 0022 12zm-4.62-4.48a6.98 6.98 0 010 8.96l-.64.77-1.54-1.28.64-.77a4.98 4.98 0 000-6.4l-.64-.77 1.54-1.28.64.77zM12 10a2 2 0 110 4 2 2 0 010-4zM8.8 8.03l-.64.77a4.98 4.98 0 000 6.4l.64.77-1.54 1.28-.64-.77a6.98 6.98 0 010-8.96l.64-.77L8.8 8.03zm-3.84-3.2l-.64.77a9.96 9.96 0 000 12.8l.64.77-1.54 1.28-.64-.77a11.96 11.96 0 010-15.36l.64-.77 1.54 1.28z"
      }
    }]
  }]
};
var Sensors = Vue.extend({
  name: "SensorsIcon",
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
      id: "sensors",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Sensors;
//sensors.js.map
