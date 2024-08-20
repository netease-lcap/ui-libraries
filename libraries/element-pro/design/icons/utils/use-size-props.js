import useCommonClassName from './use-common-classname.js';
import './config-context.js';

function useSizeProps(size) {
  if (size === void 0) {
    return {
      className: "",
      style: {}
    };
  }
  var COMMON_SIZE_CLASS_NAMES = useCommonClassName().SIZE;
  if (!(size in COMMON_SIZE_CLASS_NAMES)) {
    return {
      className: "",
      style: {
        fontSize: size
      }
    };
  }
  return {
    className: COMMON_SIZE_CLASS_NAMES[size],
    style: {}
  };
}

export default useSizeProps;
//use-size-props.js.map
