import createRestHandler from "@Bakery/createRestHandler";
import { describe, expect, test } from "bun:test";

describe("Checking if createResthandler is able to", () => {
  const handler = createRestHandler("/lachen/:id1/:id2/:id3", () => 5);

  test("return a correct path", () => {
    expect(handler.path).toMatch("/lachen/:id1/:id2/:id3");
  });

  test("return the correct path variable names", () => {
    expect(handler.pathVariableNames).toEqual(["id1", "id2", "id3"]);
  });

  test("create a correct path matcher function", () => {
    const paths = ["/lachen", "/", "/lachen/weinen/tanzen/", "/lachen/1/2/3/"];

    expect(paths[0]).not.toMatch(handler.pathMatcher);
    expect(paths[1]).not.toMatch(handler.pathMatcher);
    expect(paths[2]).not.toMatch(handler.pathMatcher);
    expect(paths[3]).toMatch(handler.pathMatcher);
  });

  test("return the correct variables from a path", () => {
    const paths = [
      { path: "/lachen/1/2/3/", shouldBe: ["1", "2", "3"] },
      {
        path: "/lachen/undefined/null/1/",
        shouldBe: ["undefined", "null", "1"],
      },
      {
        path: "/lachen/weinen/tanzen/welt/",
        shouldBe: ["weinen", "tanzen", "welt"],
      },
    ];

    paths.forEach(({ path, shouldBe }) => {
      const match = path.match(handler.pathMatcher);
      if (match) {
        const [stringMatch, ...variables] = match;
        expect(variables).toEqual(shouldBe);
      }
    });
  });
});
