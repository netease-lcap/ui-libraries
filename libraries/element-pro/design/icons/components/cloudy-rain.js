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
      "clipPath": "url(#clip0_8726_9655)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M17 1v2h-2V1h2zm-5.95 1.63l1.42 1.42-1.42 1.42-1.41-1.42 1.41-1.42zm9.9 0l1.42 1.42-1.42 1.42-1.42-1.42 1.42-1.42zm-9 3.43a6.3 6.3 0 00-7.25 6.4A4.46 4.46 0 002 16.53a4.46 4.46 0 002.57 4.01l.9.43.86-1.8-.9-.43A2.46 2.46 0 014 16.54a2.5 2.5 0 012-2.4l.96-.22-.19-.95A4.3 4.3 0 0111.1 8a4.29 4.29 0 014.34 3.5l.15.85.85-.02h.06c.64 0 1.24.17 1.76.45A3.3 3.3 0 0120 15.67c0 1.34-.84 2.52-2.09 3.05l-.92.39.78 1.84.92-.39a5.25 5.25 0 001.51-8.84 5 5 0 00-8.24-5.66zm2.12.65a3 3 0 014.41 3.98 5.6 5.6 0 00-1.26-.31 6.26 6.26 0 00-3.15-3.67zM22 8h2v2h-2V8zm-9 6h2v2h-2v-2zm-5 2h2v2H8v-2zm5 3h2v2h-2v-2zm-5 2h2v2H8v-2z"
      }
    }]
  }]
};
var CloudyRain = Vue.extend({
  name: "CloudyRainIcon",
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
      id: "cloudy-rain",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default CloudyRain;
//cloudy-rain.js.map
