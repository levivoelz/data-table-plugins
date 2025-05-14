import { ColumnDef, Row, Column } from "@workspace/ui/components/data-table";

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    const cellData = row.getValue(name) as string[];
    const value = cellData[0];
    const url = cellData[1];

    return <a href={url}>{value}</a>;
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
    header: header(headerName),
    cell: cell(name),
  };
}

export default { link: createColumn };
