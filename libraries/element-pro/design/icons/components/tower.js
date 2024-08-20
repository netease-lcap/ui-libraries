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
      "d": "M13 1v1h3v6h-.98c.08 1.87.37 4.35.9 6.73.32 1.41.72 2.77 1.2 3.93.35.86.74 1.57 1.14 2.11l.2.23H20v2h-6v-2h1.67l-.27-.25a9.95 9.95 0 00-1.75-1.25A3.6 3.6 0 0012 19a3.6 3.6 0 00-1.65.5A9.95 9.95 0 008.33 21H10v2H4v-2h1.54l.2-.23c.4-.54.79-1.25 1.14-2.11a24.5 24.5 0 001.2-3.93c.53-2.38.82-4.86.9-6.73H8V2h3V1h2zm-2.02 7a42.03 42.03 0 01-.95 7.17c-.2.89-.44 1.77-.7 2.62l.07-.04A5.56 5.56 0 0112 17a5.56 5.56 0 012.68.79 30.7 30.7 0 01-.7-2.62A42.03 42.03 0 0113.01 8h-2.04zM10 6h4V4h-4v2z"
    }
  }]
};
var Tower = Vue.extend({
  name: "TowerIcon",
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
      id: "tower",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Tower;
//tower.js.map
