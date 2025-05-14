import { type ColumnDef } from "@tanstack/react-table";
import textPlugin from "./plugins/text.js";
import numberPlugin from "./plugins/number.js";
import tagsPlugin from "./plugins/tags.js";

type Plugin<T> = ColumnDef<T>;

export function createPlugins<T>(
  plugins?: Plugin<T>[]
): Record<
  "text" | "number" | string,
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
