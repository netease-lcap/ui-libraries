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
      "d": "M12 1C5.93 1 1 6.05 1 12.28c0 4.98 3.15 9.2 7.52 10.7.55.1.73-.25.73-.54v-2.1c-3.06.68-3.7-1.33-3.7-1.33-.5-1.3-1.22-1.65-1.22-1.65-1-.7.08-.69.08-.69 1.1.08 1.68 1.16 1.68 1.16.98 1.73 2.58 1.23 3.2.94.1-.73.39-1.23.7-1.5-2.44-.3-5-1.26-5-5.58 0-1.23.42-2.24 1.12-3.03a4.15 4.15 0 01.11-2.98s.93-.3 3.03 1.15a10.3 10.3 0 015.5 0c2.1-1.46 3.03-1.15 3.03-1.15.6 1.55.22 2.7.1 2.98.71.8 1.14 1.8 1.14 3.03 0 4.33-2.58 5.28-5.02 5.56.39.35.75 1.04.75 2.1v3.09c0 .3.18.65.73.54A11.26 11.26 0 0023 12.28C23 6.05 18.07 1 12 1z"
    }
  }]
};
var LogoGithubFilled = Vue.extend({
  name: "LogoGithubFilledIcon",
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
      id: "logo-github-filled",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoGithubFilled;
//logo-github-filled.js.map
