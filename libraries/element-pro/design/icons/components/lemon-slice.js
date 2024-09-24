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
      "d": "M18 .6L1.6 17l.69.7a16.04 16.04 0 004.12 2.92c1.6.8 3.4 1.38 5.08 1.38A11.48 11.48 0 0023 10.49C23 8.8 22.42 7 21.62 5.4c-.8-1.6-1.86-3.08-2.92-4.12l-.7-.7zm2.9 8.79l-8.17-.7 5.24-5.25c.67.8 1.33 1.8 1.86 2.87.52 1.04.9 2.1 1.07 3.08zm-7.75 1.34l7.8.67a9.46 9.46 0 01-2.07 5.07l-5.73-5.74zm4.32 7.15a9.46 9.46 0 01-5.07 2.08l-.67-7.82 5.74 5.74zm-7.78-6.15l.7 8.17c-.98-.17-2.04-.55-3.08-1.07a14.97 14.97 0 01-2.87-1.86l5.25-5.24z"
    }
  }]
};
var LemonSlice = Vue.extend({
  name: "LemonSliceIcon",
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
      id: "lemon-slice",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LemonSlice;
//lemon-slice.js.map
