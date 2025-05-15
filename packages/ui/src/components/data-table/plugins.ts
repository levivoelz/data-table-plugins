import { type ColumnDef } from "@tanstack/react-table";
import textPlugin from "@workspace/ui/components/data-table/plugins/text";
import numberPlugin from "@workspace/ui/components/data-table/plugins/number";
import tagsPlugin from "@workspace/ui/components/data-table/plugins/tags";
import { type Metadata, type createColumn } from "@workspace/ui/components/data-table/types.js";

type Plugins = Record<string, typeof createColumn>; 

/**
 * If you are planning on designing your own plugin, see ./plugins/text.tsx for an example
 */
export function createPlugins(
  plugins?: Plugins
): Record<Assignment["pluginName"], typeof createColumn> {
  return {
    ...textPlugin,
    ...numberPlugin,
    ...tagsPlugin,
    ...plugins,
  };
}

type Assignment = {
  pluginName: "number" | "text" | "tags" | string;
  displayName: string;
};

export type PluginAssignmentDef = Record<string, Assignment>;

/**
 * This function sets up the column definition based on column assignment data.
 *
 * @example
 * {
 *  id: {
 *    pluginName: "number",
 *    displayName: "ID"
 *  },
 *  name: {
 *    pluginName: "text",
 *    displayName: "Name"
 *  },
 *  ...
 * }
 */
export function mapColTypeToPlugin<T>(
  colType: PluginAssignmentDef,
  plugins: Plugins,
  metadata?: Metadata
): ColumnDef<T>[] {
  const columns = Object.keys(colType).map((key) => {
    const col = colType[key]!;
    const { pluginName, displayName } = col;
    const plugin = plugins[pluginName] as typeof createColumn;

    return plugin(key, displayName, metadata);
  });

  return columns;
}
