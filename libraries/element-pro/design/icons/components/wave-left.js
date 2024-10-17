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
      "d": "M7.16 3.2l-.83.56c-1 .7-1.88 1.57-2.57 2.57l-.57.83-1.64-1.14.56-.82C2.94 4 4 2.94 5.2 2.1l.82-.56 1.14 1.64zm4.3 3.68a.39.39 0 00-.55.55l5.23 5.23-1.41 1.42-6.6-6.6a.39.39 0 00-.55.54l6.6 6.6-1.41 1.42-5.24-5.24a.39.39 0 00-.55.55l2.09 2.08 3.15 3.16L10.81 18l-3.16-3.15a.39.39 0 00-.54.55l4.32 4.32a5.19 5.19 0 007.34 0l.84-.85c1.67-1.67 2-4.25.81-6.29l-2.22-3.8a.15.15 0 00-.27.1l.67 2.5a1 1 0 01-.28.98 1 1 0 01-1.4-.01l-5.46-5.47zm-5.47 6.3l-.42-.42a2.39 2.39 0 01.33-3.65A2.39 2.39 0 019.22 5.8a2.39 2.39 0 013.65-.33l3.08 3.08a2.15 2.15 0 013.97-.78l2.23 3.82a7.19 7.19 0 01-1.12 8.7l-.85.85a7.19 7.19 0 01-10.17 0L5.7 16.81a2.39 2.39 0 01.3-3.63z"
    }
  }]
};
var WaveLeft = Vue.extend({
  name: "WaveLeftIcon",
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
      id: "wave-left",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default WaveLeft;
//wave-left.js.map
