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
      "d": "M4 5l.04-.08c.04-.07.12-.17.29-.3.33-.26.87-.54 1.62-.8C7.45 3.33 9.6 3 12 3c2.4 0 4.55.33 6.05.83.75.25 1.3.53 1.62.79.17.13.25.23.3.3L20 5l-.04.08c-.04.07-.12.17-.29.3-.33.26-.87.54-1.62.8-1.5.5-3.64.82-6.05.82-2.4 0-4.55-.33-6.05-.83a5.53 5.53 0 01-1.62-.79 1.24 1.24 0 01-.3-.3L4 5zm16 2.53V12.02a.3.3 0 01-.04.06c-.04.07-.12.17-.29.3-.33.26-.87.54-1.62.8-1.5.5-3.64.82-6.05.82-2.4 0-4.55-.33-6.05-.83a5.53 5.53 0 01-1.62-.79 1.24 1.24 0 01-.3-.3.3.3 0 01-.03-.06V7.53c.4.2.85.38 1.32.54C7.08 8.66 9.44 9 12 9c2.56 0 4.92-.34 6.68-.93.47-.16.92-.34 1.32-.54zm0 7V19.02a.3.3 0 01-.04.06c-.04.07-.12.17-.29.3-.33.26-.87.54-1.62.8-1.5.5-3.64.82-6.05.82-2.4 0-4.55-.33-6.05-.83a5.53 5.53 0 01-1.62-.79 1.24 1.24 0 01-.3-.3.3.3 0 01-.03-.06V14.53c.4.2.85.38 1.32.54 1.76.59 4.12.93 6.68.93 2.56 0 4.92-.34 6.68-.93.47-.16.92-.34 1.32-.54zM2 19c0 .85.52 1.5 1.09 1.95.58.46 1.36.83 2.23 1.12 1.76.59 4.12.93 6.68.93 2.56 0 4.92-.34 6.68-.93.87-.3 1.65-.66 2.23-1.12.57-.45 1.09-1.1 1.09-1.95V5c0-.85-.52-1.5-1.09-1.95a7.45 7.45 0 00-2.23-1.12A21.94 21.94 0 0012 1c-2.56 0-4.92.34-6.68.93-.87.3-1.65.66-2.23 1.12C2.52 3.5 2 4.15 2 5v14z"
    }
  }]
};
var DataBase = Vue.extend({
  name: "DataBaseIcon",
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
      id: "data-base",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default DataBase;
//data-base.js.map
