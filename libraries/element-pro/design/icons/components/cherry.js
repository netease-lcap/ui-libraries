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
      "clipPath": "url(#clip0_8726_9446)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M17 .59L23.41 7 22 8.41l-1.94-1.94c-.65.8-1.5 1.98-2.26 3.34-1.03 1.85-1.82 3.91-1.81 5.8a4.56 4.56 0 01-.28 6.1 4.56 4.56 0 01-6.42 0 4.56 4.56 0 010-6.42 4.56 4.56 0 014.8-1.04 16 16 0 011.96-5.41c.56-1 1.16-1.9 1.7-2.66-.61.08-1.33.19-2.1.34-2.16.45-4.56 1.24-6.29 2.6a4.57 4.57 0 01-.65 5.59 4.56 4.56 0 01-6.42 0 4.56 4.56 0 010-6.42 4.57 4.57 0 015.67-.6c2.12-1.76 4.99-2.66 7.3-3.13.92-.19 1.77-.31 2.5-.4L15.58 2 17 .59zM7.3 9.7a2.56 2.56 0 00-3.6 0c-.97.97-.97 2.6 0 3.58.98.98 2.62.98 3.6 0 .97-.97.97-2.6 0-3.58zm7 7a2.56 2.56 0 00-3.6 0 2.56 2.56 0 000 3.58c.98.98 2.62.98 3.6 0 .97-.97.97-2.6 0-3.58z"
      }
    }]
  }]
};
var Cherry = Vue.extend({
  name: "CherryIcon",
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
      id: "cherry",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Cherry;
//cherry.js.map
