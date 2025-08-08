import { $ide } from '@/plugins/constants';

export function handleDisplayDataSource(props) {
  const nodePath = props.get('data-nodepath');
  if (nodePath) {
    const textField = props.get('textField');
    const mockTextField = textField || 'text';
    const mockData = [] as any;
    for (let i = 0; i < 3; i++) {
      const textContent = textField ? `{{${textField}}}` : '{{ item }}';
      mockData.push({
        [mockTextField]: textContent,
        children: [{ [mockTextField]: textContent }],
      });
    }
    return {
      dataSource: mockData,
    };
  }
  return {};
}
handleDisplayDataSource.type = $ide;
handleDisplayDataSource.order = 0;
