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
      "d": "M18 .6L1.6 17l.69.7a16.04 16.04 0 004.12 2.92c1.6.8 3.4 1.38 5.08 1.38C17.85 22 23 16.85 23 10.49 23 8.8 22.42 7 21.62 5.4c-.8-1.6-1.86-3.08-2.92-4.12l-.7-.7zm2.94 9.06a9.51 9.51 0 01-10.28 10.28A11.52 11.52 0 0020.94 9.66zM17.9 3.51c.47.79.75 1.77.91 2.7a13.57 13.57 0 01.19 2.1v.21A9.51 9.51 0 019.49 18h-.06A4.78 4.78 0 018.9 18c-.36-.02-.88-.07-1.47-.17a9.61 9.61 0 01-2.87-.98L17.9 3.51zM17 8h-2v2h2V8zm-3 3h-2v2h2v-2zm-3 3H9v2h2v-2z"
    }
  }]
};
var Watermelon = Vue.extend({
  name: "WatermelonIcon",
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
      id: "watermelon",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Watermelon;
//watermelon.js.map
