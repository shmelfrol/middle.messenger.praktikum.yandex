
import { merge} from "src/utility/merge";

export const set = (object, path: string, value) => {
  const result = path.split('.').reduceRight(
    (acc, key) => ({
      [key]: acc,
    }),
    value
  );

  return merge(object, result);
};

