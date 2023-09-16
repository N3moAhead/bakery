import Bakery from "@Bakery";
import BakeryResponse from "@Bakery/BakeryResponse";

const server = Bakery();

server.get("/", (req: Request, res: BakeryResponse) => {
  res.send("Hallo Welt");
});

server.get("/json", (req: Request, res: BakeryResponse) => {
  res.json({ name: "Im Bruno" });
});

server.listen(8080);
