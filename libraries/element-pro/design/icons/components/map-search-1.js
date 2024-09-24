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
      "d": "M9 3c1.15 0 2 .89 2 2.09 0 .8-.52 1.66-1.23 2.4-.27.3-.54.54-.77.73-.23-.2-.5-.44-.77-.73C7.53 6.75 7 5.9 7 5.1 7 3.89 7.84 3 9 3zm3.9 1.2A3.94 3.94 0 009 1a3.93 3.93 0 00-3.9 3.2H2V20h9v-2H4v-3.2l1.96-1.04 3.35 2.12 1.07-1.69-4.34-2.75L4 12.54V6.2h1.15a6.6 6.6 0 001.62 2.67 10.77 10.77 0 001.63 1.4l.04.02v.01h.01l.55.36.55-.36h.01l.04-.03a6.6 6.6 0 00.49-.36c.3-.25.72-.6 1.14-1.04a6.6 6.6 0 001.62-2.67H20v4.3h2V4.2h-9.1zm4.35 9.3a2.75 2.75 0 011.95 4.7h-.01a2.74 2.74 0 01-4.69-1.95 2.75 2.75 0 012.75-2.75zm4 5.33a4.75 4.75 0 10-1.41 1.41l1.66 1.67 1.41-1.4-1.67-1.68z"
    }
  }]
};
var MapSearch1 = Vue.extend({
  name: "MapSearch1Icon",
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
      id: "map-search-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MapSearch1;
//map-search-1.js.map
