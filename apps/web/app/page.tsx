import { PersonTable } from "@/components/person-table";
import { TasksTable } from "@/components/tasks-table";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="min-w-2xl">
        <h1>Tasks</h1>
        <TasksTable />
      </div>
    </div>
  );
}
