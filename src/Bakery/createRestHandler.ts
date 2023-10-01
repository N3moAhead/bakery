export interface RestHandler {
  path: String;
  pathMatcher: RegExp;
  pathVariableNames: String[];
  handlerFunctions: Function[];
}

/**
 * Create a new RestHandler Object to enable the api
 * to work with incoming Requests.
 * @param restPath path for request
 * @param handlerFunctions functions to handle incoming requests
 * @returns an object to work with for the api
 */
export default function createRestHandler(
  restPath: String,
  ...handlerFunctions: Function[]
): RestHandler {
  const restPathElements = restPath.substring(1, restPath.length).split("/");
  const matcherElements: String[] = [];
  const variableNames: String[] = [];

  restPathElements.forEach((restElement) => {
    /** Check if the current restElement is a variable */
    const variableCheck = restElement.match(/^:(.*)$/);
    if (variableCheck) {
      matcherElements.push("([^/]+)");
      variableNames.push(variableCheck[1]);
    } else {
      matcherElements.push(restElement);
    }
  });

  return {
    path: restPath,
    pathMatcher: new RegExp(`^/${matcherElements.join("/")}/$`),
    pathVariableNames: variableNames,
    handlerFunctions,
  };
}
