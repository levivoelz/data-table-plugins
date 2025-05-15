"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

import { DataTable } from "@workspace/ui/components/data-table";
import {
  createPlugins,
  mapColTypeToPlugin,
} from "@workspace/ui/components/data-table/plugins";

import { type Task } from "@/data/tasks";
import { useTasks } from "@/hooks/use-tasks";
import { usePeople } from "@/hooks/use-people";
import { tasksTableStructure } from "@/data/tasks-table-structure";
import tableLinkPlugin from "@/lib/table-link-plugin";
import tableAssigneePlugin from "@/lib/table-assignees-plugin";

export function TasksTable() {
  const plugins = createPlugins({
    link: tableLinkPlugin.link,
    assignees: tableAssigneePlugin.assignees,
  });
  const tasks = useTasks();
  const users = usePeople();
  const columns = mapColTypeToPlugin<TasksWithUsers>(
    tasksTableStructure,
    plugins,
    { users }
  );

  const tasksWithUsers = React.useMemo(() => {
    if (tasks.length === 0 || users.length === 0) return null;

    return tasks.map((t) => {
      return {
        ...t,
        assignees: t.assignees.map((assigneeId) => {
          const user = users.find((u) => u.id === assigneeId);

          if (!user)
            throw new Error(`User with id ${assigneeId} not found in user records`);

          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            avatar: user.avatar,
          };
        }),
      };
    });
  }, [users, tasks]);

  if (!columns || !tasksWithUsers) {
    return (
      <div className="flex justify-center min-h-96 items-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return <DataTable columns={columns} rows={tasksWithUsers} />;
}

type TasksWithUsers = Overwrite<
  Task,
  { assignees: { id: number; name: string; avatar?: string }[] }
>;

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
