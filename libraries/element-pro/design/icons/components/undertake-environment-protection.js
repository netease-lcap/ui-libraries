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
      "d": "M17 3.51c.21.26.45.56.68.9C18.42 5.47 19 6.61 19 7.5a2 2 0 11-4 0c0-.88.58-2.03 1.32-3.09.23-.34.47-.64.68-.9zm0-2.94l-.71.73-.02.01-.03.03a10.13 10.13 0 00-.47.52c-.3.35-.69.83-1.09 1.4C13.92 4.35 13 5.95 13 7.5a4 4 0 008 0c0-1.55-.92-3.15-1.68-4.24a17.71 17.71 0 00-1.56-1.92l-.03-.03h-.01V1.3L17 .57zM8.44 13.25a1.25 1.25 0 00-.89.36L5.5 15.66v3.84h5.63l5.8-1.45 3.53-1.5a.55.55 0 00-.41-1.03h-.02L13.6 17H10v-2h3.13a.88.88 0 000-1.75h-4.7zm7.55 1.15l3.55-.82a2.56 2.56 0 011.8 4.76l-.03.02-3.74 1.6-6.2 1.54H0v-7.25h4.09l2.05-2.05a3.25 3.25 0 012.3-.95h4.69a2.88 2.88 0 012.86 3.15zM3.5 16.25H2v3.25h1.5v-3.25z"
    }
  }]
};
var UndertakeEnvironmentProtection = Vue.extend({
  name: "UndertakeEnvironmentProtectionIcon",
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
      id: "undertake-environment-protection",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default UndertakeEnvironmentProtection;
//undertake-environment-protection.js.map
