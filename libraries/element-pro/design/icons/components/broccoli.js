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
      "d": "M12.62 4.17a3.22 3.22 0 014.37.1c.66.65.96 1.55.9 2.45a4.63 4.63 0 00-.38.05h-.04l-.99.2.39 1.96.98-.2a1.63 1.63 0 01.21-.02c.15 0 .33-.01.5.01.64.1 1.25.38 1.74.87a3.23 3.23 0 01-.08 4.57c-.3.29-.63.51-.97.68l-.81.37.27.84c.29.87.08 1.9-.65 2.62a2.52 2.52 0 01-3.57.07c-.37-.38-.6-.9-.68-1.47-.08-.67.08-1.36.43-1.88l.47-.68-1.84-1.84-.43-1.3-1.31-.44-1.02-1.02-.62.26c-.87.37-1.8.28-2.63-.22a3.23 3.23 0 01-.62-5.12 3.17 3.17 0 014.52.06c.72.73.86 1.32.96 2.09l.12.99 1.99-.26-.13-.99c-.1-.84-.3-1.77-1.08-2.75zM19.86 7a5.11 5.11 0 00-1.46-4.15c-2-2.01-5.25-1.97-7.3 0a5.23 5.23 0 00-5.77 8.67l-.15.62c-.15.53-.37 1.17-.65 1.81a11.22 11.22 0 01-1.72 3l-.7.7 4.23 4.25.71-.7c.32-.33 1.33-1.25 2.46-2 .57-.39 1.13-.7 1.62-.88.38-.14.65-.18.82-.17.2.74.56 1.44 1.13 2a4.52 4.52 0 006.4-.07 4.6 4.6 0 001.32-3.83 5.23 5.23 0 00.92-8.07A5.05 5.05 0 0019.85 7zm-8 9.15c-.5.01-.99.13-1.41.29-.71.26-1.42.67-2.05 1.09-.78.52-1.5 1.1-2.03 1.57l-1.51-1.52c.55-.8 1.1-1.86 1.51-2.85a16.9 16.9 0 00.8-2.3c.79.21 1.62.23 2.44 0l.27.28-1.42 1.41 1.42 1.42 1.41-1.42.89.89c-.16.37-.27.75-.33 1.14z"
    }
  }]
};
var Broccoli = Vue.extend({
  name: "BroccoliIcon",
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
      id: "broccoli",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Broccoli;
//broccoli.js.map
