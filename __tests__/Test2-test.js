"use strict";

let find;

describe("Test2", () => {
  beforeEach(() => {
    jest.resetModules();
    find = require("../dist/Test2").default;
  });

  it("should throw Error when not is array", () => {
    expect(() => find("")).toThrow();
  });

  it("should return extend array for find", () => {
    const data = [];
    const result = find([]);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveProperty("where");
    expect(result["where"]).toBeInstanceOf(Function);
    expect(result).toHaveProperty("orderBy");
    expect(result["orderBy"]).toBeInstanceOf(Function);
  });

  describe(`"where" method`, () => {
    it(`should return filtered extend array after "where" title`, () => {
        const data = [
          { userId: 8, title: "title1" },
          { userId: 11, title: "other" },
          { userId: 15, title: null },
          { userId: 19, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.where({
          title: /\d$/,
        });
        expect(result).toBe(finder);
        expect(result).toEqual([
          {
            userId: 8,
            title: "title1",
          },
          {
            userId: 19,
            title: "title2",
          },
        ]);
        expect(result["where"]).toBeInstanceOf(Function);
        expect(result["orderBy"]).toBeInstanceOf(Function);
      });
    
      it(`should return filtered extend array after "where" userId`, () => {
        const data = [
          { userId: 8, title: "title1" },
          { userId: 11, title: "other" },
          { userId: 15, title: null },
          { userId: 19, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.where({
          userId: /^[0-9]$/,
        });
        expect(result).toBe(finder);
        expect(result).toEqual([
          {
            userId: 8,
            title: "title1",
          }
        ]);
      });
    
      it(`should filter all when "where" method condition invalid`, () => {
        const data = [
          { userId: 8, title: "title1" },
          { userId: 11, title: "other" },
          { userId: 15, title: null },
          { userId: 19, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.where({
          title: "title1",
        });
        expect(result).toBe(finder);
        expect(result).toEqual([]);
      });
    
  })
  

  describe(`"orderBy" method`, () => {
    it(`should return desc sorted array by default`, () => {
        const data = [
          { userId: 8, title: "title1" },
          { userId: 11, title: "other" },
          { userId: 15, title: null },
          { userId: 19, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.orderBy("userId")
        expect(result).toBe(finder);
        expect(result).toEqual([...data].reverse());
      });
    
      it(`should return asc sorted array when order mode is "asc"`, () => {
        const data = [
          { userId: 19, title: "title1" },
          { userId: 10, title: "other" },
          { userId: 6, title: null },
          { userId: 3, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.orderBy("userId", "asc")
        expect(result).toBe(finder);
        expect(result).toEqual([...data].reverse());
      });

      it(`should return sorted array when order by title`, () => {
        const data = [
          { userId: 6, title: null },
          { userId: 10, title: "other" },
          { userId: 19, title: "title1" },
          { userId: 3, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.orderBy("title")
        expect(result).toBe(finder);
        expect(result).toEqual([...data].reverse());
      });

      it(`should return array when order by invalid key`, () => {
        const data = [
          { userId: 6, title: null },
          { userId: 10, title: "other" },
          { userId: 19, title: "title1" },
          { userId: 3, title: "title2" },
        ];
        const finder = find(data);
        const result = finder.orderBy("unknown")
        expect(result).toBe(finder);
        expect(result).toEqual(data);
      });
  })

});
