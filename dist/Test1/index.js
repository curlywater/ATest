"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CSVFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "CSVFormatError";
    }
}
class CSVDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "CSVDataError";
    }
}
function parseCSVtoPersons(csv) {
    var _a, _b, _c;
    const [caption, ...lines] = csv.trim().split(/\n/);
    const persons = [];
    const name2Index = {};
    const orphanMap = new Map();
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
        const parent = (_a = persons[name2Index[parentName]]) !== null && _a !== void 0 ? _a : null;
        const childrenIndexes = orphanMap.get(name);
        const person = {
            name,
            age: +ageString,
            parent,
            children: (_b = childrenIndexes === null || childrenIndexes === void 0 ? void 0 : childrenIndexes.map(index => persons[index])) !== null && _b !== void 0 ? _b : [],
        };
        const thisPersonIndex = name2Index[name] = persons.push(person) - 1;
        const isOrphan = parentName && !parent;
        if (isOrphan) {
            const newOrphanList = ((_c = orphanMap.get(parentName)) !== null && _c !== void 0 ? _c : []).concat([thisPersonIndex]);
            orphanMap.set(parentName, newOrphanList);
        }
        else if (parent) {
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
exports.default = parseCSVtoPersons;
//# sourceMappingURL=index.js.map