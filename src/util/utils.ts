export const renderNamesList = (names: string[]): string =>
  names.join(", ").replace(/, ([^,]*)$/, " und $1");
