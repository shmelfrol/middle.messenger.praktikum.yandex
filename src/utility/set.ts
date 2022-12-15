import { merge } from 'src/utility/merge';
import { Props, TJsonObject } from 'src/type_component';

export const set = (object: TJsonObject, path: string, value: Props | string): Props => {
  const result = path.split('.').reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value
  );

  // @ts-ignore
  return merge(object, result);
};
