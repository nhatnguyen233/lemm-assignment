import { Request, Response } from "express";
import { ItineraryService } from "../services";

export class ItineraryController {
  static orderItinerary = (req: Request, res: Response) => {
    try {
      const orderedItinerary = ItineraryService.orderItinerary(req.body);
      res.json(orderedItinerary);
    } catch (error) {
      console.error(`[ItineraryController] order itinerary failed ::`, error);
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: `INTERNAL SERVER ERROR` });
    }
  };
}
