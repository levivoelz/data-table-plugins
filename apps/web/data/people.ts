import { faker } from "@faker-js/faker";

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  tags: string[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    id: 0,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
    tags: faker.helpers.arrayElements(["fun", "energetic", "loud", "talented"], 2)
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d, i): Person => {
      return {
        ...newPerson(),
        id: i,
      };
    });
  };

  return makeDataLevel();
}
