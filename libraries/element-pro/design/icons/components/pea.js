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
      "d": "M22.87 3l.67 1.84L21 6.45V8c0 3.15-.54 5.83-1.8 7.95a9.98 9.98 0 01-5.88 4.47c-.91.28-2.42.56-3.43.58-3.57.06-6.6-1.55-8.15-3.35L1 16.78l.97-.62 4.44-2.82-.03-.02c-.88-.4-1.76-1-2.53-1.68a10.53 10.53 0 01-1.97-2.31A5.24 5.24 0 011 6.66v-.88l21.87-2.77zM8.68 11.9L13 9.16l.84-.54 4.84-3.06-15.5 1.96c.1.24.23.5.4.76.38.64.94 1.29 1.59 1.86a8.54 8.54 0 002.04 1.37c.58.27 1.08.39 1.47.39zm4.55-.52l-2.83 1.8 1.46 2.16-1.66 1.11-1.49-2.2-4.59 2.9A9.23 9.23 0 009.86 19c.79-.01 2.1-.25 2.87-.49a7.99 7.99 0 004.75-3.58C18.49 13.23 19 10.94 19 8v-.28l-4.08 2.59 1.45 2.27-1.68 1.08-1.46-2.28z"
    }
  }]
};
var Pea = Vue.extend({
  name: "PeaIcon",
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
      id: "pea",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Pea;
//pea.js.map
