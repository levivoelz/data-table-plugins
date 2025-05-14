import { PersonTable } from "@/components/PersonTable";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="min-w-2xl">
        <PersonTable />
      </div>
    </div>
  );
}
