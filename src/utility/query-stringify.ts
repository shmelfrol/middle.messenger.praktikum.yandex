import {Props} from "src/type_component";

export const queryStringify = (data: Props) => {
  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};
