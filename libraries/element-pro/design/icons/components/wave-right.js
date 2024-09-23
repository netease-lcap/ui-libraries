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
      "d": "M19.05.37l.82.57c1.2.83 2.25 1.88 3.09 3.09l.56.82-1.64 1.13-.57-.82c-.7-1-1.57-1.88-2.57-2.57l-.83-.57L19.05.37zM12.2 4.3a2.39 2.39 0 013.65.33 2.39 2.39 0 013.32 3.32 2.4 2.4 0 01.33 3.65l-.42.42.3.25c.93.94.93 2.45 0 3.38l-4.33 4.32a7.19 7.19 0 01-10.16 0l-.85-.85a7.19 7.19 0 01-1.12-8.7l2.22-3.82a2.15 2.15 0 013.98.78l3.08-3.08zm5.89 5.89a.39.39 0 00-.55-.55l-5.24 5.24-1.41-1.42 6.6-6.6a.39.39 0 00-.55-.55l-6.6 6.6-1.42-1.4 5.24-5.25a.39.39 0 00-.55-.54l-5.47 5.46a1 1 0 01-1.67-.96l.67-2.5a.15.15 0 00-.27-.11l-2.23 3.81a5.19 5.19 0 00.82 6.29l.84.84a5.19 5.19 0 007.34 0l4.32-4.32a.39.39 0 00-.55-.54l-3.15 3.15-1.41-1.41 5.24-5.24z"
    }
  }]
};
var WaveRight = Vue.extend({
  name: "WaveRightIcon",
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
      id: "wave-right",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default WaveRight;
//wave-right.js.map
