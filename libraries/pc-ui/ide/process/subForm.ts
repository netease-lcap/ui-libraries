import * as naslTypes from '@nasl/ast-mini';
import { ProcessV2 } from './utils';
import {
  NameGroup,
  filterProperty,
  firstUpperCase,
  firstLowerCase,
} from '../blocks/utils';

import {
  genPropertyEditableTemplate,
  genColumnMeta,
} from '../blocks/genCommonBlock';

// ----------------------------------------------------------------------------- utils -----------------------------------------------------------------------------
// 生成当前子表单的命名组
function genSubFormNameGroup(
  variableConfig: any,
  likeComponent: any,
  isApprovePage: boolean,
) {
  const { entity, name, processName } = variableConfig;
  const entityName = entity.name;
  return {
    headerTitle: `子表单${entityName}`, // 子表单标题
    addInfo: likeComponent.getLogicUniqueName('addInfo'), // 添加信息逻辑
    copyInfo: likeComponent.getLogicUniqueName('copyInfo'), // 复制信息逻辑
    deleteInfo: likeComponent.getLogicUniqueName('deleteInfo'), // 删除信息逻辑
    tableNode: likeComponent.getViewElementUniqueName('tableView'), // 子表单table节点名
    dataSourceVarName: isApprovePage // 子表单数据源局部变量名
      ? `${processName}.${name}` // (审批页面)
      : `${firstLowerCase(entityName)}List`, // (申请页面)
    delInfoVarName: `del${entityName}`, // 子表单删除信息局部变量名
    delModalName: likeComponent.getViewElementUniqueName(
      `del${entityName}Modal`,
    ), // 删除弹窗节点名
    vModelName: 'current.item', // 子表单列v-model绑定值
    entityFullName: `${entity.getNamespace()}.${entityName}`, // 子表单实体全名
  };
}

// 复用genPropertyEditableTemplate，生成子表单列模版
function genSubFormColumnTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
) {
  let temp = genPropertyEditableTemplate(
    entity,
    property,
    nameGroup,
    selectNameGroupMap,
  );
  // case1: 选择器组件添加appendTo="body"属性
  temp = temp.replace(/<USelect(?![^>]*appendTo="body")/s, '<USelect appendTo="body" ');
  return temp;
}

// 子表单实体属性过滤
const filterProperties = [
  'id',
  'createdTime',
  'updatedTime',
  'createdBy',
  'updatedBy',
];

// 生成子表单列模版
function genTableColumnTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
) {
  const { title } = genColumnMeta(property, nameGroup);
  const required = property.required;
  const rules: Array<string> = [];
  if (property.rules && property.rules.length) {
    property.rules.forEach((rule) => {
      if (!rule.endsWith(')')) {
        rule += '()';
      }
      rules.push(`nasl.validation.${rule}`);
    });
  }
  if (required) rules.push('nasl.validation.required()');
  return `<UTableViewColumn
    width={180}
    field="${property.name}"
    slotTitle={
      <>
        ${required ? '<UText text="*" style="color: red;"></UText>' : ''} 
        <UText text="${title}"></UText>
      </>
    }
    slotCell={
        (current) => <UValidator label="${title}" appendTo="body" 
        ${rules.length ? `rules={[${rules.join(',')}]}` : ''} 
        style="width: 100%;">
            ${genSubFormColumnTemplate(
              entity,
              property,
              nameGroup,
              selectNameGroupMap,
            )}
        </UValidator>
    }
    slotExpander={
        (current) => <UTableViewExpander
            item={current.item}>
        </UTableViewExpander>
    }>
  </UTableViewColumn>`;
}

// ----------------------------------------------------------------------------- export ----------------------------------------------------------------------------
// 获取子表单配置
export function getSubFormConfig(process: ProcessV2) {
  const app = process.getAncestor('App');
  const processName = process.name;
  return (
    process?.bind?.typeAnnotation?.properties
      ?.filter((property: any) => property?.name?.startsWith('relation_data'))
      ?.map((property: any) => {
        const typeAnnotation = property?.typeAnnotation?.typeArguments?.[0];
        if (typeAnnotation) {
          const { typeName, typeNamespace } = typeAnnotation;
          const fullName = `${typeNamespace}.${typeName}`;
          return {
            name: property.name, // 子表单名称
            varName: firstLowerCase(typeName), // 局部变量名为首字母小写
            entity: app.findNodeByCompleteName(fullName), // 实体
            type: fullName,
            isMainEntity: false,
            processName,
          };
        }
      }) || []
  );
}

// 生成子表单新建实体的配置
export function genSubFormEntityNewComposite(
  entity: naslTypes.Entity,
  withConnection: boolean,
) {
  return entity.properties
    .map((property) => {
      const propertyName = property.name;
      return `${propertyName}: ${
        filterProperties.includes(propertyName)
          ? 'undefined'
          : withConnection
          ? `current.item.${propertyName}`
          : 'undefined'
      }`;
    })
    .join(', ');
}

// 生成子表单模版
export function genSubFormStencilTemplate(
  mainEntity: naslTypes.Entity,
  likeComponent: any,
  variableConfigList: Array<any>,
  selectNameGroupMap: Map<string, NameGroup>,
  isApprovePage: boolean, // 是否是审批页面
) {
  let result = '';
  variableConfigList.forEach((variableConfig) => {
    const { isMainEntity, entity } = variableConfig;
    if (!isMainEntity) {
      const entityName = entity.name;
      const subFormTitle = `子表单${entityName}`;
      const nameGroup = genSubFormNameGroup(
        variableConfig,
        likeComponent,
        isApprovePage,
      ); // 生成子表单命名组
      const properties = entity.properties.filter((property: any) => {
        return (
          !filterProperties.includes(property.name) &&
          property?.relationEntity !== mainEntity.name &&
          filterProperty('inForm')(property)
        );
      });
      const width = 60 + 160 + properties.length * 180; // “序号列 + 操作列 + 属性列” 的宽度
      result += `<UGridLayoutColumn span={12} style="margin-bottom: 24px;">
        <UFormItem layout="center" labelLayout="block" slotLabel={
          <UText text="${subFormTitle}"></UText>
        }>
          <ULinearLayout direction="vertical" mode="flex" alignment="start" justify="center">
            <ULinearLayout direction="horizontal" wrap={true}>
              <UButton color="primary" text="添 加" subFormBtnType="add"
                onClick={
                  function ${nameGroup.addInfo}(event) {
                    nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${nameGroup.entityFullName}>({ ${genSubFormEntityNewComposite(entity, false)} }))
                  }
              }></UButton>
            </ULinearLayout>
            <UValidator label="${subFormTitle}" style="width:100%;">
              <UTableView
                ref="${nameGroup.tableNode}"
                pageSize={20}
                pageNumber={1}
                dataSource={$sync(${nameGroup.dataSourceVarName})}
                pagination={false}
                showSizer={true}
                style="--custom-start: auto; width: min(${width}px, 100%);"
              >
                <UTableViewColumn
                  type="index"
                  width={60}
                  fixed={true}
                  slotTitle={ <UText text="序号"></UText> }
                  slotExpander={
                      (current) => <UTableViewExpander item={current.item}>
                      </UTableViewExpander>
                  }>
                </UTableViewColumn>
                ${properties
                  .map(
                    (property: any) =>
                      `${genTableColumnTemplate(
                        entity,
                        property,
                        nameGroup,
                        selectNameGroupMap,
                      )}`,
                  )
                  .join('\n')}
                <UTableViewColumn
                  width={160}
                  fixed={true}
                  subFormInitialColumn="action"
                  slotTitle={ <UText text="操作"></UText> }
                  slotCell={
                      (current) => <ULinearLayout direction="horizontal" wrap={true}>
                          <ULink text="复制"
                            onClick={
                              function ${nameGroup.copyInfo}(event) {
                                nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${nameGroup.entityFullName}>({ ${genSubFormEntityNewComposite(entity, true)} }))
                              }
                          }></ULink>
                          <ULink text="删除"
                            onClick={
                              function ${nameGroup.deleteInfo}(event) {
                                  ${nameGroup.delInfoVarName} = current.item
                                  $refs.${nameGroup.delModalName}.open()
                              }
                          }></ULink>
                      </ULinearLayout>
                  }
                  slotExpander={
                      (current) => <UTableViewExpander item={current.item}>
                      </UTableViewExpander>
                  }>
                </UTableViewColumn>
              </UTableView>
            </UValidator>
            <UModal ref="${nameGroup.delModalName}" icon="warning"
              slotTitle={
                <UText text="删除"></UText>
              }
              slotBody={
                <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="start">
                  <UText text="请确认是否删除？" style="font-size:18px;font-weight:bold;"></UText>
                  <UText text="删除后将无法恢复，请谨慎操作"></UText>
                </ULinearLayout>
              }
              slotFoot={
                <ULinearLayout justify="end" gap="normal">
                  <UButton text="取 消"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                          $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  ></UButton>
                  <UButton text="确 定" color="primary"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                          nasl.util.Remove(${nameGroup.dataSourceVarName}, ${nameGroup.delInfoVarName})
                          $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  ></UButton>
                </ULinearLayout>
              }
            ></UModal>
          </ULinearLayout>
        </UFormItem>
      </UGridLayoutColumn>\n`;
    }
  });
  return result;
}
