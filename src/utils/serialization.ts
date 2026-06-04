/**
 * EN: Safe serialization utilities.
 * FR: Utilitaires de sérialisation sûre.
 */

/**
 * EN: Safely stringify an object, handling circular references.
 * FR: Stringifier un objet de façon sûre, gérant les références circulaires.
 */
export const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj);
  } catch (err) {
    console.error('Failed to stringify object', err);
    return '{}';
  }
};

/**
 * EN: Safely parse a JSON string.
 * FR: Parser une chaîne JSON de façon sûre.
 */
export const safeParse = <T>(str: string, fallback: T): T => {
  try {
    return JSON.parse(str) as T;
  } catch (err) {
    console.error('Failed to parse JSON string', err);
    return fallback;
  }
};
