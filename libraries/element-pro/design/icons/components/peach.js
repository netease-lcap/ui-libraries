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
      "d": "M9 1h1c1.2 0 2.05.63 2.62 1.36A2.75 2.75 0 0115 1h1v2h-1c-.36 0-.68.22-.94.93-.05.13-.1.26-.13.4a7.65 7.65 0 014.49 1.29c2.01 1.36 5 5.07 2.82 10.53-1.31 3.27-4.35 5.06-7.82 6-.27.24-.57.47-.88.68l-.44.3-.49-.2c-5.83-2.3-8.6-5.61-9.38-8.9a8.25 8.25 0 012.22-7.88 8.05 8.05 0 016.96-1.92l-.15-.3C10.91 3.3 10.5 3 10 3H9V1zm3.32 5.6a6.15 6.15 0 00-6.53 1.03 6.26 6.26 0 00-1.61 5.93c.56 2.4 2.6 5.18 7.66 7.3l.44-.36a14.25 14.25 0 002.26-2.55l.03-.05.02-.03.01-.02c.8-1.08 1.49-3.33 1.3-5.64-.2-2.27-1.2-4.43-3.58-5.62zm4.07 12.19a7.02 7.02 0 003-3.38c1.72-4.32-.6-7.12-2.1-8.14a5.59 5.59 0 00-1.77-.79 9 9 0 012.37 5.56 11.3 11.3 0 01-1.5 6.75z"
    }
  }]
};
var Peach = Vue.extend({
  name: "PeachIcon",
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
      id: "peach",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Peach;
//peach.js.map
