# Data Table

The data table is a reusable data grid component that handles varying data types out of the box and is extensible through a plugin system.

## Usage

```typescript
// App.tsx
import { DataTable } from "@workspace/ui/components/data-table/data-table";
import {
  createPlugins,
  mapColTypeToPlugin,
  type PluginAssignmentDef
} from "@workspace/ui/components/data-table/plugins";

const TASKS = [
  {
    id: 0,
    name: "Get groceries"
  },
  {
    id: 1,
    name: "Pick up kids"
  },
];

const PLUGIN_ASSIGNMENT: = PluginAssignmentDef = {
  id: {
    pluginName: "number",
    displayName: "ID",
  },
  name: {
    pluginName: "text",
    displayName: "Name",
  },
};

export function App() {
  const plugins = createPlugins();
  const columns = mapColTypeToPlugin(PLUGIN_ASSIGNMENT, plugins);

  return <DataTable columns={columns} rows={TASKS} />;
}
```

## Custom Plugin API
You can create your own plugins and add them to `createPlugins`.

### Example
```typescript
// link-plugin.tsx
import {
  type ColumnDef,
  type Row,
  type Metadata,
} from "@workspace/ui/components/data-table";

// This is the cell rendering component. It gets called for every cell in this column
function cell<T>(name: string) {
  return function CellComponent({ row }: { row: Row<T> }) {
    const value = row.getValue(name) as string;

    return (
      <a className="underline" href={value}>
        {value}
      </a>
    );
  };
}

// This is the header rendering component.
function header(name: string) {
  return function HeaderComponent() {
    return <div>{name}</div>;
  };
}

// This function can also take an optional parameter: `metadata` that can be passed to `cell` and/or `header` components
function createColumn<T>(name: string, headerName: string, metadata?: MetaData): ColumnDef<T> {
  return {
    accessorKey: name,
    cell: cell<T>(name),
    header: header(headerName),
  };
}

export default { link: createColumn };
```

```typescript
// App.tsx
import { DataTable } from "@workspace/ui/components/data-table/data-table";
import {
  createPlugins,
  mapColTypeToPlugin,
  type PluginAssignmentDef
} from "@workspace/ui/components/data-table/plugins";
import linkPlugin from "./link-plugin";

const TASKS = [
  {
    id: 0,
    name: "Get groceries",
    url: "https://safeway.com",
  },
  {
    id: 1,
    name: "Pick up kids",
    url: "https://summerfield.com",
  },
];

const PLUGIN_ASSIGNMENT: = PluginAssignmentDef = {
  id: {
    pluginName: "number",
    displayName: "ID",
  },
  name: {
    pluginName: "text",
    displayName: "Name",
  },
  url: {
    pluginName: "link",
    displayName: "Link",
  }
};

export function App() {
  const plugins = createPlugins({ ...linkPlugin });
  // const metadata = { foo: 'bar' };
  const columns = mapColTypeToPlugin(PLUGIN_ASSIGNMENT, plugins, /*metadata*/);

  return <DataTable columns={columns} rows={TASKS} />;
}
```

## Additional Info
For a more in depth overview, please reach out to [Levi](mailto:levivoelz@gmail.com) to set up a call.
