import { config } from "../config";
import Itinerary from "../db/models/itinerary.model";
import { ItinerarySegment } from "../interfaces";
import { addItineraryJob } from "../queues/itinerary.queue";
import { validateItinerary } from "../utils/itinerary.util";

export class ItineraryService {
  static saveItinerary = async (
    flights: ItinerarySegment[],
    requesterIp: string
  ): Promise<void> => {
    try {
      if (config.NODE_ENV === "test") return;
      // Add a job to the queue
      addItineraryJob({
        flights,
        requesterIp,
        timestamp: new Date(),
      });
    } catch (error) {
      throw error;
    }
  };

  static orderItinerary = (flights: ItinerarySegment[]): ItinerarySegment[] => {
    validateItinerary(flights);

    const flightMap = new Map<string, string>();
    const itinerary: ItinerarySegment[] = [];

    flights.forEach((flight) => {
      flightMap.set(flight.from, flight.to);
    });

    let startPoint = flights.find(
      (flight) => ![...flightMap.values()].includes(flight.from)
    )?.from;
    let currentPoint = startPoint;
    while (currentPoint) {
      const nextPoint = flightMap.get(currentPoint);
      if (!nextPoint) break;
      itinerary.push({ from: currentPoint, to: nextPoint });
      currentPoint = nextPoint;
    }

    return itinerary;
  };
}
