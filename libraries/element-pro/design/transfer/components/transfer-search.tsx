import { PropType, VNode } from 'vue';
import { SearchIcon as ElSearchIcon } from '@element-ui-icons';
import { SearchContext, SearchOption } from '../interface';
import ElInput from '../../input';

import mixins from '../../utils/mixins';
import { getGlobalIconMixins } from '../../config-provider/config-receiver';

export default mixins(getGlobalIconMixins()).extend({
  name: 'ElTransferSearch',
  model: {
    prop: 'searchValue',
    event: 'change',
  },
  props: {
    searchValue: {
      type: String,
      default: '',
    },
    search: {
      type: [Boolean, Object] as PropType<SearchOption>,
    },
    placeholder: String,
    classPrefix: String,
  },
  render(): VNode {
    const { SearchIcon } = this.useGlobalIcon({ SearchIcon: ElSearchIcon });
    4;
    const {
      searchValue, search, placeholder, classPrefix,
    } = this;
    const inputProps = typeof search === 'object'
      ? search
      : {
        clearable: true,
      };

    const handleSearch = (value: string, trigger: SearchContext['trigger'], changeCtx: any) => {
      this.$emit('search', { value, trigger, e: changeCtx.e });
    };

    const handleChange = (value: string, changeCtx: any) => {
      this.$emit('change', value);
      handleSearch(value, 'input', changeCtx);
    };

    const handleEnter = (value: string, changeCtx: any) => {
      handleSearch(value, 'enter', changeCtx);
    };

    return (
      <div class={`${classPrefix}-transfer__search-wrapper`}>
        <ElInput
          props={{ ...inputProps }}
          value={searchValue}
          onChange={handleChange}
          on-enter={handleEnter}
          placeholder={placeholder}
        >
          <SearchIcon slot="suffix-icon" />
        </ElInput>
      </div>
    );
  },
});
