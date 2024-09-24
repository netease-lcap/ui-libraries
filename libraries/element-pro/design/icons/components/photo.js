import { _ as _defineProperty } from '../_chunks/dep-c2acd464.js';
import { _ as _objectWithoutProperties } from '../_chunks/dep-c8089de6.js';
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
    "viewBox": "0 0 16 16",
    "width": "1em",
    "height": "1em"
  },
  "children": [{
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M11 8a3 3 0 11-6 0 3 3 0 016 0zm-1 0a2 2 0 10-4 0 2 2 0 004 0z",
      "fillOpacity": 0.9
    }
  }, {
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M6.05 2a.6.6 0 00-.5.27L4.73 3.5H2.01a.51.51 0 00-.51.51v8.48c0 .28.23.51.51.51h11.98c.28 0 .51-.23.51-.51V4.01a.51.51 0 00-.51-.51h-2.72l-.82-1.23a.6.6 0 00-.5-.27h-3.9zm.22 1h3.46l1 1.5h2.77V12h-11V4.5h2.77l1-1.5z",
      "fillOpacity": 0.9
    }
  }]
};
var Photo = Vue.extend({
  name: "PhotoIcon",
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
      id: "photo",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export { Photo as default };
//photo.js.map
