import { PersonTable } from "@/components/person-table";
import { TasksTable } from "@/components/tasks-table";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="min-w-2xl flex flex-col gap-8">
        <div>
          <h1>Tasks</h1>
          <p>
            The tasks table gets it's structure from a config object. See data/tasks-table-structure.ts.
          </p>
          <TasksTable />
        </div>
        <div>
          <h1>People</h1>
          <p>
            The person table's structure is defined on the fly based on cell content. see components/person-table.tsx:19
          </p>
          <PersonTable />
        </div>
      </div>
    </div>
  );
}
