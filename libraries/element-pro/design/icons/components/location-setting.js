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
      "d": "M11 3a7 7 0 017 7v1h2v-1a9 9 0 10-18 0c0 3.64 2.22 6.88 4.26 9.11a28.15 28.15 0 003.8 3.44c.39.3.8.56 1.2.84l1.13-1.65c-.38-.26-.77-.51-1.14-.8l-.86-.67c-.73-.6-1.7-1.46-2.65-2.5C5.78 15.61 4 12.86 4 10a7 7 0 017-7zm0 5a2 2 0 100 4 2 2 0 000-4zm-4 2a4 4 0 118 0 4 4 0 01-8 0z"
    }
  }, {
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M19 12.75v1.38a4 4 0 011.85 1.07l1.2-.7 1 1.74-1.2.69a4 4 0 010 2.14l1.2.69-1 1.73-1.2-.69A4 4 0 0119 21.87v1.38h-2v-1.38a4 4 0 01-1.85-1.07l-1.2.7-1-1.74 1.2-.69a4 4 0 010-2.14l-1.2-.69 1-1.73 1.2.69A4 4 0 0117 14.13v-1.38h2zm-2.75 4.28a2 2 0 000 1.94l.04.06a2 2 0 003.42 0l.04-.06a2 2 0 000-1.94l-.04-.06a2 2 0 00-3.42 0l-.04.06z"
    }
  }]
};
var LocationSetting = Vue.extend({
  name: "LocationSettingIcon",
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
      id: "location-setting",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LocationSetting;
//location-setting.js.map
