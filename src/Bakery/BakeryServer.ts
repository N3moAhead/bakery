import type { Server } from "bun";
import type { HandlerMap, ServerOptions } from "./types";
import BakeryResponse from "@Bakery/BakeryResponse";

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

        let finalAnswer: Response | undefined;
        if (handlerMap?.[path]) {
          handlerMap[path].forEach((handlerFunction) => {
            const newBakeryResponse = new BakeryResponse((res: Response) => {
              finalAnswer = res;
            });
            handlerFunction(req, newBakeryResponse);
            if (finalAnswer) {
              return;
            }
          });
        }
        if (finalAnswer) {
          return finalAnswer;
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
