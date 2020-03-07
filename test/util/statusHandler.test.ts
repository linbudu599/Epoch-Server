import {
  UserStatusHandler,
  ArticleStatusHandler
} from "./../../app/util/statusHandler";

describe("Util: Status Handler", () => {
  it("should return user status", () => {
    expect(new UserStatusHandler(1, "token", "success")).toEqual({
      code: 1,
      token: "token",
      message: "success"
    });
  });

  it("should return article status", () => {
    expect(new ArticleStatusHandler(5, 1, "success")).toEqual({
      aid: 5,
      status: 1,
      message: "success"
    });
  });
});
