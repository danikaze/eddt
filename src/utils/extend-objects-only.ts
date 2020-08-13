/**
 * Deep extends objects (like jQuery.extend) but simply assign arrays
 * It ignores `null` and `undefined` values
 *
 * @param args List of objects to extend.
 *             Use a new object `{}` as the first argument to clone
 */
export function extendObjectsOnly<T>(
  ...args: (Partial<T> | undefined)[]
): Partial<T> {
  let target = args[0] as Partial<T>;

  if (!isObject(target)) {
    target = {};
  }

  for (let i = 1; i < args.length; i++) {
    const source = args[i];

    // ignore null/undefined source objects
    // tslint:disable-next-line:triple-equals
    if (source == undefined) {
      continue;
    }

    // extend the target
    Object.keys(source).forEach((k) => {
      const key = k as keyof T;
      const value = source[key];

      // prevent infinite loops
      if (value === target) {
        return;
      }

      if (isObject(value)) {
        target[key] = extendObjectsOnly(target[key]!, value) as T[keyof T];
        // ignore undefined values (will copy null ones)
      } else if (value !== undefined) {
        target[key] = value;
      }
    });
  }

  return target;
}

// note that it doesn't check for prototypes
// therefore instances of classes will return `true`
function isObject(value: unknown): value is {} {
  // tslint:disable:triple-equals
  const type = typeof value;
  return (
    value != null &&
    type === 'object' &&
    toString.call(value) !== '[object Array]'
  );
}
