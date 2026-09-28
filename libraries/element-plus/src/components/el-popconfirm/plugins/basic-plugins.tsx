import { onMounted } from 'vue';

function getNodePath() {
  onMounted(() => {
    console.log('props');
  });
  return <span>确认</span>;
}
export const useSetDialogStyles = (props) => {
  return {
    'cancel-button-type': {
      icon: getNodePath,
      type: 'primary',
    },
  };
};
