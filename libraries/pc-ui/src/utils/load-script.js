/**
 * 通过插入 script 标签异步加载远程 JS，相同 src 复用同一 Promise（去重）。
 * @param {string} src
 * @param {{ crossOrigin?: string }} [options]
 * @returns {Promise<void>}
 */
const loaded = new Map();

/**
 * 检测是否运行在微前端沙箱中（wujie / qiankun）
 */
function isInMicroFrontend() {
    return typeof window !== 'undefined' && (
        window.__POWERED_BY_WUJIE__ || window.__POWERED_BY_QIANKUN__
    );
}

/**
 * 常规环境：通过 <script> 标签加载
 */
function loadScriptNormal(src, options = {}) {
    return new Promise((resolve, reject) => {
        const el = document.createElement('script');
        el.src = src;
        el.async = true;
        if (options.crossOrigin) {
            el.crossOrigin = options.crossOrigin;
        }
        el.onload = () => resolve();
        el.onerror = () => {
            loaded.delete(src);
            reject(new Error(`loadScript: failed to load ${src}`));
        };
        document.head.appendChild(el);
    });
}

/**
 * 微前端环境下，document.head.appendChild(script) 会被框架拦截或执行上下文不一致，
 * 导致 UMD 库挂载的全局变量不在当前子应用的 window 上。
 *
 * 改用 fetch + new Function 显式传入 window/self/globalThis：
 * - wujie: window 是 iframe contentWindow（沙箱边界），UMD 库正确挂载到子应用 window
 * - qiankun: window 是 Proxy 沙箱代理，UMD 库挂载到代理 window 而非真实 window，保持隔离
 *
 * 相比 (0, eval)(code)，new Function 的优势：
 * - 显式传入 window/self/globalThis，不依赖隐式作用域查找
 * - 在 qiankun 中 (0, eval) 会跑在主应用全局作用域，window 是真实 window 而非代理
 * - new Function 通过参数绑定确保 UMD wrapper 使用正确的 window
 *
 * 注意：若 CSP 禁用了 unsafe-eval，此方案会失败，需改用主应用 document 插入 script 的方案。
 */
function loadScriptInMicroFrontend(src) {
    return fetch(src)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} ${res.statusText}`);
            }
            return res.text();
        })
        .then((code) => {
            // new Function 显式传入 window/self/globalThis，确保 UMD 库挂载到正确的 window 对象
            // 在 wujie 中 window 是 iframe 的 contentWindow
            // 在 qiankun 中 window 是 Proxy 沙箱代理
            const fn = new Function('window', 'self', 'globalThis', code);
            fn.call(window, window, window, window);
        })
        .catch((err) => {
            loaded.delete(src);
            throw new Error(`loadScript: failed to load ${src} in micro-frontend: ${err.message}`);
        });
}

export function loadScript(src, options = {}) {
    if (!src) {
        return Promise.reject(new Error('loadScript: src is required'));
    }
    const cached = loaded.get(src);
    if (cached) {
        return cached;
    }
    const promise = isInMicroFrontend()
        ? loadScriptInMicroFrontend(src, options)
        : loadScriptNormal(src, options);
    loaded.set(src, promise);
    return promise;
}
