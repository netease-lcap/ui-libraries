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
      "d": "M13.32 2.8a2.72 2.72 0 013.84 0l1.31 1.31L20.1 2.5l1.42 1.42-1.62 1.62 1.31 1.31a2.72 2.72 0 010 3.84L20 11.9a2.7 2.7 0 01-1.65.78 2.7 2.7 0 01-.78 1.65l-1.21 1.21a2.7 2.7 0 01-1.65.78 2.7 2.7 0 01-.78 1.65l-1.21 1.21a2.72 2.72 0 01-3.84 0l-1.32-1.31-1.62 1.61-.7-.7a.72.72 0 10-.27 1.18l.94-.33.66 1.88-.94.34a2.72 2.72 0 11.18-5.06l.33-.34-1.31-1.32a2.72 2.72 0 010-3.84l1.21-1.21a2.7 2.7 0 011.65-.78c.06-.6.32-1.19.78-1.65l1.21-1.21a2.7 2.7 0 011.65-.78c.06-.6.32-1.19.78-1.65l1.22-1.21zm.2 3.64l4.04 4.04c.28.28.74.28 1.02 0l1.21-1.21a.72.72 0 000-1.01l-1.32-1.32-.97.97-1.41-1.41.97-.97-1.32-1.32a.72.72 0 00-1.01 0l-1.21 1.21a.72.72 0 000 1.02zm2.63 5.46L12.1 7.85a.72.72 0 00-1.01 0L9.87 9.07a.72.72 0 000 1l4.05 4.06c.28.28.73.28 1.01 0l1.22-1.22a.72.72 0 000-1.01zm-3.64 3.64l-4.05-4.05a.72.72 0 00-1.01 0l-1.22 1.22a.72.72 0 000 1.01l4.05 4.05c.28.28.73.28 1.01 0l1.22-1.22a.72.72 0 000-1.01z"
    }
  }]
};
var Barbecue = Vue.extend({
  name: "BarbecueIcon",
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
      id: "barbecue",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Barbecue;
//barbecue.js.map
