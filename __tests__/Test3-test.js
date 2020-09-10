"use strict";

let request;
let cacheRequest;
let resp;
describe("Test3", () => {
  beforeEach(() => {
    jest.resetModules();
    request = require("../dist/Test3/request").default;
    cacheRequest = require("../dist/Test3").default;
    jest.mock("../dist/Test3/request");

    resp = [{ name: "Bob" }];
    request.mockResolvedValue(resp);
  });
  test("should fetch mock data", async () => {
    const data = await Promise.all(
      new Array(10).fill("https://baidu.com").map(cacheRequest)
    );
    expect(data[0]).toEqual(resp);
  });

  test("should request only once where same urls", async () => {
    const data = await Promise.all(
      new Array(10).fill("https://baidu.com").map(cacheRequest)
    );
    expect(request.mock.calls.length).toBe(1);
  });

  test("should request three times where three different urls", async () => {
    await [...new Array(3).fill("A"), ...new Array(3).fill("B"), ...new Array(3).fill("C")].forEach(cacheRequest);
    expect(request.mock.calls.length).toBe(3);
  });
});
