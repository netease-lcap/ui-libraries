export function handleDataPath(props) {
    const nodePath = props.get('data-nodepath');
    const Component = props.get('render');
    console.log('👾nodePath', nodePath);
    console.log('👮props', props);
    console.log('🎅Component', Component);
}
