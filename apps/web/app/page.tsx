import { PersonTable } from "@/components/person-table";
import { TasksTable } from "@/components/tasks-table";

export default function Page() {
  return (
    <div className="flex justify-center min-h-svh py-8">
      <div className="flex flex-col gap-8">
        <div className="prose dark:prose-invert">
          <h1>Tasks</h1>
          <p>
            The tasks table gets it's structure from a config object. See
            data/tasks-table-structure.ts.
          </p>
          <div className="not-prose">
            <TasksTable />
          </div>
        </div>
        <div className="prose dark:prose-invert">
          <h1>People</h1>
          <p>
            The person table's structure is interpreted at runtime based on cell
            content types. see components/person-table.tsx:19
          </p>
          <div className="not-prose">
            <PersonTable />
          </div>
        </div>
      </div>
    </div>
  );
}
