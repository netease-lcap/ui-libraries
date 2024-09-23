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
      "d": "M18.6 5.2A11 11 0 004.22 6.22l-.7.71L2.1 5.52l.7-.71a13 13 0 0116.68-1.44V1.5h2v5.7H16.5v-2h2.1zM9.24 7.57a2.76 2.76 0 115.52 0v2.95h1.15c.5 0 .97.13 1.4.38L20.92 13a2.76 2.76 0 011.22 3.25l-1.78 5.35a2.76 2.76 0 01-2.61 1.89h-7.09c-.86 0-1.66-.4-2.19-1.08l-4.3-5.59.95-1.41a1.88 1.88 0 011.97-.8l2.14.48V7.57zM12 6.8a.76.76 0 00-.76.76V17.6l-4.5-1-.1.15 3.43 4.45c.14.19.37.3.6.3h7.09c.32 0 .61-.2.71-.52l1.79-5.35a.76.76 0 00-.34-.9l-3.63-2.1a.76.76 0 00-.38-.11h-3.15V7.57A.76.76 0 0012 6.8z"
    }
  }]
};
var GestureUp2 = Vue.extend({
  name: "GestureUp2Icon",
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
      id: "gesture-up-2",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GestureUp2;
//gesture-up-2.js.map
