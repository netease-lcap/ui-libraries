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
      "d": "M14.73 2.18c2.16-.68 3.99-.4 5.36.58a5.1 5.1 0 011.24 1.29c.93 1.38 1.16 3.2.46 5.33-.7 2.1-2.3 4.54-5.08 7.33-2.83 2.82-5.3 4.44-7.43 5.1-2.16.7-4 .41-5.36-.57a5.1 5.1 0 01-1.25-1.29c-.93-1.38-1.16-3.2-.45-5.33.69-2.1 2.3-4.54 5.07-7.33 2.83-2.82 5.3-4.44 7.44-5.1zm.6 1.9c-1.7.55-3.91 1.92-6.62 4.63-2.67 2.66-4.04 4.84-4.6 6.54a5.86 5.86 0 00-.3 1.53A40.47 40.47 0 0117 3.8c-.49 0-1.04.09-1.67.29zm3.87.77C13.55 7.88 7.8 13.47 4.75 19.16a38.59 38.59 0 008.1-6.37 43.57 43.57 0 006.35-7.94zM6.92 20.2c.5 0 1.09-.08 1.75-.29 1.7-.54 3.92-1.9 6.62-4.62 2.67-2.66 4.04-4.84 4.6-6.54.21-.65.3-1.22.3-1.73a47.52 47.52 0 01-5.92 7.18 42.89 42.89 0 01-7.35 6z"
    }
  }]
};
var Cucumber = Vue.extend({
  name: "CucumberIcon",
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
      id: "cucumber",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Cucumber;
//cucumber.js.map
