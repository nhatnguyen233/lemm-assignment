import express from "express";
import cors from "cors";
import { ItineraryRoute } from "./routes";

import "./db/migrations/20240722034027-create-itineraries-table";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/itinerary", ItineraryRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
