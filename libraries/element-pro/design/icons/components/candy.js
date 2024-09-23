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
      "d": "M14.31 3.54a2 2 0 013.4-1.24l3.99 3.98a2 2 0 01-1.24 3.4l-1.31.13a3 3 0 01-.36 3.81l-5.17 5.17a3 3 0 01-3.81.36l-.12 1.31a2 2 0 01-3.4 1.24L2.3 17.72a2 2 0 011.24-3.4l1.31-.13a3 3 0 01.36-3.81l5.17-5.17a3 3 0 013.81-.36l.12-1.31zm2.06 3.41l.67.68c.22.21.5.32.8.29l2.44-.22-3.98-3.98-.22 2.44a1 1 0 00.29.8zm-1.42 1.42l-1.74-1.75a1 1 0 00-1.42 0L9.91 8.5l5.59 5.59 1.88-1.88a1 1 0 000-1.42l-1.75-1.74-.67-.68zm-.86 7.13L8.5 9.91 6.62 11.8a1 1 0 000 1.42l4.17 4.17a1 1 0 001.42 0l1.88-1.88zm-7.47.54l-2.9.26 3.98 3.98.26-2.9-1.34-1.34z"
    }
  }]
};
var Candy = Vue.extend({
  name: "CandyIcon",
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
      id: "candy",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Candy;
//candy.js.map
