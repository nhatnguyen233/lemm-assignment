import { Request, Response } from "express";
import { ItineraryService } from "../services";

export class ItineraryController {
  static orderItinerary = (req: Request, res: Response) => {
    const orderedItinerary = ItineraryService.orderItinerary(req.body);
    res.json(orderedItinerary);
  };
}
