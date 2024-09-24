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
      "d": "M9.18 1h5.64l.65 3.24a8.5 8.5 0 011.52.88l3.13-1.06 2.82 4.88-2.49 2.18a8.58 8.58 0 010 1.76l2.49 2.18-2.82 4.88-3.13-1.06a8.5 8.5 0 01-1.52.88L14.82 23H9.18l-.65-3.24a8.5 8.5 0 01-1.52-.88l-3.13 1.06-2.82-4.88 2.48-2.18a8.59 8.59 0 010-1.76L1.06 8.94l2.82-4.88 3.13 1.06a8.5 8.5 0 011.52-.88L9.18 1zm1.64 2l-.54 2.7-.53.2A6.5 6.5 0 007.85 7l-.44.36-2.61-.88-1.18 2.04 2.07 1.82-.1.55a6.55 6.55 0 000 2.22l.1.55-2.07 1.82 1.18 2.04 2.61-.88.43.36a6.5 6.5 0 001.91 1.1l.53.2.54 2.7h2.36l.54-2.7.53-.2a6.5 6.5 0 001.9-1.1l.44-.36 2.61.88 1.18-2.04-2.07-1.82.1-.55a6.55 6.55 0 000-2.22l-.1-.55 2.07-1.82-1.18-2.04-2.61.88-.43-.36a6.5 6.5 0 00-1.91-1.1l-.53-.2-.54-2.7h-2.36zM12 9a3 3 0 100 6 3 3 0 000-6zm-5 3a5 5 0 1110 0 5 5 0 01-10 0z"
    }
  }]
};
var Setting1 = Vue.extend({
  name: "Setting1Icon",
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
      id: "setting-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Setting1;
//setting-1.js.map
