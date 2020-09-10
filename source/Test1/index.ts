interface Person {
  name: string;
  age: number;
  parent: Person;
  children: Person[];
}
interface HashTable {
  [name: string]: number;
}
type OrphanMap = Map<string, number[]>;

class CSVFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CSVFormatError";
  }
}

class CSVDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CSVDataError";
  }
}

export default function parseCSVtoPersons(csv: string): Person[] {
  const [caption, ...lines] = csv.trim().split(/\n/);
  const persons: Person[] = [];
  const name2Index: HashTable = {};
  const orphanMap: OrphanMap = new Map();

  if (lines.length === 0) {
    return persons;
  }
  if (caption !== "name,age,parent") {
    throw new CSVFormatError("caption is not fit.");
  }


  for (let i = 0, len = lines.length; i < len; i++) {
    const items = lines[i].split(",");

    if (items.length < 3) {
      throw new CSVDataError(`Line ${i}: missing fields.`);
    }

    const [name, ageString, parentName] = items;
    if (!name.trim()) {
      throw new CSVDataError(`Line ${i}: ${name} is empty.`);
    }
    if (persons[name2Index[name]]) {
      throw new CSVDataError(`Line ${i}: ${name} is repeat.`);
    }

    const parent: Person = persons[name2Index[parentName]] ?? null;
    const childrenIndexes: number[] | undefined = orphanMap.get(name);

    const person: Person = {
      name,
      age: +ageString,
      parent,
      children: childrenIndexes?.map(index => persons[index]) ?? [],
    };

    const thisPersonIndex = name2Index[name] = persons.push(person) - 1;

    const isOrphan = parentName && !parent;
    if (isOrphan) {
      const newOrphanList = (orphanMap.get(parentName) ?? []).concat([thisPersonIndex]);
      orphanMap.set(parentName, newOrphanList);
    } else if (parent) {
      parent.children.push(person);
    }
    if (childrenIndexes) {
      childrenIndexes.forEach(index => {
        persons[index].parent = person;
      });
      orphanMap.delete(name);
    }
  }

  return persons;
}

