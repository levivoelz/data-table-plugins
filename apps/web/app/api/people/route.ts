import { searchObj } from "@/lib/helpers";
import { makeData, type Person } from "@/data/people";

const PEOPLE = makeData(1000);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");

  // Todo: use start and end in data table for server side pagination
  let people = PEOPLE.slice(Number(start), Number(end));

  console.log(people.length)

  if (query) {
    people = searchObj(PEOPLE, query) as Person[];
  }

  return new Response(JSON.stringify(people), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      total: people.length.toString(),
    },
  });
}
