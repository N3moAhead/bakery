import Bakery from "@Bakery";

const server = Bakery();

server.get("/", () => {
  return "Hello from the Server";
});

server.get("/test", () => {
  return "This is just a Test response nothing serious";
});

server.listen(8080);
