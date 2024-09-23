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
      "d": "M3.16 3h18.26v2H15.8c-.2 2.2-.37 5.14-.42 7.74-.02 1.49 0 2.85.07 3.9.04.53.1.95.15 1.26.06.29.1.39.1.39.64.81 2.55 1.31 4.59-.7l.71-.7 1.4 1.42-.7.7c-2.6 2.56-6 2.58-7.6.47a2.94 2.94 0 01-.46-1.2c-.08-.42-.14-.93-.18-1.5-.08-1.13-.1-2.56-.08-4.07.05-2.58.21-5.48.41-7.71h-3.46c-.17 2.46-.62 5.7-1.52 8.54a15.56 15.56 0 01-2.08 4.4 5.86 5.86 0 01-3.55 2.49l-.98.2-.38-1.97.98-.2c.82-.16 1.6-.72 2.31-1.7.72-.99 1.31-2.31 1.79-3.82.83-2.61 1.26-5.61 1.42-7.94H3.16V3zm12.55 15.29l-.01-.02.01.02z"
    }
  }]
};
var Pi = Vue.extend({
  name: "PiIcon",
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
      id: "pi",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Pi;
//pi.js.map
