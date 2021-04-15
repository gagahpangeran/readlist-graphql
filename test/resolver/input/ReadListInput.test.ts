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

  it("Should not validate wrong type input", async () => {
    const input = new ReadListInput();
    input.title = "test";
    input.link = "not a link";
    input.readAt = new Date("not date");
    input.comment = "test comment";

    const error = await validate(input);
    expect(error.length).toBeGreaterThan(0);
  });
});

describe("Test clean input ReadListInput", () => {
  const now = new Date();
  const input = new ReadListInput();
  input.title = " test ";
  input.link = " https://test.com ";
  input.readAt = now;
  input.comment = " test comment ";

  it("Should return clean input", async () => {
    const expectedResult = {
      title: "test",
      link: "https://test.com",
      readAt: now,
      comment: "test comment"
    };

    expect(input.cleanInput).toMatchObject(expectedResult);
  });

  it("Should not return the sampe input", async () => {
    expect(input.cleanInput).not.toMatchObject(input);
  });
});
