export function genCurdTableBlock(entity, view) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityLowerName = entityName.toLowerCase();
  const entityFullName = `${namespace}.${entityName}`;
  const code = `
        export function view() {
            let entity1: ${entityFullName};
            let input: ${entityFullName};
            let filter: ${entityFullName};
            let isUpdate: Boolean;
            
            const $lifecycles = {
                onCreated: [
                    function init(event) {
                        nasl.util.Clear(filter);
                        return;
                    },     
                ]      
            }

            return <ULinearLayout>
                <ULinearLayout></ULinearLayout>
                <ULinearLayout>
                    <ULink
                        ref="link_1" 
                        text="刷新" 
                        onClick={
                            function remove(event) {
                                ${namespace}.logics.delete(current.item.entity1.id)
                                $refs.tableView_1.reload()
                                return;
                            }          
                        }>
                    </ULink>
                </ULinearLayout>
                <UTableView
                    dataSource={app.logics.loadTable13TableView_1(elements.$ce.page, elements.$ce.size, elements.$ce.sort, elements.$ce.order, filter)}
                    valueField="entity1.id"
                    pagination={true}
                    showSizer={true}
                    pageSize={20}
                    pageNumber={1}>
                        <UTableViewColumn
                        field="entity1.property2"
                        slotExpander={
                            (current) => <UTableViewExpander item={current.item}></UTableViewExpander>
                        }
                        slotCell={
                            (current) => <ULinearLayout gap="small">
                                <UText text={current.item.entity1.property2}></UText>
                            </ULinearLayout>
                        }
                        slotTitle={
                            () => <UText text="property2"></UText>
                        }>
                    </UTableViewColumn>
                    <UTableViewColumn
                        slotExpander={
                            (current) => <UTableViewExpander item={current.item}></UTableViewExpander>
                        }
                        slotCell={
                            (current) => (
                                <>
                                <ULink 
                                    text="修改"
                                    onClick={
                                        function modify(event) {
                                            isUpdate = true
                                            input = nasl.util.Clone(current.item.entity1)
                                            $refs.saveModal_1.open()
                                            return;
                                        }
                                    }>
                                </ULink>,
                                <ULink 
                                    text="修改"
                                    onClick={
                                        function remove(event) {
                                            app.dataSources.defaultDS.entities.Entity1.logics.delete(current.item.entity1.id)
                                            $refs.tableView_1.reload()
                                            return;
                                        }
                                    }>
                                </ULink>
                                </>
                            )  
                        }
                        soltTitle={
                            () => <UText text="操作"></UText>
                        }>
                    </UTableViewColumn>
                    </UTableView>
            </ULinearLayout>
        }

        export namespace app.logics {
            export function loadTable13TableView_1(page, size) {
                let result;
                result = PAGINATE(FROM(${entityFullName}, ${entityName} => $
                .WHERE(() => LIKE(Entity1.property1, filter.property1) && LIKE(Entity1.property2, filter.property2))
                .ORDER_BY(() => [sort, order])
                .SELECT(() => ({
                    ${entityLowerName}: ${entityName},
                }))), page, size)
                return result;
            } 
        }
    `;
  return code;
}
