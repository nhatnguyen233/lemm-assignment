import express from "express";
import { orderItinerary } from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/order-itinerary", orderItinerary);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
