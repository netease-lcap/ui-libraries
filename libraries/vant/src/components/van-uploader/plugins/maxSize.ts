import { useMemo } from '@/plugins/hooks';

const SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
type SizeUnit = (typeof SIZE_UNITS)[number];
interface SizeLimitObj {
  size: number;
  unit: SizeUnit;
  message?: string;
}
function getSizeLimit(val: string | number) {
  if (!val) {
    return undefined;
  }
  val = `${val}`;

  const index = SIZE_UNITS.reverse().findIndex((unit) => val.toUpperCase().endsWith(unit));
  if (index === -1 && Number.isNaN(Number(val))) {
    return undefined;
  }

  if (index === -1) {
    return {
      size: Number(val),
      unit: 'MB',
    } as SizeLimitObj;
  }

  const size = Number(val.substring(0, val.length - SIZE_UNITS[index].length));
  if (Number.isNaN(size)) {
    return undefined;
  }

  return {
    size,
    unit: SIZE_UNITS[index],
  } as SizeLimitObj;
}

/**
 * 获取文件大小限制
 * @param props 属性
 * @returns 属性
 */
export function getSizeForFile(props) {
  const maxSize = props.get('maxSize') || 50;
  const SIZE_UNITS = {
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    B: 1,
  };
  const maxSizeValue = useMemo(() => {
    const data = getSizeLimit(maxSize) as SizeLimitObj;
    if (!data) return undefined;
    return data.size * SIZE_UNITS[data.unit];
  }, [maxSize]);
  return {
    maxSize: maxSizeValue,
  };
}
