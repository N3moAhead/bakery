import type { Server } from "bun";
import type { HandlerMap, ServerOptions } from "./types";

export default class BakeryServer {
  server?: Server;
  handlerMap: HandlerMap;
  constructor(options?: ServerOptions) {
    this.handlerMap = {};
  }

  listen(port: number) {
    const handlerMap = this.handlerMap;
    const newBakeryServer = Bun.serve({
      port,
      fetch(req) {
        const host = `http://${req.headers.get("host")}`;
        const path = req.url.replace(host || "", "");
        if (handlerMap?.[path]) {
          let answer;
          handlerMap[path].forEach((handlerFunction) => {
            answer = handlerFunction(req);
          });
          return new Response(answer);
        }
        throw new Error("Path not Found");
      },
    });

    this.server = newBakeryServer;
  }

  stop() {
    if (!this.server) {
      throw new Error(
        "Start the server with listen before terminating the session",
      );
    }
    this.server.stop();
  }

  /** Add a new path handler to the Server Object */
  get(path: string, ...handlers: Function[]) {
    this.handlerMap[path] = handlers;
  }
}
