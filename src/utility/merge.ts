

/* Объединяет 2 объекта путем мутации 1-ого */
export const merge = (lhs, rhs) => {
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
