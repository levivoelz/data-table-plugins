export type Metadata = Record<string, any>;

export function createColumn<T>(
  name: string,
  headerName: string,
  metadata?: Metadata
): ColumnDef<T>;
