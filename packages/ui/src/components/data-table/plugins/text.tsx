import { type Row, type Column, type ColumnDef } from "@tanstack/react-table";

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    return <div>{row.getValue(name)}</div>;
  };
}

function header<T>(name: string) {
  return ({ column }: { column?: Column<T> }) => {
    return <div>{name}</div>;
  };
}

function createColumn<T>(name: string, headerName: string): ColumnDef<T> {
  return {
    accessorKey: name,
    header: header<T>(headerName),
    cell: cell<T>(name),
  };
}

export default { text: createColumn };
