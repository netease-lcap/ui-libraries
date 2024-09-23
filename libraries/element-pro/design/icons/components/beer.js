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
      "d": "M5.15 4c.52-1.7 2.32-3 4.35-3a5.19 5.19 0 014.05 2h.95A3.5 3.5 0 0118 6.5v.01c0 .24 0 .87-.12 1.49H19a2 2 0 011.47.56c.42.43.53.98.53 1.46V18c0 .48-.11 1.03-.53 1.46A2 2 0 0119 20h-2v1c0 .48-.11 1.03-.53 1.46A2 2 0 0115 23H6a2 2 0 01-1.47-.54A2.01 2.01 0 014 21v-5.17A3 3 0 012 13V7a3 3 0 013-3h.15zM6 15.83V21h9V10H8v3a3 3 0 01-2 2.83zM17 10v8h2v-7.98V10h-2zm-1.18-2l.08-.28A6 6 0 0016 6.5c0-.83-.67-1.5-1.5-1.5h-2.12l-.27-.55A3.2 3.2 0 009.5 3C7.96 3 6.99 4.15 6.99 5v1H5a1 1 0 00-1 1v6a1 1 0 102 0V8h9.82z"
    }
  }]
};
var Beer = Vue.extend({
  name: "BeerIcon",
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
      id: "beer",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Beer;
//beer.js.map
