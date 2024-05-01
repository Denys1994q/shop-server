export function convertEnumToObject(enumObject: any): any {
  const enumKeys = Object.keys(enumObject);
  const result = {};
  enumKeys.forEach((key) => {
    result[key] = enumObject[key];
  });
  return result;
}
