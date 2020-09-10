"use strict";

let parse;

describe("Test1", () => {
  beforeEach(() => {
    jest.resetModules();
    parse = require("../dist/Test1").default;
  });

  describe("ErrorHandlers", () => {
    it("should throws CSVFormatError when invalid csv format", () => {
      const { CSVFormatError } = require("../dist/Test1");
      expect(() =>
        parse(`
            name,year,parent
            Bob,30,David
            `)
      ).toThrowError(CSVFormatError);

      expect(() =>
        parse(`
            name,parent
            Bob,30,David
            `)
      ).toThrowError(CSVFormatError);

      expect(() =>
        parse(`
            Bob,30,David
            Anna,10,Bob
            `)
      ).toThrowError(CSVFormatError);
    });

    it("should throws CSVDataError when data missing fields", () => {
      const { CSVDataError } = require("../dist/Test1");
      expect(() =>
        parse(`
        name,age,parent
        Bob,30
        David,30,Bob
        `)
      ).toThrowError(CSVDataError);

      expect(() =>
        parse(`
        name,age,parent
        Bob,30,David
        David
        `)
      ).toThrowError(CSVDataError);
    });

    it("should throws CSVDataError when data name repeat", () => {
      const { CSVDataError } = require("../dist/Test1");
      expect(() =>
        parse(`
        name,age,parent
        Bob,30,David
        David,60,
        Bob,20,Anna
        `)
      ).toThrowError(CSVDataError);
    });

    it("should throws CSVDataError when data name is empty", () => {
      const { CSVDataError } = require("../dist/Test1");
      expect(() =>
        parse(`
        name,age,parent
        ,30,David
        David,60,
        `)
      ).toThrowError(CSVDataError);
    });
  });

  describe("DataHandlers", () => {
    describe("check edge data", () => {
      it("should return empty for no data csv", () => {
        expect(parse(``)).toEqual([]);
        expect(parse(`name,age,parent`)).toEqual([]);
        expect(
          parse(`
                  name,age,parent
                  `)
        ).toEqual([]);
      });
    });

    describe("3 generations in the same house", () => {
      let persons;
      beforeAll(() => {
        persons = parse(
          `name,age,parent\n` +
            `Bob,30,David\n` +
            `David,60,\n` +
            `Anna,10,Bob\n`
        );
      });
      it("check name field", () => {
        expect(persons[0]["name"]).toBe("Bob");
        expect(persons[1]["name"]).toBe("David");
        expect(persons[2]["name"]).toBe("Anna");
      });
      it("check age field", () => {
        expect(persons[0]["age"]).toBe(30);
        expect(persons[1]["age"]).toBe(60);
        expect(persons[2]["age"]).toBe(10);
      });

      it("check parent field", () => {
        expect(persons[0]["parent"]).toBe(persons[1]);
        expect(persons[1]["parent"]).toBe(null);
        expect(persons[2]["parent"]).toBe(persons[0]);
      });

      it("check children field", () => {
        expect(persons[0]["children"]).toHaveLength(1);
        expect(persons[0]["children"][0]).toBe(persons[2]);
        expect(persons[1]["children"]).toHaveLength(1);
        expect(persons[1]["children"][0]).toBe(persons[0]);
        expect(persons[2]["children"]).toHaveLength(0);
        expect(persons[2]["children"]).toEqual([]);
      });
    });
  });

  describe("3 generations in the same house", () => {
    let persons;
    beforeAll(() => {
      persons = parse(
        `name,age,parent\n` + `Bob,30,David\n` + `David,60,\n` + `Anna,10,Bob\n`
      );
    });
    it("check name field", () => {
      expect(persons[0]["name"]).toBe("Bob");
      expect(persons[1]["name"]).toBe("David");
      expect(persons[2]["name"]).toBe("Anna");
    });
    it("check age field", () => {
      expect(persons[0]["age"]).toBe(30);
      expect(persons[1]["age"]).toBe(60);
      expect(persons[2]["age"]).toBe(10);
    });

    it("check parent field", () => {
      expect(persons[0]["parent"]).toBe(persons[1]);
      expect(persons[1]["parent"]).toBe(null);
      expect(persons[2]["parent"]).toBe(persons[0]);
    });

    it("check children field", () => {
      expect(persons[0]["children"]).toHaveLength(1);
      expect(persons[0]["children"][0]).toBe(persons[2]);
      expect(persons[1]["children"]).toHaveLength(1);
      expect(persons[1]["children"][0]).toBe(persons[0]);
      expect(persons[2]["children"]).toHaveLength(0);
      expect(persons[2]["children"]).toEqual([]);
    });
  });

  describe("one man with two kids", () => {
    let persons;
    beforeAll(() => {
      persons = parse(
        `name,age,parent\n` +
          `Bob,30,David\n` +
          `David,60,\n` +
          `Anna,20,David\n`
      );
    });
    it("check name field", () => {
      expect(persons[0]["name"]).toBe("Bob");
      expect(persons[1]["name"]).toBe("David");
      expect(persons[2]["name"]).toBe("Anna");
    });
    it("check age field", () => {
      expect(persons[0]["age"]).toBe(30);
      expect(persons[1]["age"]).toBe(60);
      expect(persons[2]["age"]).toBe(20);
    });

    it("check parent field", () => {
      expect(persons[0]["parent"]).toBe(persons[1]);
      expect(persons[1]["parent"]).toBe(null);
      expect(persons[2]["parent"]).toBe(persons[1]);
    });

    it("check children field", () => {
      expect(persons[0]["children"]).toHaveLength(0);
      expect(persons[0]["children"]).toEqual([]);
      expect(persons[1]["children"]).toHaveLength(2);
      expect(persons[1]["children"][0]).toBe(persons[0]);
      expect(persons[1]["children"][1]).toBe(persons[2]);
      expect(persons[2]["children"]).toHaveLength(0);
      expect(persons[2]["children"]).toEqual([]);
    });
  });
});
