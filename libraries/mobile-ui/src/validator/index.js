import { sync } from '@lcap/vue2-utils';
import VusionValidator from '@lcap/validator';
import { createNamespace } from '../utils';

const [createComponent, bem, t] = createNamespace('validator');

export default createComponent({
  mixins: [
    sync({
      valid() {
        return this.validateFailed;
      },
    }),
  ],
  props: {
    rules: [Array, String],
    ignoreValidation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validateFailed: false,
      validateMessage: '',
    };
  },
  computed: {
    validatorVuF() {
      let validator = null;
      try {
        validator = new VusionValidator(
          this.$options.validators,
          this.$options.rules,
          this.rules || [],
          this,
        );
        console.log('更新validator成功');
      } catch (error) {
        console.error('更新validator失败', error);
      }

      return validator;
    },
  },
  methods: {
    // exposed method
    validate(trigger) {
      return this.validateVusion(trigger).then((error) => {
        if (error) {
          return {
            valid: false,
            error: error.message,
          };
        }

        return { valid: true };
      });
    },

    validateVusion(trigger) {
      return new Promise((resolve) => {
        if (!this.rules) {
          resolve();
        }

        this.runRules(trigger)
          .then(() => {
            if (this.validateFailed) {
              resolve({
                message: this.validateMessage,
              });
            } else {
              resolve();
            }
          });
      });
    },

    runRules(trigger = '') {
      const value = this.getValue();

      if (this.ignoreValidation) {
        return Promise.resolve();
      }

      return this.validatorVuF
        .validate(value, trigger)
        .then(() => {
          this.validateFailed = false;
          this.validateMessage = '';
        })
        .catch((error) => {
          this.validateFailed = true;
          this.validateMessage = error;
        });
    },

    getValue() {
      const defaultSlot = this.$scopedSlots.default || this.$slots.default;
      const child = this.$children?.[0];
      const tag = child?.$options?._componentTag;

      if (defaultSlot && tag) {
        switch (tag) {
          case 'van-datetime-picker':
            return child.validateValue;
          default:
            return child.value;
        }
      }

      return undefined;
    },

    genInput() {
      const defaultSlot = this.slots();
      const ifDesigner = this.$env && this.$env.VUE_APP_DESIGNER;

      if (ifDesigner && !defaultSlot?.length) {
        return (
          <van-empty-col />
        );
      }

      return defaultSlot;
    },

    genMessage() {
      const message = this.validateMessage;

      if (message) {
        return (
          <div class={bem('error-message')}>{message}</div>
        );
      }

      return null;
    },
  },

  render() {
    return (
      <div class={bem()}>
        <div class={bem('body')}>
          {this.genInput()}
        </div>

        {this.genMessage()}
      </div>
    );
  },
});
