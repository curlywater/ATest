"use strict";
import { default as generateSiteMap } from "../dist/Test4";
describe("Test4", () => {
  test("only one node", async () => {
    const nodes = [{ id: "1", name: "xxx ⻚⾯", pv: 10000 }];
    const links = [];

    expect(generateSiteMap(nodes, links)).toEqual([
      {
        id: "1",
        name: "xxx ⻚⾯",
        pv: 10000,
        level: 0,
        parent: null,
      },
    ]);
  });

  describe("directed complete graph", () => {
    const nodes = [
      { id: "1", name: "⻚⾯", pv: 10000 },
      { id: "2", name: "⻚⾯2", pv: 3000 },
      { id: "3", name: "⻚⾯3", pv: 7000 },
    ];
    const links = [
      { source: "1", target: "2", weight: 1000 },
      { source: "2", target: "1", weight: 500 },
      { source: "1", target: "3", weight: 5000 },
      { source: "3", target: "1", weight: 1000 },
      { source: "2", target: "3", weight: 800 },
      { source: "3", target: "2", weight: 300 },
    ];

    const sitemap = generateSiteMap(nodes, links);

    test("should sitemap tree deep be 3", () => {
      expect(sitemap).toHaveLength(3);
    });
    test("check root node", () => {
      expect(sitemap[0]["id"]).toBe("1");
      expect(sitemap[0]["parent"]).toBe(null);
      expect(sitemap[0]["level"]).toBe(0);
    });
    test("check second node", () => {
      expect(sitemap[1]["id"]).toBe("2");
      expect(sitemap[1]["parent"]).toBe("1");
      expect(sitemap[1]["level"]).toBe(1);
    });
    test("check third node", () => {
      expect(sitemap[2]["id"]).toBe("3");
      expect(sitemap[2]["parent"]).toBe("1");
      expect(sitemap[2]["level"]).toBe(1);
    });
  });

  describe(" graph", () => {
    const nodes = [
      { id: "1", name: "⻚⾯", pv: 10000 },
      { id: "2", name: "⻚⾯2", pv: 3000 },
      { id: "3", name: "⻚⾯3", pv: 7000 },
      { id: "4", name: "⻚⾯3", pv: 1000 },
      { id: "5", name: "⻚⾯3", pv: 3000 },
    ];
    const links = [
      { source: "1", target: "2", weight: 1000 },
      { source: "2", target: "1", weight: 500 },
      { source: "1", target: "3", weight: 5000 },
      { source: "3", target: "1", weight: 1000 },
      { source: "2", target: "3", weight: 800 },
      { source: "3", target: "2", weight: 300 },
      { source: "2", target: "4", weight: 300 },
      { source: "2", target: "5", weight: 400 },
      { source: "5", target: "3", weight: 400 },
      { source: "3", target: "5", weight: 300 },
      { source: "3", target: "6", weight: 300 },
      { source: "6", target: "7", weight: 300 },
    ];

    const sitemap = generateSiteMap(nodes, links);

    test("should sitemap tree deep be 7", () => {
      expect(sitemap).toHaveLength(7);
    });
    test("check nodes", () => {
      expect(sitemap[0]).toMatchObject({
        id: "1",
        parent: null,
        level: 0,
      });
      expect(sitemap[1]).toMatchObject({
        id: "2",
        parent: "1",
        level: 1,
      });
      expect(sitemap[2]).toMatchObject({
        id: "3",
        parent: "1",
        level: 1,
      });
      expect(sitemap[3]).toMatchObject({
        id: "4",
        parent: "2",
        level: 2,
      });
      expect(sitemap[4]).toMatchObject({
        id: "5",
        parent: "2",
        level: 2,
      });
      expect(sitemap[5]).toMatchObject({
        id: "6",
        parent: "3",
        level: 2,
      });
      expect(sitemap[6]).toMatchObject({
        id: "7",
        parent: "6",
        level: 3,
      });
    });
  });
});
