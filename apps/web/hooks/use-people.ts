import { Person } from "@/data/people";
import { useEffect, useState } from "react";

export function usePeople(query?: string) {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function getPeople() {
      let params;

      if (query) {
        params = new URLSearchParams({ query });
      }

      const baseURL = "/api/people";
      const url = params ? `${baseURL}?${params.toString()}` : baseURL;
      const data = await fetch(url).then((r) => r.json());

      setPeople(data);
    }

    getPeople();
  }, []);

  return people;
}
