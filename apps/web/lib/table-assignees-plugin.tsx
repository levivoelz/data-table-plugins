import { ColumnDef, Row, Column } from "@workspace/ui/components/data-table";

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    const cellData = row.getValue(name) as any[];

    return (
      <div className="flex gap-2">
        {cellData.map((d, i) => (
          <div key={d.name + i} className="flex items-center gap-2">
            <img className="rounded-full w-6" src={d.avatar} />
            {d.name}
          </div>
        ))}
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

export default { assignees: createColumn };
