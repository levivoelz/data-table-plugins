import { makeData } from "@/data/tasks";

const tasks = makeData(10);

export async function GET() {
  return new Response(JSON.stringify(tasks), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}