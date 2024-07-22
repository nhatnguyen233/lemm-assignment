import Itinerary from "../db/models/itinerary.model";
import { ItinerarySegment } from "../interfaces";
import { sortItinerary, validateItinerary } from "../utils/itinerary.util";

export class ItineraryService {
  static orderItinerary = async (
    requesterIp: string,
    itinerary: ItinerarySegment[]
  ) => {
    try {
      validateItinerary(itinerary);
      const orderedItinerary = sortItinerary(itinerary);

      const timestamp = new Date();

      for (const flight of orderedItinerary) {
        await Itinerary.create({
          from_airport: flight.from,
          to_airport: flight.to,
          requester_ip: requesterIp,
          timestamp,
        });
      }

      return orderedItinerary;
    } catch (error) {
      throw error;
    }
  };
}
