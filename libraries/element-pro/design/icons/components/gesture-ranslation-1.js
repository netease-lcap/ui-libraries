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
      "d": "M17.98 1.55l.82.56C20 2.94 21.06 4 21.9 5.2l.56.82-1.64 1.14-.57-.83c-.7-1-1.57-1.88-2.57-2.57l-.83-.57 1.14-1.64zm-6.52 5.33a.39.39 0 00-.55.55l5.23 5.23-1.41 1.42-6.6-6.6a.39.39 0 00-.55.54l6.6 6.6-1.41 1.42-5.24-5.24a.39.39 0 00-.55.55l5.24 5.24L10.81 18l-3.16-3.15a.39.39 0 00-.54.55l4.32 4.32a5.19 5.19 0 007.34 0l.84-.85c1.67-1.67 2-4.25.81-6.29l-2.22-3.8a.15.15 0 00-.27.1l.67 2.5a1 1 0 01-.28.98 1 1 0 01-1.4-.01l-5.46-5.47zm-5.47 6.3l-.42-.42a2.39 2.39 0 01.33-3.65A2.39 2.39 0 019.22 5.8a2.39 2.39 0 013.65-.33l3.08 3.08a2.15 2.15 0 013.97-.78l2.23 3.82a7.19 7.19 0 01-1.12 8.7l-.85.85a7.19 7.19 0 01-10.17 0L5.7 16.81a2.39 2.39 0 01.3-3.63zm-2.8 3.66l.57.83c.7 1 1.57 1.88 2.57 2.57l.83.57-1.14 1.64-.82-.56A12.06 12.06 0 012.1 18.8l-.56-.82 1.64-1.14z"
    }
  }]
};
var GestureRanslation1 = Vue.extend({
  name: "GestureRanslation1Icon",
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
      id: "gesture-ranslation-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default GestureRanslation1;
//gesture-ranslation-1.js.map
