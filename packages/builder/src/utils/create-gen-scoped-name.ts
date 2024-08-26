import path from 'path';
import { getHashDigest } from 'loader-utils';

export function createGenScopedName(prefix, rp = './') {
  return (name, filename) => {
    const rootPath = path.resolve(__dirname, rp);
    const request = path.relative(rootPath, filename.replace(/\.vue[\\/].*$/, ''));
    const tmpPath = filename
      .substring(0, filename.indexOf('?'))
      .replace(/\.vue[\\/]/g, '_')
      .replace(/\.(vue|css)$/g, '')
      .replace(/_(module|index)$/, '');
    let vueName = path.basename(tmpPath);
    if (vueName === 'index') {
      vueName = path.basename(path.resolve(tmpPath, '../'));
    }
    const content = [prefix, request].join('+');
    const hash = getHashDigest(content, 'md5', 'base64', 8);
    let scopedName = vueName;

    if (name !== 'root') {
      scopedName = `${scopedName}_${name}`;
    }

    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g');
    scopedName = `${scopedName}__${hash}`.replace(regex, '-').replace(/^((-?[0-9])|--)/, '_$1');

    return scopedName;
  };
}
