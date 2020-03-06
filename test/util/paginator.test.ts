import paginator from "../../app/util/paginator";

describe("Util: Paginator", () => {
  it("should return null when count < 1 or cursor < 0", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(paginator(0, 0, arr)).toBeNull();
    expect(paginator(-1, 0, arr)).toBeNull();
  });

  it("should cut array correctly", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(paginator(1, 3, arr)?.length).toBe(3);
    expect(paginator(1, 3, arr)).toEqual([3, 4, 5]);
  });
});
