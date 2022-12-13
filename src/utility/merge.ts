

/* Объединяет 2 объекта путем мутации 1-ого */
import {Props} from "src/type_component";

export const merge = (lhs: Props, rhs: Props): Props => {
  const merged = lhs;

  Object.entries(rhs).forEach(([key, value]) => {
    if (
      !!merged[key] &&
      !Array.isArray(merged[key]) &&
      typeof merged[key] === 'object' &&
      typeof rhs[key] === 'object'
    ) {
      merged[key] = merge(merged[key], rhs[key]);
    } else {
      merged[key] = value;
    }
  });

  return merged;
};
