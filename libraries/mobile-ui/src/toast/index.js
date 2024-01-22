import Vue from 'vue';
import VueToast from './Toast';
import VueToastDesigner from './Toast.designer';
import VueToastGroup from './ToastGroup';
import { isObject, isServer } from '../utils';
import { removeNode } from '../utils/dom/node';

const defaultOptions = {
  icon: '',
  type: 'text',
  // @deprecated
  mask: false,
  value: true,
  message: '',
  className: '',
  overlay: false,
  onClose: null,
  onOpened: null,
  duration: 2000,
  iconPrefix: undefined,
  position: 'middle',
  transition: 'van-fade',
  forbidClick: false,
  loadingType: undefined,
  getContainer: 'body',
  overlayStyle: null,
  closeOnClick: false,
  closeOnClickOverlay: false,
};

// default options of specific type
let defaultOptionsMap = {};

let queue = [];
let multipleForLegacy = false;
let multiple = true; // 现在默认使用当前模式
let toastGroupInstance = null;
let currentOptions = {
  ...defaultOptions,
};

function parseOptions(message) {
  if (isObject(message)) {
    return message;
  }

  return { message };
}

function isInDocument(element) {
  return document.body.contains(element);
}

function createInstanceForSingleton() {
  /* istanbul ignore if */
  if (isServer) {
    return {};
  }

  queue = queue.filter(
    (item) => !item.$el.parentNode || isInDocument(item.$el)
  );

  if (!queue.length || multipleForLegacy) {
    const toast = new (Vue.extend(VueToast))({
      el: document.createElement('div'),
    });

    toast.$on('input', (value) => {
      toast.value = value;
    });

    queue.push(toast);
  }

  return queue[queue.length - 1];
}

// transform toast options to popup props
function transformOptions(options) {
  return {
    ...options,
    overlay: options.mask || options.overlay,
    mask: undefined,
    duration: undefined,
  };
}

function ToastForSingletonAndLeagcyMultiple(options = {}) {
  const toast = createInstanceForSingleton();

  // should add z-index if previous toast has not disappeared
  if (toast.value) {
    toast.updateZIndex();
  }

  options = parseOptions(options);
  options = {
    ...currentOptions,
    ...defaultOptionsMap[options.type || currentOptions.type],
    ...options,
  };

  if (process.env.NODE_ENV === 'development' && options.mask) {
    console.warn(
      '[Vant] Toast: "mask" option is deprecated, use "overlay" option instead.'
    );
  }

  options.clear = () => {
    toast.value = false;

    if (options.onClose) {
      options.onClose();
      options.onClose = null;
    }

    if (multipleForLegacy && !isServer) {
      toast.$on('closed', () => {
        clearTimeout(toast.timer);
        queue = queue.filter((item) => item !== toast);

        removeNode(toast.$el);
        toast.$destroy();
      });
    }
  };

  Object.assign(toast, transformOptions(options));
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(() => {
      // toast.clear();
    }, options.duration);
  }

  return toast;
}

function createInstanceForMultiple() {
  if (toastGroupInstance) return toastGroupInstance;

  toastGroupInstance = new (Vue.extend(VueToastGroup))({
    el: document.createElement('div'),
  });

  return toastGroupInstance;
}

function ToastForMulitple(options) {
  const toast = createInstanceForMultiple();

  // should add z-index if previous toast has not disappeared
  toast.updateZIndex();

  options = parseOptions(options);
  options = {
    ...currentOptions,
    ...defaultOptionsMap[options.type || currentOptions.type],
    ...options,
    timestamp: Date.now(),
  };

  const item = toastGroupInstance.show(options);

  return item;
}

function Toast(options = {}) {
  if (!multiple) return ToastForSingletonAndLeagcyMultiple(options);
  return ToastForMulitple(options);
}

const createMethod = (type) => (options) =>
  Toast({
    type,
    ...parseOptions(options),
  });

Toast.show = (options) => Toast(options);

Toast.openToast = (options) => {
  const toast = createInstanceForMultiple();

  // should add z-index if previous toast has not disappeared
  if (toast.value) {
    toast.updateZIndex();
  }

  options = parseOptions(options);
  options = {
    ...currentOptions,
    ...defaultOptionsMap[options.type || currentOptions.type],
    ...options,
    timestamp: Date.now(),
  };

  const item = toast.openToast(options);

  return item;
}

Toast.closeToast = (key) => {
  const toast = createInstanceForMultiple();
  toast.closeToast(key);
}


['loading', 'success', 'fail'].forEach((method) => {
  Toast[method] = createMethod(method);
});

Toast.clear = (all) => {
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (!multipleForLegacy) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
};

Toast.setDefaultOptions = (type, options) => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = options;
  } else {
    Object.assign(currentOptions, type);
  }
};

Toast.resetDefaultOptions = (type) => {
  if (typeof type === 'string') {
    defaultOptionsMap[type] = null;
  } else {
    currentOptions = { ...defaultOptions };
    defaultOptionsMap = {};
  }
};

Toast.allowmultipleForLegacy = (value = true) => {
  multipleForLegacy = value;
};

Toast.allowmultiple = (value = true) => {
  multiple = value;
};

Toast.install = () => {
  Vue.use(VueToast);
  Vue.use(VueToastGroup);
};

Toast.Component = VueToastDesigner;
Vue.prototype.$toast = Toast;

export default Toast;
