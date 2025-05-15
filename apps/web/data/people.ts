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
  avatar: string;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: 0,
    firstName: firstName,
    lastName: lastName,
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
    tags: faker.helpers.arrayElements(
      ["fun", "energetic", "loud", "talented", "funny"],
      2
    ),
    avatar: `https://i.pravatar.cc/250?u=${firstName}+${lastName}`
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
