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
      "d": "M13 1v2.06c.74.1 1.44.29 2.1.56l1.03-1.78 1.73 1-1.03 1.78c.58.45 1.1.96 1.54 1.54l1.79-1.03 1 1.74-1.79 1.02c.28.67.48 1.37.57 2.11H22v2h-2.06c-.1.74-.29 1.44-.56 2.1l1.78 1.03-1 1.73-1.79-1.02A8.04 8.04 0 0116 17.93V21h3v2H5v-2h3v-3.07a8.04 8.04 0 01-2.38-2.1l-1.78 1.04-1-1.74 1.78-1.03a7.94 7.94 0 01-.56-2.1H2v-2h2.06c.1-.74.29-1.44.56-2.1L2.84 6.86l1-1.73 1.79 1.04c.44-.58.95-1.1 1.53-1.54l-1.03-1.8 1.73-1 1.04 1.8a7.95 7.95 0 012.1-.57V1h2zm-3 17.75V21h4v-2.25a8.02 8.02 0 01-4 0zm5.44-2.83a6.03 6.03 0 001.65-1.75l.2-.35a5.97 5.97 0 00-.01-5.68l-.16-.27a6.03 6.03 0 00-2.06-2.03l-.13-.08a6 6 0 00-6.37 10.16L12 8.67l3.44 7.25zm-5.07.86a6.01 6.01 0 003.26 0L12 13.33l-1.63 3.45z"
    }
  }]
};
var FerrisWheel = Vue.extend({
  name: "FerrisWheelIcon",
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
      id: "ferris-wheel",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default FerrisWheel;
//ferris-wheel.js.map
