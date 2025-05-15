import { Person } from "@/data/people";
import { useEffect, useState } from "react";

export function usePeople(start: number = 0, end: number = 10, query?: string) {
  const [people, setPeople] = useState<Person[]>([]);
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    async function _getPeople() {
      const { data, total } = await getPeople(start, end, query);
      setPeople(data);
      setTotal(total);
    }

    _getPeople();
  }, []);

  return { people, total, getPeople };
}

async function getPeople(start: number, end: number, query?: string) {
  let params = new URLSearchParams({
    start: start.toString(),
    end: end.toString(),
  });

  if (query) {
    params.append("query", query);
  }

  const baseURL = "/api/people";
  const url = `${baseURL}?${params.toString()}`;
  const res = await fetch(url);
  const headers = res.headers;
  const data = await res.json();

  return { data, total: Number(headers.get("total")) };
}
