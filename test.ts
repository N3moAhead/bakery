import { log } from "console";

function getPath(newPath: string) {
  const parts = newPath.substring(1, newPath.length).split("/");
  const pathMatcher: String[] = [];
  const pathVariablNames: String[] = [];
  parts.forEach((part) => {
    /** Check if the current part is a variable */
    const variableCheck = part.match(/^:(.*)$/);
    if (variableCheck) {
      pathMatcher.push("([^/]+)");
      pathVariablNames.push(variableCheck[1]);
    } else {
      pathMatcher.push(part);
    }
  });

  return {
    newPath,
    matcher: new RegExp(`^/${pathMatcher.join("/")}/$`),
    variableNames: pathVariablNames,
  }
}

function findRightPath(paths: { matcher: RegExp, variableNames: string[] }[], givenUrl: String) {
  const newObj: {[key: string]: any} = {};
  paths.forEach((path) => {
    const match = givenUrl.match(path.matcher);
    if (match) {
      const [first, ...everythingElse] = match;
      everythingElse.forEach((value, index) => {
        newObj[path.variableNames[index]] = value;
      });
      return;
    }
  });
  return newObj;
}

const paths = [
  getPath("/sales/orders/:id"),
  getPath("/sales/orders/:id/edit"),
  getPath("/:id/:id2/:id3/:id4"),
];

const givenPath2 = "/sales/orders/198398371/edit/";

log(findRightPath(paths, givenPath2));
