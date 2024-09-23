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
      "d": "M7.5 2h14v9.5h-2V4h-2v5.62l-3-1.5-3 1.5V4h-2v5.5h-2V2zm6 2v2.38l1-.5 1 .5V4h-2zm-5.06 9.25a1.25 1.25 0 00-.89.36L5.5 15.66v3.84h5.63l5.8-1.45 3.53-1.5a.56.56 0 00-.41-1.03h-.02L13.6 17H10v-2h3.13a.87.87 0 100-1.75h-4.7zm7.55 1.15l3.55-.82a2.56 2.56 0 011.8 4.76l-.03.02-3.74 1.6-6.2 1.54H0v-7.25h4.09l2.05-2.05a3.25 3.25 0 012.3-.95h4.69a2.87 2.87 0 012.86 3.15zM3.5 16.25H2v3.25h1.5v-3.25z"
    }
  }]
};
var UndertakeDelivery = Vue.extend({
  name: "UndertakeDeliveryIcon",
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
      id: "undertake-delivery",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default UndertakeDelivery;
//undertake-delivery.js.map
