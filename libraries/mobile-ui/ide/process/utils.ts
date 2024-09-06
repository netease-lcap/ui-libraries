import * as naslTypes from '@nasl/ast-mini';

export interface ProcessV2 {
  concept: 'ProcessV2';
  uniqueKey: string;
  name: string;
  title: string;
  description: string;
  bind: any;
  processDefinitions: any[];
  nextVersion: number;
  previewedVersion: number;
}

export function genProcessV2LaunchLogic(
  entityFullName: string,
  process: ProcessV2,
  nameGroup: any,
) {
  return `export function ${nameGroup.processLaunch}(param1: ${entityFullName}) {
    let variable1;
    let result;
    variable1 = ${entityFullName}Entity.create(param1);
    result = nasl.processV2.launchProcess(nasl.util.NewAnonymousStructure({ data:variable1 }), '${process.uniqueKey}');
    return result;
  }`;
}
