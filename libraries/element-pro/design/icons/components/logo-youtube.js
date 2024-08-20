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
      "clipPath": "url(#clip0_8726_9984)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M8.93 2.5h6.14c1.83 0 3.3 0 4.45.16 1.2.16 2.21.5 3.02 1.3.8.8 1.14 1.82 1.3 3.02.16 1.15.16 2.62.16 4.45v1.14c0 1.83 0 3.3-.16 4.45a4.96 4.96 0 01-1.3 3.02c-.8.8-1.82 1.14-3.02 1.3-1.15.16-2.62.16-4.45.16H8.93c-1.83 0-3.3 0-4.45-.16a4.96 4.96 0 01-3.02-1.3 4.96 4.96 0 01-1.3-3.02A36.55 36.55 0 010 12.57v-1.14c0-1.83 0-3.3.16-4.45.16-1.2.5-2.21 1.3-3.02.8-.8 1.82-1.14 3.02-1.3C5.63 2.5 7.1 2.5 8.93 2.5zM4.74 4.64c-.97.13-1.5.37-1.86.74-.37.37-.61.89-.74 1.86C2 8.25 2 9.6 2 11.5v1c0 1.91 0 3.25.14 4.26.13.97.37 1.5.74 1.86.37.37.89.61 1.86.74 1.01.14 2.35.14 4.26.14h6c1.91 0 3.25 0 4.26-.14.97-.13 1.5-.37 1.86-.74.37-.37.61-.89.74-1.86.14-1.01.14-2.35.14-4.26v-1c0-1.91 0-3.25-.14-4.26-.13-.97-.37-1.5-.74-1.86-.37-.37-.89-.61-1.86-.74C18.25 4.5 16.9 4.5 15 4.5H9c-1.91 0-3.25 0-4.26.14zM8.8 6.96L17.5 12l-8.7 5.04V6.96zm2 3.47v3.14L13.5 12l-2.7-1.57z"
      }
    }]
  }]
};
var LogoYoutube = Vue.extend({
  name: "LogoYoutubeIcon",
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
      id: "logo-youtube",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoYoutube;
//logo-youtube.js.map
