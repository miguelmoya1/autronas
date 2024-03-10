export const defaultTableData = <T>(value: T) => {
  if (value) {
    return value;
  }

  return {
    count: 0,
    data: [],
    hasNext: false,
    hasPrevious: false,
  };
};
