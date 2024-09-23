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
      "d": "M12 4a5 5 0 00-5 5v2H6c-.78 0-1.8.3-2.62.96A3.73 3.73 0 002 15c0 1.41.61 2.39 1.42 3.03A4.4 4.4 0 006 19c.97 0 2.24-.02 3.26-.52.49-.24.9-.59 1.2-1.1.31-.52.54-1.27.54-2.38v-1.09l-1.5 1.5L8.09 14 12 10.09 15.91 14l-1.41 1.41-1.5-1.5V15c0 1.39-.29 2.51-.81 3.4a4.78 4.78 0 01-2.04 1.87c-1.48.73-3.17.73-4.1.73H6a6.4 6.4 0 01-3.83-1.4A5.72 5.72 0 010 15c0-2.07.9-3.6 2.12-4.59A6.45 6.45 0 015 9.1V9a7 7 0 0114 0v.1c.97.17 2 .6 2.88 1.31A5.73 5.73 0 0124 15a5.6 5.6 0 01-2.2 4.6 7.17 7.17 0 01-4.3 1.4h-4v-2h4c1.07 0 2.22-.32 3.08-.98A3.6 3.6 0 0022 15c0-1.43-.6-2.4-1.38-3.04A4.36 4.36 0 0018 11h-1V9a5 5 0 00-5-5z"
    }
  }]
};
var ObjectStorage = Vue.extend({
  name: "ObjectStorageIcon",
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
      id: "object-storage",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default ObjectStorage;
//object-storage.js.map
