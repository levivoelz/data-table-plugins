import textPlugin from "./plugins/text.js";
import numberPlugin from "./plugins/number.js";
import tagsPlugin from "./plugins/tags.js";
import { ColumnDef } from "@tanstack/react-table";

type Plugins = Record<string, any>;

/**
 * If you are planning on designing your own plugin, see ./plugins/text.tsx for an example
 */
export function createPlugins(
  plugins?: Plugins
): Record<Assignment["pluginName"], Plugins> {
  return {
    text: textPlugin.text,
    number: numberPlugin.number,
    tags: tagsPlugin.tags,
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
  plugins: Plugins
): ColumnDef<T>[] {
  const columns = Object.keys(colType).map((key) => {
    const col = colType[key]!;
    const { pluginName, displayName } = col;
    const plugin = plugins[pluginName];

    return plugin(key, displayName);
  });

  return columns;
}
