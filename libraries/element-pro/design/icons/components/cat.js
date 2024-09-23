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
      "d": "M1 .66l6.48 1.92a11.24 11.24 0 019.04 0L23 .66v12.05C22.77 18.46 17.9 23 12 23 6.1 23 1.22 18.46 1 12.71V.66zm2 5.52c.6-.83 1.32-1.58 2.14-2.2L3 3.33v2.84zm0 6.14C3 17.08 7 21 12 21s9-3.92 9-8.68a8.66 8.66 0 00-4.99-7.77 9.23 9.23 0 00-8.02 0A8.66 8.66 0 003 12.32zm18-6.14V3.34l-2.14.63c.82.63 1.54 1.38 2.14 2.2zM9 9v3H7V9h2zm8 0v3h-2V9h2zm-5 3.26l.9 1.8c.37.75.85.98 1.18 1 .34.03.76-.13 1.09-.61l.55-.84 1.67 1.11-.56.83a3.2 3.2 0 01-2.91 1.5 3.16 3.16 0 01-1.92-.88c-.55.52-1.2.83-1.92.89a3.2 3.2 0 01-2.91-1.5l-.56-.84 1.67-1.1.55.83c.33.48.75.64 1.09.62.33-.03.8-.26 1.19-1.02l.89-1.79z"
    }
  }]
};
var Cat = Vue.extend({
  name: "CatIcon",
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
      id: "cat",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Cat;
//cat.js.map
