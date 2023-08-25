export type TableEntry = {
  kind: "filled",
  hour: number,
  id: string,
  name: string,
  small?: string,
  rowspan: number,
} | {
  kind: "empty",
  hour: number,
  rowspan: number;
} | {
  kind: "none",
  hour: number;
};

export type TableColumn = {
  label: string;
  cols: TableEntry[][];
};