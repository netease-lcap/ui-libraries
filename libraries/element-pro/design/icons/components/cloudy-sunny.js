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
      "clipPath": "url(#clip0_8726_9651)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M17 1v2h-2V1h2zm-5.95 1.63l1.42 1.42-1.42 1.42-1.41-1.42 1.41-1.42zm9.9 0l1.42 1.42-1.42 1.42-1.42-1.42 1.42-1.42zm-9 3.43a5 5 0 018.25 5.66c1.1.97 1.8 2.37 1.8 3.95 0 2.98-2.5 5.33-5.5 5.33H6.6C4.1 21 2 19.04 2 16.53a4.46 4.46 0 012.7-4.07v-.26a6.3 6.3 0 017.26-6.14zm2.12.65a6.26 6.26 0 013.15 3.67c.44.05.86.16 1.26.31a3 3 0 00-4.41-3.98zM11.1 8a4.3 4.3 0 00-4.4 4.2c0 .26.03.52.07.77l.19.95-.95.21A2.5 2.5 0 004 16.53 2.54 2.54 0 006.6 19h9.9c1.97 0 3.5-1.53 3.5-3.33a3.3 3.3 0 00-1.74-2.89 3.61 3.61 0 00-1.82-.45l-.85.02-.15-.84a4.29 4.29 0 00-3.23-3.38A4.6 4.6 0 0011.1 8zM22 8h2v2h-2V8z"
      }
    }]
  }]
};
var CloudySunny = Vue.extend({
  name: "CloudySunnyIcon",
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
      id: "cloudy-sunny",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default CloudySunny;
//cloudy-sunny.js.map
