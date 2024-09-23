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
      "d": "M13.95 5.7a3.36 3.36 0 10-4.75 4.76l.8.79h3.13a2.87 2.87 0 012.86 3.15l1.12-.26 3.69-3.68a3.36 3.36 0 00-4.75-4.75L15 6.76 13.95 5.7zm6.6 7.83c.05 0 .09 0 .13.02a2.56 2.56 0 01.66 4.8h-.03l-3.74 1.6-6.2 1.55H0v-7.25h4.09l2.05-2.05a3.25 3.25 0 011.25-.78A5.36 5.36 0 0115 3.96a5.36 5.36 0 017.21 7.91l-1.65 1.66zM3.5 16.25H2v3.25h1.5v-3.25zm2 3.25h5.63l5.8-1.45 3.53-1.5a.56.56 0 00-.41-1.03h-.02L13.6 17H10v-2H13.22a.87.87 0 00-.1-1.75H8.45a1.25 1.25 0 00-.89.36L5.5 15.66v3.84z"
    }
  }]
};
var UndertakeHoldUp = Vue.extend({
  name: "UndertakeHoldUpIcon",
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
      id: "undertake-hold-up",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default UndertakeHoldUp;
//undertake-hold-up.js.map
