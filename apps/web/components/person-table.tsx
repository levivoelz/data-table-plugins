"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

import { mapCellTypeToColumns } from "@/lib/table-helpers";
import { type Person } from "@/data/people";
import { usePeople } from "@/hooks/use-people";
import tableLinkPlugin from "@/lib/table-link-plugin";
import { DataTable } from "@workspace/ui/components/data-table";
import { createPlugins } from "@workspace/ui/components/data-table/plugins";

export function PersonTable() {
  const plugins = createPlugins({ link: tableLinkPlugin.link });
  const people = usePeople();

  // dynamically assign cell types.
  // PERF WARNING: this will recalculate every time people changes. The data shape and types should be determined once at a higher level
  const columns = React.useMemo(() => {
    if (!people) return null;

    return mapCellTypeToColumns(people[0]!).map((c) => {
      const plugin = plugins[c.type];

      if (typeof plugin === "function") {
        return plugin(c.name, c.name);
      }

      throw new Error("Could not find Person col mapping for plugin");
    });
  }, [people]);

  if (!people || !columns)
    return (
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  return <DataTable<Person> columns={columns} rows={people} />;
}
