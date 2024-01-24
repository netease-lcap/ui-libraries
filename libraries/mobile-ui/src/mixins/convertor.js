const ConverterUtils = {
  default: {
    get(currentValue) {
      return currentValue;
    },
    set(value) {
      return value;
    },
  },
  json: {
    get(currentValue) {
      try {
        return JSON.stringify(currentValue || []);
      } catch (err) {
        return '[]';
      }
    },
    set(value) {
      try {
        return JSON.parse(value || '[]');
      } catch (err) {
        return [];
      }
    },
  },
  'join:,': {
    get(currentValue) {
      return (currentValue || []).join(',');
    },
    set(value) {
      return value ? value.split(',') : [];
    },
  },
  'join:|': {
    get(currentValue) {
      return (currentValue || []).join('|');
    },
    set(value) {
      return value ? value.split('|') : [];
    },
  },
  'join:;': {
    get(currentValue) {
      return (currentValue || []).join(';');
    },
    set(value) {
      return value ? value.split(';') : [];
    },
  },
};


export const Converter = {
  props: {
    converter: { type: [String, Object], default: undefined },
  },
  data() {
    let currentConverter;
    let types = [];
    if (this.converter) {
      if (this.converter instanceof Object) currentConverter = this.converter;
      else if (this.converter.startsWith('join')) {
        const m = this.converter.match(/^join(\.number)?(:.+)?$/);
        if (!m) throw new Error('converter format error');
        const number = !!m[1];
        const sep = m[2] ? m[2].slice(1) : ',';
        currentConverter = {
          get(values) {
            if (Array.isArray(values)) {
              types = values.map((v) => typeof v);
              return values.join(sep);
            }
          },
          set(value) {
            if (Array.isArray(value)) return value;
            const values = value ? value.split(sep) : [];
            return number
              ? values.map((i) => +i)
              : values.map((v, i) => {
                  const type = types[i];
                  if (type === 'string') {
                    return v.toString();
                  }
                  if (type === 'number') {
                    return +v;
                  }
                  if (type === 'undefined') {
                    return undefined;
                  }
                  if (type === 'boolean') {
                    return v === 'true';
                  }

                  return v;
                });
          },
        };
      } else if (this.converter === 'json') {
        currentConverter = {
          get(values) {
            if (typeof values === 'string') {
              return values || '[]';
            }

            try {
              return JSON.stringify(values || []);
            } catch (err) {
              return '[]';
            }
          },
          set(value) {
            if (Array.isArray(value)) return value;
            try {
              return JSON.parse(value || '[]');
            } catch (err) {
              return [];
            }
          },
        };
      }
    }
    return {
      currentConverter,
    };
  },
  methods: {
    // 根据转换器将内部值转成对应格式外部值
    getOuterValue(value) {
      const handler = ConverterUtils[this.converter].get || ConverterUtils.default.get;
      return handler(value);
    },
    // 根据转换器将对应格式外部值转成内部值
    setInnerValue(value) {
      const handler = ConverterUtils[this.converter].set || ConverterUtils.default.set;
      return handler(value);
    },
  },
};
