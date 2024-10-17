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
      "d": "M17.13.92l-.1 1.19-.02.39a4.5 4.5 0 004.9 4.49l1.19-.1-.1 1.18a6.5 6.5 0 01-2.17 4.3c.74.9 1.19 2.06 1.19 3.31 0 2.98-2.5 5.34-5.5 5.34H6.6c-2.5 0-4.6-1.97-4.6-4.47a4.46 4.46 0 012.7-4.08v-.26c0-3.15 2.4-5.7 5.47-6.14a6.51 6.51 0 015.78-5.05l1.18-.1zm-4.9 5.18l.47.1a6.33 6.33 0 014.53 4.19c.73.09 1.4.32 2.02.66l.03.01a4.52 4.52 0 001.5-2.1 6.5 6.5 0 01-5.72-5.72 4.52 4.52 0 00-2.83 2.86zM11.11 8h-.07a4.3 4.3 0 00-4.34 4.21c0 .26.03.52.08.77l.18.95-.95.21A2.5 2.5 0 004 16.54a2.54 2.54 0 002.6 2.48h9.91c1.98 0 3.5-1.53 3.5-3.34a3.28 3.28 0 00-1.73-2.89 3.62 3.62 0 00-1.82-.45l-.86.02-.15-.85a4.3 4.3 0 00-3.23-3.37A4.61 4.61 0 0011.1 8z"
    }
  }]
};
var CloudyNight = Vue.extend({
  name: "CloudyNightIcon",
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
      id: "cloudy-night",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default CloudyNight;
//cloudy-night.js.map
