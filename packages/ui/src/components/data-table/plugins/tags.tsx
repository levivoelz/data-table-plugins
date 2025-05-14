import { type Row, type Column, type ColumnDef } from "@tanstack/react-table";

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    const cell = row.getValue(name) as string[];
    return (
      <div className="flex gap-2">
        {cell.map((x) => {
          return (
            <span key={x} className="border px-2">
              {x}
            </span>
          );
        })}
      </div>
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
    header: header(headerName),
    cell: cell(name),
  };
}

export default { tags: createColumn };
