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
      "d": "M6.34 3.93l-.7.7a9 9 0 000 12.73l.7.71-1.41 1.42-.7-.71a11 11 0 010-15.56l.7-.7 1.41 1.41zm12.73-1.41l.7.7a11 11 0 010 15.56l-.7.7-1.41-1.4.7-.72a9 9 0 000-12.72l-.7-.71 1.41-1.41zm-9.54 4.6l-.71.7a4.5 4.5 0 000 6.36l.7.7-1.4 1.42-.72-.7a6.5 6.5 0 010-9.2l.71-.7L9.53 7.1zm6.36-1.42l.7.7a6.5 6.5 0 010 9.2l-.7.7-1.42-1.41.71-.7a4.5 4.5 0 000-6.37l-.7-.7 1.4-1.42zM10 11a2 2 0 113 1.73V23h-2V12.73A2 2 0 0110 11z"
    }
  }]
};
var BaseStation = Vue.extend({
  name: "BaseStationIcon",
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
      id: "base-station",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default BaseStation;
//base-station.js.map
