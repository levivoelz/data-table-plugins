import { useEffect, useState } from "react";
import { Task } from "@/data/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function getTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();

      setTasks(data);
    }

    getTasks();
  }, []);

  return tasks;
}
