import { select } from '../../utils/edit';

export const focus = {
    inserted(el, binding) {
        if (!!binding.value || binding.value === undefined){
            setTimeout(() => {
                el.focus();
            }, 300)
        }
        if (binding.value === 'select'){
            select(el);
        }
    },
};
