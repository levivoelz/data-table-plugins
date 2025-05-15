"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

// import { mapCellTypeToColumns } from "@/lib/table-helpers";
import { type Person } from "@/data/people";
import { usePeople } from "@/hooks/use-people";
import { peopleTableStructure } from "@/data/people-table-structure";
import tableLinkPlugin from "@/lib/table-link-plugin";
import { DataTable } from "@workspace/ui/components/data-table";
import { createPlugins } from "@workspace/ui/components/data-table/plugins";

export function PersonTable() {
  const plugins = createPlugins({ link: tableLinkPlugin.link });
  const people = usePeople();

  // dynamically assign cell types.
  // TODO: this will recalculate every time people changes. The data shape and types should be determined once at a higher level
  // const columns = React.useMemo(() => {
  //   if (!people) return null;

  //   return mapCellTypeToColumns(people[0]!).map((c) =>
  //     plugins[c.type](c.name, c.name)
  //   );
  // }, [people]);

  // this maps the col type to the plugin
  const columns = Object.keys(peopleTableStructure).map((k) => {
    const col = peopleTableStructure[k]!;
    const { pluginName, displayName } = col;
    return plugins[pluginName](k, displayName);
  });

  if (!people || !columns)
    return (
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );

  return <DataTable<Person> columns={columns} rows={people} />;
}
