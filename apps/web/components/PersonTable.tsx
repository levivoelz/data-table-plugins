"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

import { mapCellTypeToColumns } from "@/lib/table-helpers";
import { makeData, type Person } from "@/data/people";
import { DataTable } from "@workspace/ui/components/data-table";
import { createPlugins } from "@workspace/ui/components/data-table/plugins";

export function PersonTable() {
  const [people, setPeople] = React.useState<Person[]>();

  React.useEffect(() => {
    // TODO: Fetch this from the API
    setPeople(makeData(10));
  }, []);

  const plugins = createPlugins<Person>();

  // dynamically assign cell types.
  // TODO: this will recalculate every time people changes. The data shape and types should be determined once at a higher level
  const columns = React.useMemo(() => {
    if (!people) return null;

    return mapCellTypeToColumns(people[0]!).map((c) =>
      plugins[c.type](c.name, c.name)
    );
  }, [people]);

  // or statically assign them. This is more efficient as it will only happen once
  // const columns = [
  //   plugins.text("firstName", "First Name"),
  //   plugins.text("lastName", "Last Name")
  // ]

  if (!people || !columns)
    return (
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  return <DataTable<Person> columns={columns} rows={people} />;
}
