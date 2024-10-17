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
      "d": "M15.5.28v2.06c-.01.74-.02 1.63.3 2.7.38 1.23 1.2 2.73 3.15 4.3 2.15 1.76 4 4.8 4.05 7.64a5.42 5.42 0 01-1.82 4.28C19.9 22.4 18 23 15.5 23c-.5 0-.96-.2-1.2-.33-.72.24-1.5.33-2.3.33-.92 0-1.65-.2-2.23-.48A8.82 8.82 0 017 23c-2.95 0-4.74-2.53-5.12-5.16a8.1 8.1 0 013.38-7.87 29.32 29.32 0 004.31-3.73 7.67 7.67 0 00-.21-1.67l-.15-.71L15.5.28zM9.03 9.56c-.76.66-1.66 1.38-2.63 2.06a6.1 6.1 0 00-2.55 5.93C4.16 19.65 5.44 21 7 21c.35 0 .7-.03 1-.09-1.36-2.07-1.44-5.48.38-9.49.27-.69.48-1.3.65-1.86zm7.43 11.4a5.76 5.76 0 003.4-1.2A3.42 3.42 0 0021 17.02c-.03-2.1-1.49-4.64-3.32-6.13-2.22-1.8-3.3-3.63-3.79-5.26a9.13 9.13 0 01-.36-1.93l-2.07 1.18c.07.46.13 1.03.1 1.73-.03 1.34-.36 3.1-1.33 5.57l-.01.02-.01.02c-2.15 4.73-1.06 7.5.21 8.37.29.2.77.41 1.58.41a4.5 4.5 0 001.94-.35c.5-.24.87-.63 1.07-1.33.22-.76.24-1.9-.1-3.59a14.2 14.2 0 00-.74-2.3l-.11-.3c-.35-.9-.7-1.91-.9-3.2l-.14-1L15 8.66l.14.99c.16 1.07.46 1.92.79 2.79l.1.28c.3.78.63 1.63.84 2.62a9.7 9.7 0 01.07 4.54c-.12.4-.28.77-.48 1.1z"
    }
  }]
};
var Garlic = Vue.extend({
  name: "GarlicIcon",
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
      id: "garlic",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Garlic;
//garlic.js.map
