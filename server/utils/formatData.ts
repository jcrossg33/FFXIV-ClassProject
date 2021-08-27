import isPlainObject from 'lodash.isplainobject';
//these functions return object keys in camelCase

// @ts-ignore
export function formatData(data: any[]) {
  const formattedData = Object.entries(data);

  return formattedData.reduce((acc, [key, value]) => {
    if (isPlainObject(value)) {
      return { ...acc, [key.toLowerCase()]: formatData(value) };
    }
    return { ...acc, [key.toLowerCase()]: value };
  }, {});
}

export function formatGearSet(gear: any[]) {
  const formattedGear = Object.entries(gear);
  // @ts-ignore
  return formattedGear.reduce((acc, [key, value]) => {
    return [...acc, { category: key, value }];
  }, []);
}

//this function return an array of results in camelCase
export function formatResults(arrayOfResults: any[]) {
  return arrayOfResults.map((result) => formatData(result));
}
