import { makeData } from "@/data/people";

const people = makeData(10);

export async function GET(request: Request) {
  return new Response(JSON.stringify(people), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}