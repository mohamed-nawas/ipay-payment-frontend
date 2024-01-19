
/**
 * This method is used to check if every property of given object
 * is not empty, i.e. 
 * for string => string !== ""
 * for number => number !== 0
 * 
 * @param obj input Object
 */

export const isEmptyObject = <T extends Record<string, string | number>>(obj: Partial<T>): boolean => {
    return Object.keys(obj).every((key: keyof T) => {
        if (typeof obj[key] === 'string') {
            return (obj[key] as string).trim() === "";
        } else if (typeof obj[key] === 'number') {
            return obj[key] === 0;
        }
        return false;
    });
};