/**
 * 通过插入 script 标签异步加载远程 JS，相同 src 复用同一 Promise（去重）。
 * @param {string} src
 * @param {{ crossOrigin?: string }} [options]
 * @returns {Promise<void>}
 */
const loaded = new Map();

export function loadScript(src, options = {}) {
    if (!src) {
        return Promise.reject(new Error('loadScript: src is required'));
    }
    const cached = loaded.get(src);
    if (cached) {
        return cached;
    }
    const promise = new Promise((resolve, reject) => {
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
    loaded.set(src, promise);
    return promise;
}
