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
      "d": "M17.13.9l-.1 1.19-.02.39a4.5 4.5 0 004.9 4.49l1.19-.1-.1 1.18a6.5 6.5 0 01-2.17 4.3c.74.9 1.19 2.05 1.19 3.3a5.34 5.34 0 01-3.32 4.9l-.92.4L17 19.1l.93-.39a3.34 3.34 0 002.09-3.05 3.28 3.28 0 00-1.75-2.89 3.62 3.62 0 00-1.76-.45h-.06l-.85.02-.15-.85a4.3 4.3 0 00-3.24-3.37 4.61 4.61 0 00-1.17-.14 4.3 4.3 0 00-4.34 4.2c0 .27.03.53.08.78l.18.95-.95.21A2.5 2.5 0 004 16.52c0 .95.57 1.8 1.43 2.21l.9.44-.86 1.8-.9-.43A4.46 4.46 0 012 16.53a4.46 4.46 0 012.7-4.08v-.26c0-3.15 2.4-5.7 5.47-6.14A6.5 6.5 0 0115.95 1l1.18-.1zm-4.9 5.18l.46.1a6.33 6.33 0 014.54 4.19 5.6 5.6 0 012.05.67 4.51 4.51 0 001.5-2.1 6.5 6.5 0 01-5.73-5.72 4.52 4.52 0 00-2.82 2.86zm1.65 7.58l-2.06 3.32h4.02l-4.03 6.38-1.69-1.07 2.09-3.31H8.23l3.95-6.38 1.7 1.06z"
    }
  }]
};
var ThunderstormNight = Vue.extend({
  name: "ThunderstormNightIcon",
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
      id: "thunderstorm-night",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default ThunderstormNight;
//thunderstorm-night.js.map
