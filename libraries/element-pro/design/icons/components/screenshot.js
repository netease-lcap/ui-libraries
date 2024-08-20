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
      "d": "M2 2h20v14h-2V4H4v12H2V2zm3.4 7h2.83L12 12.8 15.77 9h2.83l-5.19 5.22 2.69 2.7a3.3 3.3 0 014.9 2.83A3.27 3.27 0 0117.71 23a3.27 3.27 0 01-2.98-4.62L12 15.63l-2.73 2.75A3.27 3.27 0 016.29 23 3.27 3.27 0 013 19.75a3.27 3.27 0 014.9-2.83l2.69-2.7L5.4 9zm12.31 9.5c-.72 0-1.28.57-1.28 1.25S16.99 21 17.7 21c.73 0 1.29-.57 1.29-1.25s-.56-1.25-1.29-1.25zm-11.42 0c-.73 0-1.29.57-1.29 1.25S5.56 21 6.29 21c.72 0 1.28-.57 1.28-1.25S7.01 18.5 6.3 18.5z"
    }
  }]
};
var Screenshot = Vue.extend({
  name: "ScreenshotIcon",
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
      id: "screenshot",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Screenshot;
//screenshot.js.map
