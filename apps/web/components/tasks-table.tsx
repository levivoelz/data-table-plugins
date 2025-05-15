"use client";

import React from "react";
import { LoaderCircle } from "lucide-react";

import { DataTable } from "@workspace/ui/components/data-table";
import { createPlugins } from "@workspace/ui/components/data-table/plugins";

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

  // this maps the col type to the plugin
  const columns = Object.keys(tasksTableStructure).map((k) => {
    const col = tasksTableStructure[k]!;
    const { pluginName, displayName } = col;

    return plugins[pluginName](k, displayName);
  });

  const tasksWithUsers = React.useMemo(() => {
    if (tasks.length === 0) return null;

    return tasks.map((t) => {
      return {
        ...t,
        assignees: t.assignees.map((a) => {
          const user = users.find((u) => u.id === a);

          return {
            name: `${user?.firstName} ${user?.lastName}`,
            avatar: user?.avatar,
          };
        }),
      };
    });
  }, [users, tasks]);

  if (!columns || !tasksWithUsers) {
    return (
      <div className="flex justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return <DataTable<TasksWithUsers> columns={columns} rows={tasksWithUsers} />;
}

type TasksWithUsers = Overwrite<
  Task,
  { assignees?: { name: string; avatar?: string }[] }
>;
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
