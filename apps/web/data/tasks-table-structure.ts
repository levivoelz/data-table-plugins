type Assignment = {
  pluginName: "link" | "text" | "assignees";
  displayName: string;
};

/**
 * @description this is the data structure used to map source data keys to specific plugins
 * and provides the header name.
 */
export const tasksTableStructure: Record<string, Assignment> = {
  id: {
    pluginName: "link",
    displayName: "ID",
  },
  name: {
    pluginName: "text",
    displayName: "Name"
  },
  status: {
    pluginName: "text",
    displayName: "Status",
  },
  assignees: {
    pluginName: "assignees",
    displayName: "Assignees"
  },
};
