import { Response } from "express";
import { ItineraryService } from "../services";
import { OrderItineraryRequest } from "../interfaces";

export class ItineraryController {
  static orderItinerary = async (req: OrderItineraryRequest, res: Response) => {
    try {
      if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
      }
      const requesterIp =
        (Array.isArray(req.headers["x-forwarded-for"])
          ? req.headers["x-forwarded-for"][0]
          : req.headers["x-forwarded-for"]) || req.socket.remoteAddress;

      const unorderedFlights = req.body;
      const orderedFlights = ItineraryService.orderItinerary(unorderedFlights);
      await ItineraryService.saveItinerary(orderedFlights, requesterIp ?? "");
      res.status(200).json(orderedFlights);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "SERVER ERROR" });
    }
  };
}
