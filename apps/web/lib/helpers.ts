/**
 *
 * @param arr an array of objects
 * @param query string to base the search on
 * @returns the filtered array of objects
 *
 * This fn does a shallow search of object keys with string values. It does not search any other type.
 */
export function searchObj(arr: Record<string, any>[], query: string) {
  return arr.filter((obj) => {
    return Object.keys(obj).some((key) => {
      if (typeof obj[key] === "string") {
        return obj[key].toLocaleLowerCase().includes(query.toLocaleLowerCase());
      }
    });
  });
}
