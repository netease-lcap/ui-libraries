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
      "d": "M13.59 4c1.2 0 2.17.97 2.17 2.18 0 .22-.04.44-.13.68a4.2 4.2 0 00-1.37 1.38 2.17 2.17 0 01-2.84-2.06A2.16 2.16 0 0113.58 4zm3.97.87a4.18 4.18 0 00-6.95-1.62 4.18 4.18 0 00-5.15 5.5 4.16 4.16 0 00-1.87 5.81A4.18 4.18 0 006.19 22c1.3 0 2.47-.65 3.23-1.6a4.2 4.2 0 005.85-1.86 4.17 4.17 0 005.67-3.9c0-.42-.06-.85-.18-1.26a4.17 4.17 0 00-1.88-7 8.87 8.87 0 012.97-1.94l.94-.36-.7-1.87-.94.35a10.84 10.84 0 00-3.6 2.31zm1.37 9.57l.01.2a2.18 2.18 0 11-4.35-.11c.03-.4.16-.77.37-1.08a4.16 4.16 0 003.97.99zm-6.21-.8h-.2a2.16 2.16 0 01-2.17-2.17 2.14 2.14 0 01.96-1.8 4.16 4.16 0 002.34.68v.06c0 .45.07.88.2 1.28a4.1 4.1 0 00-1.13 1.95zM9.94 8.2c-.41.32-.76.72-1.02 1.17a2.17 2.17 0 01-1.74-2.13 2.18 2.18 0 012.38-2.17 4.18 4.18 0 00.38 3.13zm-1.58 3.1a4.26 4.26 0 00.52 2.2c-.39.3-.72.68-.98 1.1a2.17 2.17 0 11-1.23-4.17c.48.4 1.06.7 1.69.86zm1.9 3.68a4.16 4.16 0 002.45.66c.15.64.46 1.23.87 1.71a2.18 2.18 0 11-4.08-1.5v-.02c.17-.34.43-.64.76-.85zM7.29 16.7a4.32 4.32 0 00.67 2.31c-.41.59-1.08.98-1.78.98a2.18 2.18 0 01-1.22-3.97 4.16 4.16 0 002.33.68zm10.53-8.47a2.18 2.18 0 110 4.35 2.18 2.18 0 010-4.35z"
    }
  }]
};
var Grape = Vue.extend({
  name: "GrapeIcon",
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
      id: "grape",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Grape;
//grape.js.map
