import createDateSum from "./createDateSum";

describe("Testing createDateSum function", () => {
  test("should create dateSum when creating a new user", () => {
    const result = createDateSum("2020-01-17T13:05:36.039Z");
    expect(result).toBe(202001171305);
  });
  test("should create dateSum when creating a new task on an exsiting user", () => {
    const result = createDateSum("2222-02-22T14:22");
    expect(result).toBe(222202221422);
  });
});
