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
      "d": "M8.08 7.91c-.23.44-.47.9-.68 1.19a29.88 29.88 0 01-2.22 2.75C4.58 12.45 3.88 13 3 13H2v-2h1c.02 0 .22 0 .75-.55.5-.52 1.14-1.34 2.05-2.55.1-.14.25-.42.5-.89l.13-.26c.3-.56.68-1.27 1.15-1.94C8.48 3.5 9.9 2 12 2s3.52 1.5 4.42 2.8a18.76 18.76 0 011.28 2.21c.25.47.4.75.5.89a28.38 28.38 0 002.05 2.55c.53.54.73.55.75.55h1v2h-1c-.88 0-1.58-.54-2.18-1.15A29.88 29.88 0 0116.6 9.1a9.72 9.72 0 01-.68-1.19l-.12-.23c-.3-.55-.63-1.16-1.02-1.74C13.95 4.75 13.05 4 12 4c-1.05 0-1.95.75-2.78 1.94a16.83 16.83 0 00-1.14 1.97zM4 16v2h7v-2h2v2h7v-2h2v5h-2v-1h-7v1h-2v-1H4v1H2v-5h2z"
    }
  }]
};
var Parabola = Vue.extend({
  name: "ParabolaIcon",
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
      id: "parabola",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Parabola;
//parabola.js.map
