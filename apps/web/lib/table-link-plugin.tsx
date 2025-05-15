import {
  type ColumnDef,
  type Row,
} from "@workspace/ui/components/data-table";

function cell<T>(name: string) {
  return function CellComponent({ row }: { row: Row<T> }) {
    const value = row.getValue(name) as string;

    return (
      <a className="underline" href={value}>
        {value}
      </a>
    );
  };
}

function header(name: string) {
  return function HeaderComponent() {
    return <div>{name}</div>;
  };
}

function createColumn<T>(name: string, headerName: string): ColumnDef<T> {
  return {
    accessorKey: name,
    cell: cell<T>(name),
    header: header(headerName),
  };
}

export default { link: createColumn };
