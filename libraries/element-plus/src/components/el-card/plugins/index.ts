import { CardProps } from 'element-plus';
import { inject } from 'vue';
import _ from 'lodash';
import { PluginAccumulateTypes } from '@/plugins/accumulate';
import { $provide } from '@/plugins/constants';

const CardAccumulate = new PluginAccumulateTypes<nasl.ui.ElCardOptions, CardProps>();
export default CardAccumulate.addPlugin({
  name: 'handleShadow',
  handle(props) {
    const provide = props.get('provide');
    const isCardWrap = _.get(inject($provide)?.value, 'isCardWrap', false);
    const shadow = props.get('shadow');
    const shadowValue = !_.isNil(shadow) || shadow === 'auto' ? (isCardWrap ? 'never' : 'always') : shadow;
    return {
      provide: Object.assign(provide, {
        isCardWrap: true,
      }),
      shadow: shadowValue,
    };
  },
});
