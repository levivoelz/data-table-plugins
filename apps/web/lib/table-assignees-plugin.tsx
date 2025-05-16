import * as React from "react";
import Image from "next/image";
import {
  type ColumnDef,
  type Row,
  type Metadata,
} from "@workspace/ui/components/data-table";
import { MultipleSelector } from "@workspace/ui/components/multi-select";
import { type Person } from "@/data/people";

type UserBadgeProps = { name: string; avatar: string };

function UserBadge({ name, avatar }: UserBadgeProps) {
  return (
    <div className="flex gap-1.5">
      <Image
        alt={`${name} avatar`}
        src={avatar}
        className="rounded-full w-4"
        unoptimized
        width={50}
        height={50}
      />
      {name}
    </div>
  );
}

function cell<T>(name: string, metadata?: Metadata) {
  return function CellComponent({ row }: { row: Row<T> }) {
    if (!metadata) {
      // due to createColumn overload having optional metadata, metadata has to be an optional type even though it's needed here
      throw new Error(
        "metadata with users must be included in the assignees plugin"
      );
    }

    const users = metadata.users as Person[];
    const cellData = row.getValue(name) as UserBadgeProps[];

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

function header(name: string) {
  return function HeaderComponent() {
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
    header: header(headerName),
    cell: cell<T>(name, metadata),
  };
}

function getFullName(u: Person) {
  return `${u.firstName} ${u.lastName}`;
}

export default { assignees: createColumn };
