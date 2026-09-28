/**
 * 可监听的 Set 对象
 * 支持监听 add 和 delete 方法，并可设置防抖时间
 */
export class WatchableSet<T = any> {
  private set: Set<T>;

  private watchers: Array<(set: Set<T>) => void> = [];

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  private debounceDelay: number = 0;

  constructor(initialValues?: T[], debounceDelay: number = 0) {
    this.set = new Set(initialValues);
    this.debounceDelay = debounceDelay;
  }

  /**
   * 添加监听器
   * @param callback 回调函数，参数为当前的 Set 对象
   */
  watch(callback: (set: Set<T>) => void): () => void {
    this.watchers.push(callback);

    // 返回取消监听的函数
    return () => {
      const index = this.watchers.indexOf(callback);
      if (index > -1) {
        this.watchers.splice(index, 1);
      }
    };
  }

  /**
   * 触发所有监听器
   */
  private notify(): void {
    if (this.debounceDelay > 0) {
      // 清除之前的定时器
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      // 设置新的防抖定时器
      this.debounceTimer = setTimeout(() => {
        this.watchers.forEach((callback) => callback(this.set));
        this.debounceTimer = null;
      }, this.debounceDelay);
    } else {
      // 无防抖，立即执行
      this.watchers.forEach((callback) => callback(this.set));
    }
  }

  /**
   * 添加元素
   */
  add(value: T): this {
    const sizeBefore = this.set.size;
    this.set.add(value);

    // 只有在实际添加了新元素时才通知
    if (this.set.size !== sizeBefore) {
      this.notify();
    }

    return this;
  }

  /**
   * 删除元素
   */
  delete(value: T): boolean {
    const result = this.set.delete(value);

    // 只有在实际删除了元素时才通知
    if (result) {
      this.notify();
    }

    return result;
  }

  /**
   * 清空 Set
   */
  clear(): void {
    if (this.set.size > 0) {
      this.set.clear();
      this.notify();
    }
  }

  /**
   * 检查是否包含某个元素
   */
  has(value: T): boolean {
    return this.set.has(value);
  }

  /**
   * 获取 Set 的大小
   */
  get size(): number {
    return this.set.size;
  }

  /**
   * 遍历 Set
   */
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    this.set.forEach(callbackfn, thisArg);
  }

  /**
   * 返回迭代器
   */
  values(): IterableIterator<T> {
    return this.set.values();
  }

  keys(): IterableIterator<T> {
    return this.set.keys();
  }

  entries(): IterableIterator<[T, T]> {
    return this.set.entries();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.set[Symbol.iterator]();
  }

  /**
   * 获取原始 Set 对象（只读）
   */
  getSet(): ReadonlySet<T> {
    return this.set;
  }

  /**
   * 设置防抖延迟时间
   */
  setDebounceDelay(delay: number): void {
    this.debounceDelay = delay;
  }

  /**
   * 立即触发所有待执行的监听器（刷新防抖）
   */
  flush(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.watchers.forEach((callback) => callback(this.set));
      this.debounceTimer = null;
    }
  }
}
