import { parse } from "@/lib/validator";
import { negotiate } from "@/lib/negotiator";
import { makeData } from "@/data/people";

// TODO: Fetch this from the API
const people = makeData(10);
const headers = Object.keys(people[0] || {});
const rows = people.map((p) => Object.values(p));
const rawData = {
  headers,
  rows,
};

export default function Page() {
  let data;

  try {
    const parsedData = parse(rawData);
    data = negotiate(parsedData);
    console.log(data);
  } catch (e) {
    alert(e);
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          {data?.cols.map((c, i) => <span key={c.name + i}>{c.name}</span>)}
        </div>
        {data?.rows.map((r, i) => (
          <div key={r.lastName + i} className="flex gap-2">
            {Object.values(r).map((cell, i) => (
              <span key={r.lastName + cell + i}>{cell}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
