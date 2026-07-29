import _ from 'lodash';
import isNil from 'lodash/isNil';
import { useMemo } from '@/plugins/hooks';

const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
};

const getLcapTtl = (params) => {
  const { ttl, ttlValue } = params;
  if (isNil(ttl) && isNil(ttlValue)) {
    return {};
  }
  if (isNil(ttl) && !isNil(ttlValue)) {
    return { 'lcap-ttl': ttlValue };
  }
  if (ttl) {
    return { 'lcap-ttl': isNil(ttlValue) ? -1 : ttlValue };
  }
  return {};
};

/**
 * 处理请求头
 * @param props 属性
 * @returns 属性
 */
export function handleRequestHeaders(props) {
  const propHeaders = props.get('headers');
  const access = props.get('access');
  const ttl = props.get('ttl');
  const ttlValue = props.get('ttlValue');
  const fileConnectionGroup = props.get('fileConnectionGroup');

  const headersValue = useMemo(() => {
    const { appInfo } = window as any;
    const lcapAccessObject = access ? { 'lcap-access': access } : {};
    const DomainName = appInfo?.domainName ? { DomainName: appInfo.domainName } : {};
    const lcapTtl = getLcapTtl({ ttl, ttlValue });
    const Authorization = { Authorization: getCookie('Authorization') };
    const fileConnectionGroupHeaders = fileConnectionGroup ? { 'lcap-file-connection-group': fileConnectionGroup } : {};
    return _.assign(propHeaders, lcapAccessObject, DomainName, lcapTtl, Authorization, fileConnectionGroupHeaders);
  }, [propHeaders, access, ttl, ttlValue, fileConnectionGroup]);

  return {
    headers: headersValue,
  };
}
handleRequestHeaders.order = 2;

/**
 * 处理请求数据
 * @param props 属性
 * @returns 属性
 */
export function handleRequestData(props) {
  const propData = props.get('data');
  const lcapIsCompress = props.get('lcapIsCompress');
  const viaOriginURL = props.get('viaOriginURL');
  const action = props.get('action') || '/upload';

  const dataValue = useMemo(() => {
    const formData = {
      lcapIsCompress,
      viaOriginURL,
    };
    return { ...(_.isObject(propData) ? propData : {}), ...formData };
  }, [propData, lcapIsCompress, viaOriginURL]);

  return {
    data: dataValue,
    action,
  };
}
handleRequestData.order = 3;
