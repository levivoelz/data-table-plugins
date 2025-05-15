import { ColumnDef, Row, Column } from "@workspace/ui/components/data-table";

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    const value = row.getValue(name) as string;

    return (
      <a className="underline" href={value}>
        {value}
      </a>
    );
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
    cell: cell<T>(name),
    header: header<T>(headerName),
  };
}

export default { link: createColumn };
