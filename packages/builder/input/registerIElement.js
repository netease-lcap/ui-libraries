/* eslint-disable no-cond-assign, no-return-assign, no-multi-assign, no-restricted-syntax, no-use-before-define, no-underscore-dangle */

export default function registerIElement(methods, options = {}) {
  // inspecting element 模式
  let inspecting = false;
  // 当前组件的主要选择器
  let componentNodePath = '';
  let mainSelectorMap = {};
  let rootElements = [];
  let mainSelectorStr = '';
  // 当前组件的所有选择器
  let selectors = [];

  const selected = {
    _element: null,
    _elementDOMPath: '',
    get element() {
      if (options.useDOMPath && !document.contains(this._element) && this._elementDOMPath) {
        console.log('[inspected element] 路径元素不存在，重新查找！', this._elementDOMPath);
        return (this._element = document.querySelector(this._elementDOMPath));
      }
      return this._element;
    },
    set element(value) {
      this._element && clearIElementState(this._element);
      selectedElementState = '';
      this._element = value;
      if (options.useDOMPath) {
        this._elementDOMPath = computeElementDOMPath(value);
      }
    },
  };

  // 当前选中的元素状态
  let selectedElementState = '';
  // 当前选中的元素结果
  let selectedElementResult = {
    matchedSelectors: [],
    has: {
      parent: false, prev: false, next: false, children: false,
    },
  };
  // 唯一审查的元素
  let tempElement = null;
  // 审查器popover
  let INSPECTOR = null;

  options.postMessage = options.postMessage || ((payload) => window.top.postMessage(payload, '*'));

  /**
   * 初始化审查器 div
   */
  function initInspector() {
    INSPECTOR = document.getElementById('ide-inspector');
    if (INSPECTOR) return;

    INSPECTOR = document.createElement('div');
    INSPECTOR.id = 'ide-inspector';
    INSPECTOR.classList.add('ide-inspector');
    if (!options.addPopoverManually) {
      INSPECTOR.innerHTML = `<div class="ide-inspector__popover">
            <div class="ide-inspector__title"></div>
            <div class="ide-inspector__content"></div>
        </div>`;
    }
    document.body.appendChild(INSPECTOR);

    if (!options.addEventsManually) {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.addEventListener('scroll', onScrollOrResize);
      window.addEventListener('resize', onScrollOrResize);
    }
  }
  initInspector();

  /**
   * 计算审查器位置，并发送 iElementRect 信息
   */
  function computeInspector() {
    const el = tempElement;
    if (!el) {
      INSPECTOR.style.display = 'none';
      return;
    }

    const rect = el.getBoundingClientRect();
    const hoveredElementSelector = el.tagName.toLowerCase() + Array.from(el.classList)
      .filter((cls) => !/^cw-css-rule|^ide-custom-component|^_|vusion|s-empty|_fake|_empty|[dD]esigner|cw-style/.test(cls))
      .map((cls) => `.${cls}`)
      .join('');
    if (!options.addPopoverManually) {
      INSPECTOR.children[0].children[0].textContent = hoveredElementSelector;
      INSPECTOR.children[0].children[1].textContent = `${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px`;

      if (rect.top < 80) {
        INSPECTOR.children[0].setAttribute('data-placement', 'bottom');
      } else {
        INSPECTOR.children[0].setAttribute('data-placement', 'top');
      }
    }

    Object.assign(INSPECTOR.style, {
      display: !options.addPopoverManually ? 'block' : 'none',
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });

    const payload = {
      from: 'lcap-theme',
      type: 'iElementRect',
      data: {
        hoveredElementSelector,
        rect,
      },
    };
    options.postMessage(payload);
  }

  /**
   * 发送审查器 iElementResult 信息
   */
  function sendIElementResult() {
    // eslint-disable-next-line no-use-before-define
    selectedElementResult = getIElementResult();
    const payload = { from: 'lcap-theme', type: 'iElementResult', data: selectedElementResult };
    options.postMessage(payload);
  }

  function computeElementDOMPath(el) {
    if (!(el instanceof Element)) return '';
    const path = [];
    while (el !== document) {
      let selector = el.tagName.toLowerCase();
      if (el.getAttribute('data-nodepath') === componentNodePath) {
        selector += `[data-nodepath="${componentNodePath}"]`;
        path.unshift(selector);
        break;
      } else {
        let sib = el;
        let nth = 1;
        while (sib.previousElementSibling) {
          sib = sib.previousElementSibling;
          nth++;
        }
        selector += `:nth-child(${nth})`;
      }
      path.unshift(selector);
      el = el.parentNode;
    }
    return path.join('> ');
  }

  function onMouseMove(e) {
    if (!inspecting || !INSPECTOR) return;

    tempElement = e.target.closest(mainSelectorStr);
    if (!tempElement) {
      INSPECTOR.style.display = 'none';
    } else {
      computeInspector();
    }
  }

  function onClick(e) {
    if (!inspecting) return;
    selected.element = tempElement;
    methods.cancelIElement();
    sendIElementResult();

    e.stopPropagation();
  }

  function onScrollOrResize(e) {
    computeInspector();
  }

  function onRefresh() {
    const selectedElement = selected.element;
    if (selectedElement) {
      clearIElementState(selectedElement);
      const state = selectedElementState;
      state && selectedElement.classList.add(`_${state}`);
    }
    rootElements.forEach((el) => {
      el.setAttribute('data-root-nodepath', componentNodePath);
    });
  }

  /**
   * 计算 nodepath 下的主选择器的 query 字符串
   */
  function computeMainSelectorStr() {
    if (!componentNodePath) return Object.keys(mainSelectorMap).join(',');

    let nodePathStr = `[data-nodepath="${componentNodePath}"]`;

    Array.from(document.querySelectorAll('[data-root-nodepath]')).forEach((el) => {
      el.removeAttribute('data-root-nodepath');
    });

    // findAndMarkRootElement
    const dataNodePathElements = Array.from(document.querySelectorAll(nodePathStr));
    const rootSelectors = Object.keys(mainSelectorMap).filter((key) => mainSelectorMap[key]);
    rootElements = [];
    dataNodePathElements.forEach((el) => {
      rootSelectors.forEach((selector) => {
        const rootEl = el.closest(selector);
        if (rootEl && rootEl !== el) rootElements.push(rootEl);
      });
    });
    rootElements.forEach((el) => {
      el.setAttribute('data-root-nodepath', componentNodePath);
    });
    if (rootElements.length) nodePathStr = `[data-root-nodepath="${componentNodePath}"]`;

    const output = [];
    Object.keys(mainSelectorMap).forEach((key) => {
      const value = mainSelectorMap[key];
      output.push(`${nodePathStr}${value ? '' : ' '}${key}`);
    });
    return output.join(',');
  }

  methods.inspectElement = (data) => {
    inspecting = true;
    componentNodePath = data.nodePath;
    mainSelectorMap = data.mainSelectorMap;
    mainSelectorStr = computeMainSelectorStr();
    selectors = data.selectors;
    if (!options.addEventsManually) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('click', onClick, true);
    }
  };

  methods.cancelIElement = () => {
    inspecting = false;
    if (!options.addEventsManually) {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick, true);
    }
  };

  methods.clearIElement = () => {
    inspecting = false;
    componentNodePath = '';
    mainSelectorMap = {};
    rootElements = [];
    mainSelectorStr = '';
    selectors = [];
    selected.element = null;
    selectedElementState = '';
    selectedElementResult = {
      matchedSelectors: [],
      has: {
        parent: false, prev: false, next: false, children: false,
      },
    };
    tempElement = null;
    computeInspector();
  };

  function getRelatedElement(el, relation) {
    if (!el) return undefined;

    if (relation === 'self') {
      return el;
    } if (relation === 'parent') {
      return el.parentElement.closest(mainSelectorStr);
    } if (relation === 'prev') {
      while (el = el.previousElementSibling) {
        if (el.matches(mainSelectorStr)) return el;
      }
    } else if (relation === 'next') {
      while (el = el.nextElementSibling) {
        if (el.matches(mainSelectorStr)) return el;
      }
    } else if (relation === 'children') {
      return el.querySelector(mainSelectorStr);
    }
    return undefined;
  }

  function getIElementResult() {
    const el = tempElement;
    let matchedSelectors = [];
    if (el) {
      if (selectedElementState) {
        const filterText = `._${selectedElementState}`;
        matchedSelectors = selectors.filter((selector) => selector.includes(filterText) && el.matches(selector));
      } else {
        matchedSelectors = selectors.filter((selector) => !/\._hover|\._active|\._focus/g.test(selector) && el.matches(selector));
      }
    }

    return {
      matchedSelectors,
      has: {
        parent: !!getRelatedElement(el, 'parent'),
        prev: !!getRelatedElement(el, 'prev'),
        next: !!getRelatedElement(el, 'next'),
        children: !!getRelatedElement(el, 'children'),
      },
    };
  }

  methods.hoverIElement = (relation) => {
    tempElement = getRelatedElement(selected.element, relation);
    computeInspector();
  };

  methods.switchIElement = (relation) => {
    selected.element = tempElement = getRelatedElement(selected.element, relation);
    computeInspector();
    sendIElementResult();
  };

  function clearIElementState(el) {
    el && ['hover', 'active', 'focus'].forEach((_state) => el.classList.remove(`_${_state}`));
  }

  methods.changeIElementState = (state) => {
    selectedElementState = state;
    const selectedElement = selected.element;
    if (selectedElement) {
      clearIElementState(selectedElement);
      state && selectedElement.classList.add(`_${state}`);
    }
    sendIElementResult();
  };

  methods.showInspector = () => {
    INSPECTOR.style.display = !options.addPopoverManually ? 'block' : 'none';
  };

  methods.hideInspector = () => {
    INSPECTOR.style.display = 'none';
  };

  return {
    get inspecting() {
      return inspecting;
    },
    onMouseMove,
    onClick,
    onRefresh,
  };
}

/* debug
$('iframe').contentWindow.postMessage({ from: 'lcap', type: 'inspectElement', data: {
  selectors: [
    '[class*=u-panel__]',
    '[class*=u-panel__][shadow=always]',
    '[class*=u-panel__][shadow=hover]:hover,[class*=u-panel__][shadow=hover]._hover',
    '[class*=u-panel__][shadow=always],[class*=u-panel__][shadow=hover]',
    '[class*=u-panel__][shadow=never]',
    '[class*=u-panel__][bordered]',
    '[class*=u-panel_head__]',
    '[class*=u-panel_title__]',
    '[class*=u-panel_extra__]',
    '[class*=u-panel_body__]',
    '[class*=u-panel_title__] [s-empty]',
    '[class*=u-panel_head__][flex]',
    '[class*=u-panel_head__][flex] [class*=u-panel_extra__]',
    '[class*=u-panel_group__]:not(:last-child)',
    '[class*=u-panel_group_head__]',
    '[class*=u-panel_group_body__]',
    '[class*=u-panel__]:hover,[class*=u-panel__]._hover',
    '[class*=u-panel__]:active,[class*=u-panel__]._active',
    '[class*=u-panel__]:focus,[class*=u-panel__]._focus',
    '[class*=u-panel_head__]:hover,[class*=u-panel_head__]._hover',
    '[class*=u-panel_head__]:active,[class*=u-panel_head__]._active',
    '[class*=u-panel_head__]:focus,[class*=u-panel_head__]._focus',
    '[class*=u-panel_title__]:hover,[class*=u-panel_title__]._hover',
    '[class*=u-panel_title__]:active,[class*=u-panel_title__]._active',
    '[class*=u-panel_title__]:focus,[class*=u-panel_title__]._focus',
    '[class*=u-panel_extra__]:hover,[class*=u-panel_extra__]._hover',
    '[class*=u-panel_extra__]:active,[class*=u-panel_extra__]._active',
    '[class*=u-panel_extra__]:focus,[class*=u-panel_extra__]._focus',
    '[class*=u-panel_body__]:hover,[class*=u-panel_body__]._hover',
    '[class*=u-panel_body__]:active,[class*=u-panel_body__]._active',
    '[class*=u-panel_body__]:focus,[class*=u-panel_body__]._focus',
    '[class*=u-panel_title__] [s-empty]:hover,[class*=u-panel_title__] [s-empty]._hover',
    '[class*=u-panel_title__] [s-empty]:active,[class*=u-panel_title__] [s-empty]._active',
    '[class*=u-panel_title__] [s-empty]:focus,[class*=u-panel_title__] [s-empty]._focus',
    '[class*=u-panel_group__]',
    '[class*=u-panel_group__]:hover,[class*=u-panel_group__]._hover',
    '[class*=u-panel_group__]:active,[class*=u-panel_group__]._active',
    '[class*=u-panel_group__]:focus,[class*=u-panel_group__]._focus',
    '[class*=u-panel_group_head__]:hover,[class*=u-panel_group_head__]._hover',
    '[class*=u-panel_group_head__]:active,[class*=u-panel_group_head__]._active',
    '[class*=u-panel_group_head__]:focus,[class*=u-panel_group_head__]._focus',
    '[class*=u-panel_group_body__]:hover,[class*=u-panel_group_body__]._hover',
    '[class*=u-panel_group_body__]:active,[class*=u-panel_group_body__]._active',
    '[class*=u-panel_group_body__]:focus,[class*=u-panel_group_body__]._focus'],
  mainSelectors: [
    '[class*=u-panel__]',
    '[class*=u-panel_head__]',
    '[class*=u-panel_title__]',
    '[class*=u-panel_extra__]',
    '[class*=u-panel_body__]',
    '[class*=u-panel_title__] [s-empty]',
    '[class*=u-panel_head__] [class*=u-panel_extra__]',
    '[class*=u-panel_group__]',
    '[class*=u-panel_group_head__]',
    '[class*=u-panel_group_body__]',
  ],
} }, '*');

$('iframe').contentWindow.postMessage({ from: 'lcap', type: 'switchIElement', data: 'next' }, '*');
*/
