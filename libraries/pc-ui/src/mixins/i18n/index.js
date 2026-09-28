import { camelCase, get, template } from 'lodash';

import locale from '../../locale';

export default function (name) {
    return {
        // 在注册props之前，往vm上挂载一个$tt方法
        beforeCreate() {
            this.$tt = function (key, data) {
                const scopeKey = `${camelCase(name)}_${key}`;
                const messages = locale.messages();
                const message = get(messages, scopeKey) || get(messages, key);

                return template(message, {
                    interpolate: /\{(.+?)\}/g,
                })(data);
            };
        },
    };
}
