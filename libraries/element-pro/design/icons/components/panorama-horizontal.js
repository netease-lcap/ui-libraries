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
      "d": "M23 3.16v17.68l-1.29-.38-.05-.02a22.92 22.92 0 00-.77-.2c-.53-.14-1.3-.33-2.21-.5A35.14 35.14 0 0012 19c-2.4 0-4.84.36-6.68.73a42.23 42.23 0 00-2.98.71l-.04.01h-.01l-1.29.4V3.14l1.29.4h.05a17.48 17.48 0 00.77.22c.53.13 1.3.32 2.21.5C7.16 4.64 9.6 5 12 5c2.4 0 4.84-.36 6.68-.73a42.24 42.24 0 002.98-.71l.04-.01h.01l1.29-.4zM21 5.8A37.12 37.12 0 0112 7a37.12 37.12 0 01-9-1.2v12.4a37.12 37.12 0 019-1.2 37.12 37.12 0 019 1.2V5.8z"
    }
  }]
};
var PanoramaHorizontal = Vue.extend({
  name: "PanoramaHorizontalIcon",
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
      id: "panorama-horizontal",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default PanoramaHorizontal;
//panorama-horizontal.js.map
