import textPlugin from "./plugins/text.js";
import numberPlugin from "./plugins/number.js";
import tagsPlugin from "./plugins/tags.js";

export function createPlugins(
  plugins?: Record<string, any>
): Record<
  "text" | "number" | "tags" | string,
  any // TODO: fix this type
  // <T>(name: string, headerName: string) => ColumnDef<T>
> {
  return {
    text: textPlugin.text,
    number: numberPlugin.number,
    tags: tagsPlugin.tags,
    ...plugins,
  };
}
