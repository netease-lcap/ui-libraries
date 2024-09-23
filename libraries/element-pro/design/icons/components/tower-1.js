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
      "d": "M13 1v1h3v6h-.94c.2 1.79.87 4.2 1.82 6.58 1.06 2.66 2.37 5.09 3.55 6.42H22v2h-7.85l-.14-.83v-.01a2 2 0 00-.08-.34 3.94 3.94 0 00-.36-.82c-.33-.57-.8-1-1.57-1-.76 0-1.24.43-1.57 1a3.94 3.94 0 00-.44 1.16l-.14.84H2v-2h1.57c1.18-1.33 2.5-3.76 3.55-6.42A27.7 27.7 0 008.94 8H8V2h3V1h2zm-2.05 7c-.2 2.1-.97 4.8-1.97 7.32A30.53 30.53 0 016.08 21h2.16c.1-.3.25-.65.46-1 .54-.93 1.56-2 3.3-2a3.75 3.75 0 013.3 2c.21.35.36.7.46 1h2.16a30.53 30.53 0 01-2.9-5.68c-1-2.52-1.77-5.22-1.97-7.32h-2.1zM10 6h4V4h-4v2z"
    }
  }]
};
var Tower1 = Vue.extend({
  name: "Tower1Icon",
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
      id: "tower-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Tower1;
//tower-1.js.map
