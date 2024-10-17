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
      "d": "M7.9 3.98a9.02 9.02 0 00-4.67 6 26.9 26.9 0 007.88-1.56 34.1 34.1 0 00-3.2-4.44zm-4.9 8V12c0 2.15.75 4.12 2 5.66 1.94-2.69 4.7-4.76 7.91-5.83-.25-.56-.52-1.1-.8-1.64A28.9 28.9 0 013 11.99zm3.45 7.1a8.96 8.96 0 009.07 1.2c-.39-2.28-1-4.5-1.82-6.6a14.04 14.04 0 00-7.25 5.4zm9.2-5.88a35.74 35.74 0 011.71 6.03 9 9 0 003.55-5.93 14.07 14.07 0 00-5.25-.1zm5.32-1.92a8.95 8.95 0 00-1.9-4.84 28.98 28.98 0 01-5.1 2.98c.32.62.62 1.25.9 1.89a16.08 16.08 0 016.1-.03zM13 7.67A26.96 26.96 0 0017.66 5 8.96 8.96 0 009.9 3.25a36.09 36.09 0 013.09 4.42zM1.05 10.9a11 11 0 1121.91 2.2 11 11 0 01-21.9-2.2z"
    }
  }]
};
var LogoDribbble = Vue.extend({
  name: "LogoDribbbleIcon",
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
      id: "logo-dribbble",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoDribbble;
//logo-dribbble.js.map
