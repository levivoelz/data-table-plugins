import { type PluginAssignmentDef } from "@workspace/ui/components/data-table/plugins";

/**
 * @description this is the data structure used to map source data keys to specific plugins
 * and provides the header name.
 */
export const tasksTableStructure: PluginAssignmentDef = {
  id: {
    pluginName: "link",
    displayName: "ID",
  },
  name: {
    pluginName: "text",
    displayName: "Name",
  },
  status: {
    pluginName: "text",
    displayName: "Status",
  },
  assignees: {
    pluginName: "assignees",
    displayName: "Assignees",
  },
};
