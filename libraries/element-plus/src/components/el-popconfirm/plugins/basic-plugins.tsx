// export {};
import { onMounted } from 'vue';
import { spawn } from 'child_process';

function getNodePath(props) {
  onMounted(() => {
    console.log(props, 'props');
  });
  return <span>确认</span>;
}
export const useSetDialogStyles = (props) => {
  const nodepath = props.get('nodepath');
  console.log('object');
  return {
    'cancel-button-type': {
      icon: getNodePath,
      type: 'primary',
    },
  };
};
