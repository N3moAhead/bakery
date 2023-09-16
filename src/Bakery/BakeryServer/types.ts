export interface ServerOptions {
  port?: number;
}

export interface HandlerMap {
  [key: string]: Function[];
}
