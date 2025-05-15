import { faker } from "@faker-js/faker";
import { type Person } from "./people";

export type Task = {
  id: number;
  name: string;
  status: "done" | "in-progress";
  assignees: Person["id"][];
};

function newTask(): Task {
  return {
    id: 0,
    name: faker.lorem.words(3),
    status: faker.helpers.shuffle<Task["status"]>(["done", "in-progress"])[0]!,
    assignees: [0, 1],
  };
}

export function makeData(items: number) {
  const tasks: Task[] = [];

  for (let i = 0; i < items; i++) {
    tasks.push({
      ...newTask(),
      id: i,
    });
  }

  return tasks;
}
