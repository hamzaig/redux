import { isEven } from "./math";

describe("isEven", () => {
  it("should return true if given an even number", () => {
    // Function Under Test(SUT)
    const result = isEven(4);
    //Assertion
    expect(result).toEqual(true);
  })
  it("should return false if given an odd number", () => {
    // Function Under Test(SUT)
    const result = isEven(3);
    //Assertion
    expect(result).toEqual(false);
  })
})