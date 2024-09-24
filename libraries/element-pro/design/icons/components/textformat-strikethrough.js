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
      "d": "M7.98 3.08A8.03 8.03 0 0112 2c2.46 0 4.29 1 6.06 2.16l.83.55-1.1 1.67-.84-.55C15.28 4.73 13.85 4 12 4c-.87 0-2.05.22-2.98.79A2.97 2.97 0 007.5 7.5c0 .46.07.83.2 1.13l.37.93-1.86.74-.37-.93A5.02 5.02 0 015.5 7.5c0-2.16 1.1-3.58 2.48-4.42zM4 11h16v2h-2.96c.85.8 1.46 1.93 1.46 3.5 0 2.16-1.1 3.58-2.48 4.42A8.03 8.03 0 0111.99 22c-2.45 0-4.28-.99-6.05-2.17l-.83-.55 1.11-1.67.84.56C8.72 19.28 10.14 20 11.99 20c.88 0 2.06-.22 2.99-.79a2.97 2.97 0 001.52-2.7c0-1.3-.64-2.06-1.55-2.57A9.92 9.92 0 0011.9 13H4v-2z"
    }
  }]
};
var TextformatStrikethrough = Vue.extend({
  name: "TextformatStrikethroughIcon",
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
      id: "textformat-strikethrough",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default TextformatStrikethrough;
//textformat-strikethrough.js.map
