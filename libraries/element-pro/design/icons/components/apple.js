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
      "d": "M13 2v2.4l.15-.02.28-.05c.33-.06.7-.13 1.06-.17a5.57 5.57 0 013.5.72C20.61 6.34 22 9.1 22 12.5c0 4.28-2.71 8.3-6.19 9.44a3.38 3.38 0 01-2.4-.07l-.27-.1c-.42-.16-.7-.27-1.14-.27-.44 0-.72.1-1.13.27l-.28.1c-.62.23-1.36.41-2.4.07C4.72 20.8 2 16.78 2 12.5c0-3.4 1.38-6.16 4.01-7.62a5.56 5.56 0 013.5-.72c.37.04.73.1 1.06.17l.28.05.15.02V2h2zm-2 4.43a13.7 13.7 0 01-.5-.08l-.33-.06-.88-.14c-.7-.08-1.4-.03-2.3.47C5.12 7.66 4 9.66 4 12.5c0 3.56 2.29 6.7 4.81 7.54.46.15.71.09 1.1-.05l.18-.07c.43-.17 1.07-.42 1.91-.42.84 0 1.48.25 1.9.42l.2.07c.38.14.63.2 1.09.05C17.72 19.2 20 16.06 20 12.5c0-2.84-1.12-4.84-2.98-5.88-.92-.5-1.61-.54-2.31-.47-.3.03-.57.08-.88.14l-.34.06-.49.08v1.4c.17-.06.34-.14.5-.23l.86-.5 1 1.73-.86.5a4.98 4.98 0 01-5 0l-.87-.5 1-1.73.87.5c.16.09.33.17.5.23v-1.4z"
    }
  }]
};
var Apple = Vue.extend({
  name: "AppleIcon",
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
      id: "apple",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Apple;
//apple.js.map
