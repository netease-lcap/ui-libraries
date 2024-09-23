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
      "d": "M12 1.84l7 4.09v5.4A8.76 8.76 0 0121.61 13 4.2 4.2 0 0123 16c0 1.96-1.57 3.47-3.48 4.43A17.2 17.2 0 0112 22a17.2 17.2 0 01-7.52-1.57C2.57 19.47 1 17.96 1 16a4.2 4.2 0 011.39-2.99A8.76 8.76 0 015 11.33v-5.4l7-4.09zM5 13.56c-.5.28-.9.58-1.21.88C3.22 15 3 15.53 3 16c0 .8.67 1.79 2.38 2.64C7.02 19.46 9.36 20 12 20s4.98-.54 6.62-1.36C20.32 17.8 21 16.8 21 16c0-.47-.22-1-.79-1.56-.31-.3-.72-.6-1.21-.88v.51l-7 4.09-7-4.09v-.51zm12-.63V8.36l-4 2.23v4.67l4-2.33zm-6 2.33v-4.67L7 8.36v4.57l4 2.33zm-3.12-8.7L12 8.86l4.12-2.3L12 4.16l-4.12 2.4z"
    }
  }]
};
var Map3D = Vue.extend({
  name: "Map3DIcon",
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
      id: "map-3d",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Map3D;
//map-3d.js.map
