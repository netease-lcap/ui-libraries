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
      "d": "M4.55 5.5l.19.15c.3.22.81.45 1.53.66C7.7 6.73 9.72 7 12 7c2.28 0 4.3-.27 5.73-.7a5.53 5.53 0 001.72-.8 5.53 5.53 0 00-1.72-.8C16.3 4.26 14.28 4 12 4c-2.28 0-4.3.27-5.73.7a5.53 5.53 0 00-1.72.8zm12.62 3c-1.48.32-3.26.5-5.17.5-1.9 0-3.7-.18-5.17-.5L11 13.65v6.19A3 3 0 0013 17v-3.36l4.17-5.13zm4.33-3v.86l-6.5 8V17a5 5 0 01-5 5H9v-7.64l-6.5-8V5.5c0-.84.57-1.43 1.1-1.8.55-.38 1.29-.69 2.1-.93C7.37 2.3 9.59 2 12 2c2.41 0 4.64.29 6.3.77.81.24 1.55.55 2.1.94.53.36 1.1.95 1.1 1.79z"
    }
  }]
};
var Filter1 = Vue.extend({
  name: "Filter1Icon",
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
      id: "filter-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Filter1;
//filter-1.js.map
