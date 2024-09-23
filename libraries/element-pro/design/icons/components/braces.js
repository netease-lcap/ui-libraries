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
      "d": "M2.5 17.6A3.4 3.4 0 005.9 21H7v-2H5.9a1.4 1.4 0 01-1.4-1.4V14c0-.77-.29-1.47-.76-2 .47-.53.76-1.23.76-2V6.4c0-.77.63-1.4 1.4-1.4H7V3H5.9a3.4 3.4 0 00-3.4 3.4V10a1 1 0 01-1 1H.4v2h1.1a1 1 0 011 1v3.6zM17 21h1.1a3.4 3.4 0 003.4-3.4V14a1 1 0 011-1h1.1v-2h-1.1a1 1 0 01-1-1V6.4A3.4 3.4 0 0018.1 3H17v2h1.1c.77 0 1.4.63 1.4 1.4V10c0 .77.29 1.47.76 2a2.99 2.99 0 00-.76 2v3.6c0 .77-.63 1.4-1.4 1.4H17v2z"
    }
  }]
};
var Braces = Vue.extend({
  name: "BracesIcon",
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
      id: "braces",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Braces;
//braces.js.map
