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
      "d": "M11.15 1.48L12 .07l.86 1.42.03.04a24.09 24.09 0 00.46.72c.3.48.74 1.12 1.22 1.77a18.9 18.9 0 001.55 1.85c.54.56.96.87 1.23.97.33.13.55.16.65.16h1v2h-1v2h4v2h-1v9H3v-9H2v-2h4V9H5V7h1c.1 0 .32-.03.65-.16.27-.1.7-.4 1.24-.97.51-.53 1.05-1.19 1.54-1.85a36 36 0 001.68-2.49l.03-.04zM8 9v2h8V9H8zm6.43-2a22.37 22.37 0 01-1.46-1.79c-.36-.48-.7-.95-.97-1.37-.28.41-.6.89-.97 1.37-.44.6-.94 1.23-1.46 1.79h4.86zM5 13v7h3v-5h8v5h3v-7H5zm9 7v-3h-4v3h4z"
    }
  }]
};
var CityAncient = Vue.extend({
  name: "CityAncientIcon",
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
      id: "city-ancient",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default CityAncient;
//city-ancient.js.map
