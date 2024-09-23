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
      "d": "M11.5 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM8 7.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0zM4 20a4 4 0 014-4h3v-2H8a6 6 0 00-6 6v2h9.05v-2H4zM23.59 18s-1.67 4.5-6.09 4.5c-.97 0-1.81-.22-2.53-.56l-.97.97-1.41-1.41.71-.72A8.3 8.3 0 0111.41 18s1.67-4.5 6.09-4.5c.97 0 1.81.22 2.53.56l.97-.97 1.41 1.41-.71.72A8.31 8.31 0 0123.59 18zm-3.3-1.37l-3.76 3.75c.3.08.62.12.97.12 2.61 0 3.87-2.5 3.87-2.5s-.36-.7-1.08-1.37zm-1.82-1.01c-.3-.08-.63-.12-.97-.12-2.62 0-3.87 2.5-3.87 2.5s.35.71 1.08 1.37l3.76-3.75z"
    }
  }]
};
var UserInvisible = Vue.extend({
  name: "UserInvisibleIcon",
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
      id: "user-invisible",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default UserInvisible;
//user-invisible.js.map
