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
      "d": "M3.05 11a9 9 0 016.28-7.6 16.9 16.9 0 00-2.3 7.6H3.05zM11 1.05a11 11 0 000 21.9l.01.01.43.03a12.48 12.48 0 001.14 0l.43-.03a11 11 0 000-21.91v-.01L12.57 1a11.16 11.16 0 00-1.14 0l-.43.03zM12 3c1.7 2.26 2.77 5 2.97 8H9.03c.2-3 1.27-5.74 2.97-8zM7.03 13a16.9 16.9 0 002.3 7.6A9 9 0 013.05 13h3.98zM12 21c-1.7-2.26-2.77-5-2.97-8h5.94c-.2 3-1.27 5.74-2.97 8zm2.67-.4a16.9 16.9 0 002.3-7.6h3.98a9 9 0 01-6.28 7.6zm2.3-9.6a16.9 16.9 0 00-2.3-7.6 9 9 0 016.28 7.6h-3.98z"
    }
  }]
};
var Internet = Vue.extend({
  name: "InternetIcon",
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
      id: "internet",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Internet;
//internet.js.map
