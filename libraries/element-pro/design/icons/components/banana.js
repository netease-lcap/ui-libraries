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
      "d": "M17.49.61v7.15c-.3.6-.73 1.27-1.5 1.85-.87.65-2.25 1.25-4.56 1.4a7.68 7.68 0 01-5.24-1.73c-.6-.57-1.42-.5-1.96-.06A2.24 2.24 0 003.49 11c0 .73.07 1.4.26 2.02-.25-.1-.52-.14-.82-.1-.38.06-.7.25-.91.5A2.36 2.36 0 001.49 15c0 4.24 5.04 9.77 13.32 6.95l.02-.01.03-.01c4.42-1.76 6.65-4.47 7.59-7.23.88-2.63.56-5.2.04-6.86V2.28l-5-1.67zM8.76 14.63c-1.48-.47-2.25-.92-2.67-1.41-.36-.42-.57-.98-.6-1.94A9.9 9.9 0 0011.55 13c1.6-.1 2.9-.4 3.94-.83a6.87 6.87 0 01-1.93 1.91c-1.41.9-3.02.97-4.8.55zm11.73-10.9v4.43l.05.16c.45 1.35.75 3.54.01 5.74-.72 2.15-2.49 4.44-6.4 6-6.98 2.36-10.56-2.17-10.66-4.95 1.4.65 2.98 1.03 4.31 1.34l.45.11c2.11.51 4.34.5 6.38-.79 2-1.27 3.63-3.66 4.81-7.47l.05-.15V3.4l1 .33z"
    }
  }]
};
var Banana = Vue.extend({
  name: "BananaIcon",
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
      id: "banana",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Banana;
//banana.js.map
