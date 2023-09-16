export default class BakeryResponse {
  sendResponse: Function;

  constructor(sendResponse: Function) {
    this.sendResponse = sendResponse;
  }

  json(jsonResponse: object) {
    const newBakeryResponse = new Response(JSON.stringify(jsonResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.sendResponse(newBakeryResponse);
  }

  send(stringResponse: string) {
    const newBakeryResponse = new Response(stringResponse, {
      headers: {
        "Content-Type": "text/html",
      },
    });
    this.sendResponse(newBakeryResponse);
  }
}
