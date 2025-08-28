import _ from 'lodash';
import { useMemo } from '@/plugins/hooks';

// TODO
export function useFont(props) {
  const font = props.get('font') ?? '{}';
  const fontProps = useMemo(() => {
    const jsonFont = _.isObject(font) ? font : _.attempt(JSON.parse, font);
    return _.isError(jsonFont) ? {} : jsonFont;
  }, [font]);
  return {
    font: fontProps,
  };
}

export function useGap(props) {
  const gap = props.get('gap') ?? '{}';
  const gapProps = useMemo(() => {
    if (_.isArray(gap) && gap.length === 2) return gap;

    const jsonGap = _.isString(gap) && !_.isEmpty(gap) ? _.attempt(JSON.parse, gap) : null;

    return _.isArray(jsonGap) && jsonGap.length === 2 ? jsonGap : [100, 100];
  }, [gap]);

  return { gap: gapProps };
}
useGap.order = 5;

export function useOffset(props) {
  const gap = props.get('gap') ?? [100, 100];
  const offset = props.get('offset') ?? '{}';
  const defaultOffset = [gap[0] / 2, gap[1] / 2];

  const offsetProps = useMemo(() => {
    const jsonOffset = _.isString(offset) && !_.isEmpty(offset) ? _.attempt(JSON.parse, offset) : null;

    return _.isArray(jsonOffset) && jsonOffset.length === 2 ? jsonOffset : defaultOffset;
  }, [gap, offset]);

  return { offset: offsetProps };
}
useOffset.order = 6;
