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
      "d": "M2 11a10 10 0 0114.16-9.1l.91.42-.83 1.82-.91-.42A8 8 0 004 11v3H2v-3zm16.96-7.25l.65.76A9.96 9.96 0 0122 11v3c0 2.64-.57 5.15-1.6 7.41l-.4.91-1.83-.82.42-.91C19.49 18.58 20 16.35 20 14v-3c0-1.98-.72-3.8-1.91-5.2l-.65-.75 1.52-1.3zM11 5.5h1a5.5 5.5 0 015.5 5.5v1h-2v-1A3.5 3.5 0 0012 7.5h-1v-2zM9.83 8.08l-.6.8A3.48 3.48 0 008.5 11v2h-2v-2c0-1.26.42-2.42 1.13-3.34l.61-.8 1.59 1.22zM13 10v4a9 9 0 01-4.64 7.87l-.87.49-.97-1.75.87-.48A7 7 0 0011 14v-4h2zm4.54 4.08l-.08 1c-.2 2.39-1 4.6-2.27 6.48l-.56.83-1.66-1.12.56-.83a11.43 11.43 0 001.93-5.52l.08-1 2 .16zm-9.17 1.38l-.51.86A4.5 4.5 0 014 18.5H2v-2h2c.9 0 1.7-.48 2.14-1.21l.52-.86 1.71 1.03z"
    }
  }]
};
var Fingerprint3 = Vue.extend({
  name: "Fingerprint3Icon",
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
      id: "fingerprint-3",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Fingerprint3;
//fingerprint-3.js.map
