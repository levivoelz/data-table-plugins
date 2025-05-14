type Assignment = {
  type: "link" | "text" | "number" | "tags";
  name: string;
};

export const peopleTableStructure: Record<string, Assignment> = {
  id: {
    type: "link",
    name: "ID",
  },
  firstName: {
    type: "text",
    name: "First Name",
  },
  lastName: {
    type: "text",
    name: "Last Name",
  },
  age: {
    type: "number",
    name: "Age",
  },
  visits: {
    type: "number",
    name: "Visits",
  },
  progress: {
    type: "number",
    name: "Progress",
  },
  status: {
    type: "text",
    name: "Status",
  },
  tags: {
    type: "tags",
    name: "Tags",
  },
};
