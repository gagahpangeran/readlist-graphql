import { validate } from "class-validator";
import { ReadListInput } from "../../../src/resolver/input/ReadListInput";

describe("Test validation for ReadListInput", () => {
  it("Should validate all input type", async () => {
    const input = new ReadListInput();
    input.title = "test";
    input.link = "https://test.com";
    input.readAt = new Date();
    input.comment = "test comment";

    const error = await validate(input);
    expect(error.length).toBe(0);
  });
});
