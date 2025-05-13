import { type Schema } from "./validator";
import { plugins, type Plugin } from "./plugins";

// This function maps the row.cell type to the header and formats rows
type Column = { name: string; type: string }[];
type Row = Record<string, any>

export function negotiate(data: Schema) {
  const { headers, rows } = data;
  const cols: Column = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const row = rows[0];

    if (header && row) {
      const rowRawType = typeof row[i];
      const plugin = mapTypeToPlugin(rowRawType);

      cols[i] = {
        name: header,
        type: plugin.name,
      };
    }
  }

  const newRows = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row) {
      const newRow: Row = {};

      for (let j = 0; j < row.length; j++) {
        const col = cols[j];

        if (col) {
          newRow[col.name] = row[j]
        }
      }

      newRows.push(newRow)
    }
  }

  return {
    cols,
    rows: newRows
  }
}

/**
 * 
 * @param type string
 * @returns a plugin from the list of plugins
 * 
 * @todo This should somehow get the plugin from the list of plugins dynamically
 */
function mapTypeToPlugin(type: string): Plugin {
  if (type === "string") {
    return plugins.find(p => p.name === "text")!
  }

  if (type === "number") {
    return plugins.find(p => p.name === "number")!
  }

  return plugins.find(p => p.name === "text")!
}
