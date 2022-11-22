import { TJsonObject } from 'src/types';

export const queryStringify = (data: TJsonObject) => {
  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};
