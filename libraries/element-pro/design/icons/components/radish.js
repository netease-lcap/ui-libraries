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
      "d": "M16.39 1.95V6.2L20 2.59 21.41 4l-3.6 3.61h4.24v2h-4.5a8.3 8.3 0 011.55 2.98c.64 2.6-.64 5.87-3.94 7.92-2.74 1.7-6.85 2.54-12.5 1.67l-.73-.11-.11-.72a23.91 23.91 0 01-.06-7.8c.67-3.76 2.42-6.27 4.51-7.62a6.7 6.7 0 015.14-1.03 8.3 8.3 0 012.98 1.55v-4.5h2zm-1.7 7.37l-.02-.01a11.02 11.02 0 00-.35-.33c-.25-.22-.59-.5-.98-.81A6.84 6.84 0 0011 6.86h-.02l-.03-.01a4.26 4.26 0 00-2.45.2L10.9 9.5l-1.42 1.4L6.7 8.1c-1.23 1.03-2.34 2.74-2.88 5.3L6.9 16.5 5.5 17.9l-1.99-2c-.07 1.3-.02 2.76.2 4.4 4.12.53 7.15.04 9.28-.9l-2.9-2.91 1.42-1.41 3.26 3.27c2.18-1.64 2.76-3.83 2.4-5.3l-.01-.03v-.02a6.84 6.84 0 00-1.32-2.35 17.7 17.7 0 00-1.14-1.33v-.01z"
    }
  }]
};
var Radish = Vue.extend({
  name: "RadishIcon",
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
      id: "radish",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Radish;
//radish.js.map
