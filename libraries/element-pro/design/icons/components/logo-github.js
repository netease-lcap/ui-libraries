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
      "d": "M5.3 3.05c-.32 1.28 0 2.17.08 2.36l.23.58-.42.46A4.47 4.47 0 004 9.57c0 2.5.75 3.84 1.69 4.62.98.83 2.35 1.2 3.86 1.36l2.28.26-1.73 1.5c-.25.2-.61.74-.61 1.85v.34h.01V24h-2v-1-.56-.2-.74h-.56A4 4 0 013.82 20l-.55-.69a3 3 0 00-1-.8l-1.11-.56.9-1.8 1.1.56a5 5 0 011.67 1.35l.55.69a2 2 0 001.56.75h.55v-.34c0-.71.1-1.34.3-1.87a7.83 7.83 0 01-3.39-1.57C2.9 14.47 2 12.5 2 9.57 2 8 2.5 6.65 3.33 5.56c-.2-.8-.35-2.2.33-3.9l.17-.43.45-.15h.03a1.34 1.34 0 01.15-.04l.3-.04c.25 0 .57 0 .96.1.72.14 1.69.5 2.93 1.3a14.2 14.2 0 016.7 0 8.97 8.97 0 012.93-1.3 3.77 3.77 0 011.26-.06 1.64 1.64 0 01.15.03h.02v.01h.01l.45.15.17.43c.68 1.7.53 3.1.33 3.9A6.46 6.46 0 0122 9.57c0 2.93-.9 4.9-2.4 6.15-1 .85-2.2 1.3-3.4 1.57.2.53.31 1.16.31 1.87l-.01 3.09V24h-2v-1-.58-.19l.01-3.07c0-1.1-.36-1.65-.6-1.86l-1.74-1.5 2.27-.25c1.52-.17 2.89-.53 3.87-1.36.94-.78 1.69-2.13 1.69-4.62 0-1.3-.45-2.3-1.19-3.12l-.42-.46.23-.58a3.87 3.87 0 00.07-2.36c-.48.1-1.33.4-2.6 1.26l-.39.26-.44-.13a12.13 12.13 0 00-6.52 0l-.45.13-.38-.26a7.63 7.63 0 00-2.6-1.26z"
    }
  }]
};
var LogoGithub = Vue.extend({
  name: "LogoGithubIcon",
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
      id: "logo-github",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoGithub;
//logo-github.js.map
