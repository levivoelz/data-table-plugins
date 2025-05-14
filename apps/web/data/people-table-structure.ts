type Assignment = {
  pluginName: "link" | "text" | "number" | "tags";
  displayName: string;
};

/**
 * @description this is the data structure used to map source data keys to specific plugins
 * and provides the header name.
 */
export const peopleTableStructure: Record<string, Assignment> = {
  id: {
    pluginName: "link",
    displayName: "ID",
  },
  firstName: {
    pluginName: "text",
    displayName: "First Name",
  },
  lastName: {
    pluginName: "text",
    displayName: "Last Name",
  },
  age: {
    pluginName: "number",
    displayName: "Age",
  },
  visits: {
    pluginName: "number",
    displayName: "Visits",
  },
  progress: {
    pluginName: "number",
    displayName: "Progress",
  },
  status: {
    pluginName: "text",
    displayName: "Status",
  },
  tags: {
    pluginName: "tags",
    displayName: "Tags",
  },
};
