import { DoesZapCodeSpaceFlag } from 'v8';

type SimpleType = undefined | null | boolean | string | number;
interface FlatObject {
  [key: string]: SimpleType | SimpleType[];
}

export function flattenObject(obj: {}, ignoreKeys?: string[]): FlatObject {
  const res: FlatObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (ignoreKeys?.includes(key)) return;

    if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      assignObject(res, key, value);
    } else {
      assign(res, key, value as SimpleType);
    }
  });

  return res;
}

function assignObject(
  res: FlatObject,
  name: string,
  obj: {},
  ignoreKeys?: string[]
): void {
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = `${name}.${key}`;
    if (ignoreKeys?.includes(newKey)) return;

    if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      assignObject(res, newKey, value);
    } else {
      assign(res, newKey, value as SimpleType);
    }
  });
}

function assign(
  res: FlatObject,
  key: string,
  data: SimpleType | SimpleType[]
): void {
  res[key] = Array.isArray(data) ? data.join(', ') : data;
}
