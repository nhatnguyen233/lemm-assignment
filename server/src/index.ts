import express from "express";
import cors from "cors";
import { orderItinerary } from "./routes";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/order-itinerary", orderItinerary);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
