/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-new-func */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/ban-types */
import type {
  Validator, Rule, ValidateResult, ValidateFunc,
} from './types';
import buildInValidators from './builtIn/validators';
// import builtInRules from './builtIn/rules';
import parseRules from './parseRules';

/**
 * @example
 * const vusionValidator = new VusionValidator();
 * vusionValidator.validate(value, 'required | max(200)')
 *     .then(() => {
 *     }).catch((error: string) => {
 *     });
 *
 * @TODO: 相同环境下的 rules 应该是一样的，如何不用在每个组件中重复解析
 */
export default class VusionValidator {
  validators: { [prop: string]: Validator };

  rules: { [prop: string]: Rule | Array<Rule> };

  validatingRules: Array<Rule>;

  context: Object;

  constructor(
    validators: { [prop: string]: Validator },
    rules: { [prop: string]: Rule | string | Array<Rule | string> },
    validatingRules: string | Array<Rule | string> = [],
    context: Object,
  ) {
    this.context = context;
    this.validators = Object.create(validators || buildInValidators);

    this.rules = Object.create(rules || {});
    Object.keys(this.rules).forEach((key) => {
      const rule = this.rules[key];
      const normalizedRule = this.normalizeRules(rule);
      if (normalizedRule !== rule) this.rules[key] = normalizedRule;
    });
    this.validatingRules = this.normalizeRules(validatingRules) as Array<Rule>;
  }

  async validate(
    value: any,
    trigger: string = '',
    options?: Object,
  ): Promise<string | void> {
    const validatingRules = this.validatingRules.filter(
      (rule) => !rule.ignore && (rule.trigger || '').includes(trigger),
    );

    for (let i = 0; i < validatingRules.length; i++) {
      const rule = validatingRules[i];
      let validate: ValidateFunc;

      if (typeof rule.validate === 'string') {
        const validator = this.validators[rule.validate];
        if (!validator) {
          throw new Error(
            `[@lcap/validator] Unknown validator: ${rule.validate}`,
          );
        }

        validate = async (value: any, rule: Rule, options?: Object) => {
          let { args } = rule;
          if (typeof args === 'function') args = args.call(this.context, value, rule, options);
          if (args instanceof Promise) args = await args;
          if (!Array.isArray(args)) args = args !== undefined ? [args] : [];
          let valid: boolean | Promise<boolean> = validator(value, ...args);
          if (valid instanceof Promise) valid = await valid;

          options = { args, ...options, ...args };
          if (!valid) {
            return Promise.reject(
              this.formatMessage(rule.message || '', options),
            );
          }
          return Promise.resolve();
        };
      } else validate = rule.validate;

      let result: ValidateResult | Promise<ValidateResult>;
      // @note: 如果 rule 中没有 required 字段，则自动忽略为空的情况
      if (!rule.required && !buildInValidators.required(value)) result = true;
      else result = validate.call(this.context, value, rule, options);

      if (result instanceof Promise) result = await result;
      if (typeof result === 'string') return Promise.reject(this.formatMessage(result, options));
      if (typeof result === 'boolean') {
        if (result === false) {
          return Promise.reject(
            this.formatMessage(rule.message || '', options),
          );
        }
      }
    }

    return Promise.resolve();
  }

  /** @TODO: i18n */
  formatMessage(message: string, options?: { [prop: string]: any }): string {
    if (!options) return message;
    return message.replace(/\{([a-zA-Z0-9_]+)\}/g, (m, $1) => options[$1]);
  }

  normalizeRules(
    rules: string | Rule | Array<string | Rule>,
    originalName?: string,
  ): Rule | Array<Rule> {
    if (typeof rules === 'object' && !Array.isArray(rules)) return rules;
    if (typeof rules === 'string') return this.parseRules(rules, originalName);
    if (Array.isArray(rules)) {
      if (rules.some((rule) => typeof rule === 'string')) {
        const normalizedRules: Array<Rule> = [];
        rules.forEach((rule) => {
          if (typeof rule === 'string') normalizedRules.push(...this.parseRules(rule, originalName));
          else normalizedRules.push(rule);
        });
        return normalizedRules;
      } return rules as Array<Rule>;
    }
  }

  parseRules(rules: string, originalName?: string): Array<Rule> {
    const parsedRules = parseRules(rules);

    const TRIGGER_CASES: { [prop: string]: string } = {
      i: 'input',
      b: 'blur',
      ib: 'input+blur',
      bi: 'blur+input',
    };

    const resolveArgs = (args: string) => Function(`with (this) { return ${args} }`).bind(this.context);

    const finalRules: Array<Rule> = [];
    parsedRules.forEach((parsedRule) => {
      const ruleName = parsedRule.rule;
      if (!parsedRule.rule) return;

      const index = ruleName.indexOf('(');
      if (~index) {
        parsedRule.rule = ruleName.slice(0, index);
        const args = `[${ruleName.slice(index + 1, ruleName.length - 1)}]`;
        parsedRule.args = resolveArgs(args);
      }

      if (parsedRule.trigger) {
        if (TRIGGER_CASES[parsedRule.trigger]) parsedRule.trigger = TRIGGER_CASES[parsedRule.trigger];
      }

      if (originalName === parsedRule.rule) {
        throw new Error(
          `[@lcap/validator] Circular rule reference: ${originalName}`,
        );
      }

      let builtInRule = this.rules[parsedRule.rule];
      if (builtInRule) {
        if (
          typeof builtInRule === 'string'
          || (Array.isArray(builtInRule)
            && builtInRule.some((rule) => typeof rule === 'string'))
        ) builtInRule = this.normalizeRules(builtInRule, parsedRule.rule);

        if (Array.isArray(builtInRule)) {
          if (parsedRule.args || parsedRule.trigger) {
            console.warn(
              '[@lcap/validator]',
              'Cannot apply args or trigger to composite rules!',
            );
          }
          finalRules.push(...builtInRule);
        } else {
          if (builtInRule.validate) parsedRule.validate = builtInRule.validate;
          else parsedRule.validate = parsedRule.rule;
          delete parsedRule.rule;
          finalRules.push({ ...builtInRule, ...parsedRule });
        }
      } else {
        throw new Error(`[@lcap/validator] Unknown rule: ${parsedRule.rule}`);
        // parsedRule.validate = parsedRule.rule;
        // delete parsedRule.rule;
        // finalRules.push(parsedRule);
      }
    });

    return finalRules;
  }
}
