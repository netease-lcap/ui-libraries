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
      "d": "M9 1.84l6.07 3.55L22 2.5V11h-2V5.5l-4 1.67V11h-2V7.07l-4-2.33v12.19l1.87 1.09-1.01 1.72-1.93-1.13L2 21.5V5.93l7-4.09zm-1 15V4.73L4 7.07V18.5l4-1.67zM18 14a2.75 2.75 0 00-2.75 2.75c0 1.25.73 2.45 1.61 3.42.41.45.82.82 1.14 1.08.32-.26.73-.63 1.14-1.08.88-.97 1.61-2.17 1.61-3.42A2.75 2.75 0 0018 14zm0 9.7l-.55-.37h-.01l-.01-.01-.04-.03a7.12 7.12 0 01-.6-.45c-.39-.31-.9-.76-1.4-1.32-1-1.1-2.14-2.77-2.14-4.77a4.75 4.75 0 119.5 0c0 2-1.14 3.67-2.14 4.77a12.83 12.83 0 01-2 1.77l-.04.03-.01.01-.56.37zM16.75 16h2.5v2h-2.5v-2z"
    }
  }]
};
var MapLocation = Vue.extend({
  name: "MapLocationIcon",
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
      id: "map-location",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MapLocation;
//map-location.js.map
