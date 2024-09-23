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
      "d": "M5.9 12l4.33 1.15a2.1 2.1 0 010-2.3L5.9 12zm4.95-1.77a2.1 2.1 0 012.3 0L12 5.9l-1.15 4.34zm2.48-7.13l1.59 5.98 5.98 1.6a9 9 0 00-7.57-7.58zM18.1 12l-4.34-1.15a2.1 2.1 0 010 2.3L18.1 12zm-4.96 1.77a2.1 2.1 0 01-2.3 0L12 18.1l1.15-4.34zm-2.48 7.13l-1.59-5.98-5.98-1.6a9 9 0 007.57 7.58zM3.1 10.67l5.98-1.59 1.6-5.98a9 9 0 00-7.58 7.57zM13.33 20.9a9 9 0 007.57-7.57l-5.98 1.59-1.6 5.98zM1 12a11 11 0 1122 0 11 11 0 01-22 0zm11-.11a.11.11 0 100 .22.11.11 0 000-.22z"
    }
  }]
};
var Compass1 = Vue.extend({
  name: "Compass1Icon",
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
      id: "compass-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Compass1;
//compass-1.js.map
