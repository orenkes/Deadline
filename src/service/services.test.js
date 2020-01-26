import fetchData from "./services";

describe("Testing API fetches", () => {
  test("Testing user login fetch to return one object back from the api", () => {
    fetchData({
      urlString: "logWithInput",
      method: "getByInput",
      userName: "Global",
      userPassword: 1234
    }).then(result => {
      expect(result.length).toEqual(1);
    });
  });

  it("Test user signup fetch to return back a mock object", async () => {
    expect.assertions(1);
    try {
      const result = await user.getUserName(1);
      expect(result).toBe("json");
    } catch (e) {
      expect(e).toEqual({
        error: "User with 1 not found."
      });
    }
  });
});
