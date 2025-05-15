import { Person } from "@/data/people";
import { useEffect, useState } from "react";

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function getPeople() {
      const res = await fetch("/api/people");
      const data = await res.json();

      setPeople(data);
    }

    getPeople();
  }, []);

  return people;
}
