type Row = Record<string, any>;
type Col = {
  name: string;
  type: string;
};

/**
 *
 * @description Samples a row, checks the type of each cell and dynamically assigns a type for use by plugins
 */
export function mapCellTypeToColumns(row: Row): Col[] {
  const headers = Object.keys(row || {});
  const cells = Object.values(row || {});

  if (headers.length !== cells.length)
    throw new Error("mismatch headers and cells length");

  const cols = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];

    if (header && row) {
      const rowRawType = typeof cells[i];
      const pluginType = mapTypeToPlugin(rowRawType);

      cols[i] = {
        name: header,
        type: pluginType,
      };
    }
  }

  return cols;
}

/**
 *
 * @param type string
 * @returns a plugin from the list of plugins
 *
 * @todo This should somehow get the plugin from the list of plugins dynamically
 */
function mapTypeToPlugin(type: string) {
  if (type === "string") {
    return "text";
  }

  if (type === "number") {
    return "number";
  }

  return "text";
}
