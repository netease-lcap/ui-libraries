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
      "d": "M9.41 6a5 5 0 019.17 0A4.5 4.5 0 0123 10.5c0 1.22-.62 2.33-1.39 3.11-.46.48-1.05.9-1.69 1.14A5.3 5.3 0 0114.75 21H5.4A4.43 4.43 0 011 16.53a4.47 4.47 0 012.56-4.05l-.01-.28A6.16 6.16 0 019.41 6zm2.12.3a6.17 6.17 0 013.95 4.08 5.25 5.25 0 013.74 2.5c.31-.13.65-.35.97-.67.51-.53.81-1.16.81-1.71a2.5 2.5 0 00-2.94-2.46l-.92.16-.22-.91a3 3 0 00-5.4-1zM9.65 8a4.15 4.15 0 00-4.03 4.98l.17.93-.93.22A2.45 2.45 0 003 16.53C3 17.91 4.1 19 5.4 19h9.35A3.3 3.3 0 0018 15.67c0-.46-.09-.9-.25-1.3a3.25 3.25 0 00-3.05-2.04l-.87.02-.14-.85A4.14 4.14 0 009.65 8z"
    }
  }]
};
var CloudyDay = Vue.extend({
  name: "CloudyDayIcon",
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
      id: "cloudy-day",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default CloudyDay;
//cloudy-day.js.map
