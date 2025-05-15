import { searchObj } from "@/lib/helpers";
import { makeData, type Person } from "@/data/people";

let people = makeData(10);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query");

  if (query) {
    people = searchObj(people, query) as Person[];
  }

  return new Response(JSON.stringify(people), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
