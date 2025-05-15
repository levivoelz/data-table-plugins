import React from "react";
import {
  ColumnDef,
  Row,
  Column,
  Metadata,
} from "@workspace/ui/components/data-table";
import { MultipleSelector } from "@workspace/ui/components/multi-select";
import { type Person } from "@/data/people";

function UserBadge({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex gap-2">
      <img src={avatar} className="rounded-full w-4" />
      {name}
    </div>
  );
}

function cell<T>(name: string, metadata?: Metadata) {
  return ({ row }: { row: Row<T> }) => {
    if (!metadata) {
      // due to createColumn overload having optional metadata, metadata has to be an optional type even though it's needed here
      throw new Error(
        "metadata with users must be included in the assignees plugin"
      );
    }

    const users = metadata.users as Person[];
    const cellData = row.getValue(name) as any[];

    return (
      <MultipleSelector
        list={users.map((u) => ({
          value: getFullName(u),
          label: <UserBadge name={getFullName(u)} avatar={u.avatar} />,
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

function createColumn<T>(
  name: string,
  headerName: string,
  metadata?: Metadata
): ColumnDef<T> {
  return {
    accessorKey: name,
    header: header<T>(headerName),
    cell: cell<T>(name, metadata),
  };
}

function getFullName(u: Person) {
  return `${u.firstName} ${u.lastName}`;
}

export default { assignees: createColumn };
