import React from "react";
import { ColumnDef, Row, Column } from "@workspace/ui/components/data-table";
import { MultipleSelector } from "@workspace/ui/components/multi-select";
import { type Person } from "@/data/people";
import { usePeople } from "@/hooks/use-people";

function UserBadge({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex gap-2">
      <img src={avatar} className="rounded-full w-4" />
      {name}
    </div>
  );
}

function cell<T>(name: string) {
  return ({ row }: { row: Row<T> }) => {
    const users = usePeople();
    const cellData = row.getValue(name) as any[];

    return (
      <MultipleSelector
        list={users.map((u) => ({
          value: getFullName(u),
          label: (
            <UserBadge name={getFullName(u)} avatar={u.avatar} />
          ),
        }))}
        defaultValues={cellData.map((u) => u.name)}
        placeholder="Assign users"
        truncateValues
      />
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

function getFullName(u: Person) {
  return `${u.firstName} ${u.lastName}`
} 

export default { assignees: createColumn };
