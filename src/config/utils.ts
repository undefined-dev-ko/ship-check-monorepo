export const required = <T>(value: T): T => {
  if (!value) {
    throw new Error(`the env '${value}' can not be null`);
  }
  return value;
};
