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
      "d": "M12 4a2.91 2.91 0 00-2.89 2.94c0 1.63 1.3 2.93 2.89 2.93 1.58 0 2.89-1.3 2.89-2.93C14.89 5.3 13.59 4 12 4zM7.11 6.94A4.91 4.91 0 0112 2a4.91 4.91 0 014.89 4.94A4.91 4.91 0 0112 11.87a4.91 4.91 0 01-4.89-4.93zM5.9 14.12A2.91 2.91 0 003 17.07C3 18.7 4.3 20 5.89 20c1.58 0 2.89-1.3 2.89-2.94 0-1.63-1.3-2.93-2.9-2.93zM1 17.07a4.91 4.91 0 014.89-4.93 4.91 4.91 0 014.89 4.93A4.91 4.91 0 015.88 22 4.91 4.91 0 011 17.06zm17.11-2.93a2.91 2.91 0 00-2.89 2.93c0 1.64 1.3 2.94 2.9 2.94 1.57 0 2.88-1.3 2.88-2.94 0-1.63-1.3-2.93-2.89-2.93zm-4.89 2.93a4.91 4.91 0 014.9-4.93A4.91 4.91 0 0123 17.05 4.91 4.91 0 0118.11 22a4.91 4.91 0 01-4.89-4.94z"
    }
  }]
};
var Palette1 = Vue.extend({
  name: "Palette1Icon",
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
      id: "palette-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Palette1;
//palette-1.js.map
