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
      "d": "M16 4a4 4 0 00-4 4v2h-1c-3.4 0-6.49-1.3-8.8-3.43A9.55 9.55 0 008 17.34l1.73.68-1.52 1.07c-.8.55-1.65 1.02-2.56 1.4A11 11 0 0020 10V8.47l.23-.27c.54-.67.93-1.17 1.28-1.66-.28.11-.55.2-.79.25l-.77.18-.35-.72A4 4 0 0016 4zm6.98 1.75l1.01.7-.56.83c-.42.6-.83 1.17-1.43 1.9V10A13 13 0 012.3 21.14L.05 19.8l2.58-.49c1.03-.19 2-.52 2.91-.96A11.5 11.5 0 01.81 4.26l.62-1.57 1.08 1.3C4.33 6.2 6.99 7.7 10 7.96A6 6 0 0120.95 4.6c.37-.16.76-.38 1-.58l.78-.63L24 4.95l-.78.63a4.4 4.4 0 01-.23.17z"
    }
  }]
};
var LogoTwitter = Vue.extend({
  name: "LogoTwitterIcon",
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
      id: "logo-twitter",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoTwitter;
//logo-twitter.js.map
