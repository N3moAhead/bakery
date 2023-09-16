import type { Server } from "bun";
interface ServerOptions {
  port?: number;
}

class BunBiteServer {
  constructor(options: ServerOptions) {}

  listen() {}

  stop() {}

  get() {}

  post() {}
}

/**
 * IDEA: If someone calls this function it should
 * start a server and it should enable the user
 * to build the rest API with it
 *
 * Im doint that as a function instead of as a Class
 * because i find it much more convenient to just call a function
 * instead of a class
 */
function App() {
  function listen(port: number) {}

  return {
    listen,
  };
}

const server = App();
