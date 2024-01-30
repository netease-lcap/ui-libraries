// import fp from 'lodash/fp';

export function useHandle() {
  return {};
  // const children = props.get('children');
  // const columns = props.get('columns');
  // const columnsChildren = fp.filter((item: Record<string, any>) => item.type?.name === 'Column3');
  // const omitColumnsProps = fp.map((item: Record<string, any>) => item.props);
  // const childrenFlow = fp.flow(columnsChildren, omitColumnsProps);
  // const columnsCond = fp.cond([
  //   [fp.conforms({ columns: fp.isArray, children: fp.stubTrue }), fp.constant({ columns })],
  //   [fp.conforms({ children: fp.isArray }), fp.constant({ columns: childrenFlow(children) })],
  //   [fp.stubTrue, fp.stubObject],
  // ]);
  // return columnsCond({ columns, children });
}
