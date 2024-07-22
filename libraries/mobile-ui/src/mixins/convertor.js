const ConverterUtils = {
  default: {
    convert(currentValue) {
      return currentValue;
    },
    format(value) {
      return value;
    },
  },
  json: {
    convert(currentValue) {
      try {
        return JSON.stringify(currentValue || []);
      } catch (err) {
        return '[]';
      }
    },
    format(value) {
      try {
        return JSON.parse(value || '[]');
      } catch (err) {
        return [];
      }
    },
  },
  'join:,': {
    convert(currentValue) {
      return (currentValue || []).join(',');
    },
    format(value) {
      return value ? value.split(',') : [];
    },
  },
  'join:|': {
    convert(currentValue) {
      return (currentValue || []).join('|');
    },
    format(value) {
      return value ? value.split('|') : [];
    },
  },
  'join:;': {
    convert(currentValue) {
      return (currentValue || []).join(';');
    },
    format(value) {
      return value ? value.split(';') : [];
    },
  },
};

/**
 * 转换器
 * convert 转换内部值到外部值
 * format 转换外部值到内部值
 */
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
          convert(values) {
            if (Array.isArray(values)) {
              types = values.map((v) => typeof v);
              return values.join(sep);
            }
          },
          format(value) {
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
          convert(values) {
            if (typeof values === 'string') {
              return values || '[]';
            }

            try {
              return JSON.stringify(values || []);
            } catch (err) {
              return '[]';
            }
          },
          format(value) {
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
