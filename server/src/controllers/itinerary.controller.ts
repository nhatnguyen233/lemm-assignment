import { Response } from "express";
import { ItineraryService } from "../services";
import { OrderItineraryRequest } from "../interfaces";

export class ItineraryController {
  static orderItinerary = async (req: OrderItineraryRequest, res: Response) => {
    const flights = req.body;

    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      return;
    }

    const requesterIp =
      (Array.isArray(req.headers["x-forwarded-for"])
        ? req.headers["x-forwarded-for"][0]
        : req.headers["x-forwarded-for"]) || req.socket.remoteAddress;

    if (!Array.isArray(flights)) {
      res.status(400).json({ error: "Invalid input format" });
      return;
    }

    try {
      const orderedItinerary = await ItineraryService.orderItinerary(
        requesterIp ?? "",
        flights
      );
      res.status(200).json(orderedItinerary);
    } catch (error) {
      console.error(`[ItineraryController] order itinerary failed ::`, error);
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: `INTERNAL SERVER ERROR` });
    }
  };
}
