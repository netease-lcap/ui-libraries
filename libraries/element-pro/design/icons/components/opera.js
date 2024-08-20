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
      "d": "M6.5 5H8c3.66 0 6.06 1.46 7.58 3.51 1 1.36 1.59 2.95 1.93 4.43.73-.55 1.5-.95 2.17-1.24a12.43 12.43 0 011.94-.64c.53-.12 1.07-.2 1.6-.31L21.84 19H2.22l-1.5-6H2c1.02 0 1.9.1 2.6.24L3.66 10H5c1.3 0 2.55.23 3.5.47-.38-1.32-.85-2.7-1.43-4.1L6.5 5zm2.59 7.72a16.05 16.05 0 00-2.74-.62l1.4 4.9h2.13a39.93 39.93 0 00-.8-4.28zm2.8 4.28h4.09c-.02-.58-.06-1.29-.13-1.88-.2-1.8-.71-3.84-1.88-5.42A6.47 6.47 0 009.5 7.1 48.84 48.84 0 0111.9 17zm6.09 0h2.17l.6-3.57-.29.11c-.9.38-1.87.95-2.58 1.77.06.56.08 1.16.1 1.64V17zm-12.3 0l-.46-1.55a8.61 8.61 0 00-1.92-.38L3.78 17h1.9z"
    }
  }]
};
var Opera = Vue.extend({
  name: "OperaIcon",
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
      id: "opera",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Opera;
//opera.js.map
