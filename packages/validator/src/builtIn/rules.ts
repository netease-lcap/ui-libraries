/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Rule } from '../types';

import en_US from '../locales/en-US';
import zh_CN from '../locales/zh-CN';
import ja from '../locales/ja';

const messages: { [prop: string]: { [prop: string]: string } } = {
  'en-US': en_US,
  'zh-CN': zh_CN,
  ja,
};

export default function localizeRules(locale: string) {
  if (!(locale in messages)) {
    locale = 'zh-CN';
  }
  const localized = messages[locale];

  return {
    required: {
      required: true,
      trigger: 'blur',
      message: localized.required,
    } as Rule,
    filled: {
      required: true,
      trigger: 'blur',
      message: localized.filled,
    } as Rule,
    notEmpty: {
      required: true,
      trigger: 'input+blur',
      message: localized.notEmpty,
    } as Rule,
    empty: { trigger: 'input+blur', message: localized.empty } as Rule,
    minLength: { trigger: 'blur', message: localized.minLength } as Rule,
    maxLength: { trigger: 'blur', message: localized.maxLength } as Rule,
    rangeLength: { trigger: 'blur', message: localized.rangeLength } as Rule,
    min: { trigger: 'blur', message: localized.min } as Rule,
    max: { trigger: 'blur', message: localized.max } as Rule,
    range: { trigger: 'blur', message: localized.range } as Rule,
    pattern: { trigger: 'input+blur', message: localized.pattern } as Rule,
    patternStr: {
      trigger: 'input+blur',
      message: localized.pattern,
    } as Rule,
    is: { trigger: 'blur', message: localized.is } as Rule,
    isNot: { trigger: 'blur', message: localized.isNot } as Rule,
    equals: { trigger: 'blur', message: localized.equals } as Rule,
    notEquals: { trigger: 'blur', message: localized.notEquals } as Rule,
    confirmed: {
      validate: 'is',
      trigger: 'blur',
      message: localized.confirmed,
    } as Rule,
    includes: { trigger: 'input+blur', message: localized.includes } as Rule,
    excludes: { trigger: 'input+blur', message: localized.excludes } as Rule,
    included: { trigger: 'input+blur', message: localized.included } as Rule,
    excluded: { trigger: 'input+blur', message: localized.excluded } as Rule,
    unique: {
      validate: 'excluded',
      trigger: 'blur',
      message: localized.unique,
    } as Rule,
    noDuplicates: {
      trigger: 'input+blur',
      message: localized.noDuplicates,
    } as Rule,
    string: { trigger: 'input+blur', message: localized.string } as Rule,
    number: { trigger: 'input+blur', message: localized.number } as Rule,
    numeric: { trigger: 'input+blur', message: localized.numeric } as Rule,
    integer: { trigger: 'input+blur', message: localized.integer } as Rule,
    decimal: { trigger: 'blur', message: localized.decimal } as Rule,
    boolean: { trigger: 'input+blur', message: localized.boolean } as Rule,
    function: { trigger: 'input+blur', message: localized.function } as Rule,
    object: { trigger: 'input+blur', message: localized.object } as Rule,
    plainObject: {
      trigger: 'input+blur',
      message: localized.plainObject,
    } as Rule,
    array: { trigger: 'input+blur', message: localized.array } as Rule,
    alpha: { trigger: 'input+blur', message: localized.alpha } as Rule,
    alphaNum: { trigger: 'input+blur', message: localized.alphaNum } as Rule,
    alphaDash: {
      trigger: 'input+blur',
      message: localized.alphaDash,
    } as Rule,
    alphaNumDash: {
      trigger: 'input+blur',
      message: localized.alphaNumDash,
    } as Rule,
    alphaSpaces: {
      trigger: 'input+blur',
      message: localized.alphaSpaces,
    } as Rule,
    lowerCase: {
      trigger: 'input+blur',
      message: localized.lowerCase,
    } as Rule,
    upperCase: {
      trigger: 'input+blur',
      message: localized.upperCase,
    } as Rule,
    '^az': { trigger: 'input+blur', message: localized['^az'] } as Rule,
    '^az09': { trigger: 'input+blur', message: localized['^az09'] } as Rule,
    '^az09_': { trigger: 'input+blur', message: localized['^az09_'] } as Rule,
    '^azAZ': { trigger: 'input+blur', message: localized['^azAZ'] } as Rule,
    '^azAZ09': { trigger: 'input+blur', message: localized['^azAZ09'] } as Rule,
    '^azAZ09_': {
      trigger: 'input+blur',
      message: localized['^azAZ09_'],
    } as Rule,
    az09$: { trigger: 'blur', message: localized.az09$ } as Rule,
    azAZ09$: { trigger: 'blur', message: localized.azAZ09$ } as Rule,
    '^09$': { trigger: 'input+blur', message: localized['^09$'] } as Rule,
    '^az09$': { trigger: 'input+blur', message: localized['^az09$'] } as Rule,
    '^az09-$': { trigger: 'input+blur', message: localized['^az09-$'] } as Rule,
    '^az09-.$': {
      trigger: 'input+blur',
      message: localized['^az09-.$'],
    } as Rule,
    '^azAZ09$': {
      trigger: 'input+blur',
      message: localized['^azAZ09$'],
    } as Rule,
    '^azAZ09-$': {
      trigger: 'input+blur',
      message: localized['^azAZ09-$'],
    } as Rule,
    '^azAZ09_$': {
      trigger: 'input+blur',
      message: localized['^azAZ09_$'],
    } as Rule,
    '^azAZ09-_$': {
      trigger: 'input+blur',
      message: localized['^azAZ09-_$'],
    } as Rule,
    '^az09-_$': {
      trigger: 'input+blur',
      message: localized['^az09-_$'],
    } as Rule,
    'without--': {
      trigger: 'input+blur',
      message: localized['without--'],
    } as Rule,
    without__: {
      trigger: 'input+blur',
      message: localized.without__,
    } as Rule,
    email: { trigger: 'blur', message: localized.email } as Rule,
    ip: { trigger: 'blur', message: localized.ip } as Rule,
    ipRange: { trigger: 'blur', message: localized.ipRange } as Rule,
    port: { trigger: 'blur', message: localized.port } as Rule,
    url: { trigger: 'blur', message: localized.url } as Rule,
    macAddress: { trigger: 'blur', message: localized.macAddress } as Rule,
    md5: { trigger: 'blur', message: localized.md5 } as Rule,
    ascii: { trigger: 'input+blur', message: localized.ascii } as Rule,
    // 'base32': { trigger: 'input+blur', message: localized['base32'] } as Rule,
    base64: { trigger: 'blur', message: localized.base64 } as Rule,
    byteLength: {
      trigger: 'input+blur',
      message: localized.byteLength,
    } as Rule,
    dataURI: { trigger: 'blur', message: localized.dataURI } as Rule,
    // 'magnetURI': { trigger: 'input+blur', message: localized['magnetURI'] } as Rule,
    divisibleBy: { trigger: 'blur', message: localized.divisibleBy } as Rule,
    halfWidth: {
      trigger: 'input+blur',
      message: localized.halfWidth,
    } as Rule,
    fullWidth: {
      trigger: 'input+blur',
      message: localized.fullWidth,
    } as Rule,
    hash: { trigger: 'blur', message: localized.hash } as Rule,
    hexColor: { trigger: 'blur', message: localized.hexColor } as Rule,
    hex: { trigger: 'blur', message: localized.hex } as Rule,
    // 'identityCard': { trigger: 'input+blur', message: localized['identityCard']} as Rule,
    creditCard: { trigger: 'blur', message: localized.creditCard } as Rule,
    fqdn: { trigger: 'blur', message: localized.fqdn } as Rule,
    // 'ipRange': { trigger: 'input+blur', message: localized['ipRange']} as Rule,
    ipOrFQDN: { trigger: 'blur', message: localized.ipOrFQDN } as Rule,
    isbn: { trigger: 'blur', message: localized.isbn } as Rule,
    issn: { trigger: 'blur', message: localized.issn } as Rule,
    isin: { trigger: 'blur', message: localized.isin } as Rule,
    iso8601: { trigger: 'blur', message: localized.iso8601 } as Rule,
    // 'rfc3339': { trigger: 'blur', message: localized['rfc3339'] } as Rule,
    iso31661Alpha2: {
      trigger: 'blur',
      message: localized.iso31661Alpha2,
    } as Rule,
    iso31661Alpha3: {
      trigger: 'blur',
      message: localized.iso31661Alpha3,
    } as Rule,
    json: { trigger: 'blur+input', message: localized.json } as Rule,
    jwt: { trigger: 'blur', message: localized.jwt } as Rule,
    latLong: { trigger: 'blur', message: localized.latLong } as Rule,
    mobile: { trigger: 'blur', message: localized.mobile } as Rule,
    mongoId: { trigger: 'blur', message: localized.mongoId } as Rule,
    postalCode: { trigger: 'blur', message: localized.postalCode } as Rule,
    uuid: { trigger: 'blur', message: localized.uuid } as Rule,
    chinese: { trigger: 'input+blur', message: localized.chinese } as Rule,
  } as { [prop: string]: Rule };
}
