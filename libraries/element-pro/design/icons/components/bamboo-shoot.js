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
      "d": "M19.84 4.23l-.2.03c-.78.15-1.86.4-3.19.87l.53 2.62.24 1.17 1.17.12a23.08 23.08 0 001.45-4.81zm-2.34 6.73l-1.24-.12L9.22 9.7l1.8 10.36a40.02 40.02 0 006.48-9.1zM9.03 20.3L7.29 10.27A47.33 47.33 0 003.1 13.9a18.1 18.1 0 005.93 6.38zm1.66-12.37l4.43.71-.1-.48-.46-2.27a32.47 32.47 0 00-3.87 2.04zM22 2.08l-.01 1.08a5.03 5.03 0 01-.04.53c-.04.36-.11.87-.24 1.51a25.75 25.75 0 01-1.77 5.32c-1.53 3.41-4.2 7.72-8.85 12.37l-.48.48-.62-.27c-.94-.4-3.19-1.67-5.27-3.74a18.98 18.98 0 01-3.74-5.27l-.27-.62.48-.48a48.43 48.43 0 016.24-5.3c2.84-2.02 5.4-3.3 7.52-4.13 1.81-.7 3.3-1.07 4.33-1.26a14.43 14.43 0 011.65-.2l1.07-.02z"
    }
  }]
};
var BambooShoot = Vue.extend({
  name: "BambooShootIcon",
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
      id: "bamboo-shoot",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default BambooShoot;
//bamboo-shoot.js.map
