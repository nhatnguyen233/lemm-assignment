import { ItinerarySegment } from "../interfaces";

export class ItineraryService {
  static orderItinerary = (itinerary: ItinerarySegment[]) => {
    try {
      const originToDest: { [key: string]: string } = {};
      const destinations = new Set<string>();

      itinerary.forEach((segment) => {
        originToDest[segment.from] = segment.to;
        destinations.add(segment.to);
      });

      let start: string | null = null;
      for (const segment of itinerary) {
        if (!destinations.has(segment.from)) {
          start = segment.from;
          break;
        }
      }

      if (!start) {
        throw new Error("Invalid itinerary");
      }

      const orderedItinerary = [];
      let current = start;
      while (originToDest[current]) {
        const nextDestination = originToDest[current];
        orderedItinerary.push({ from: current, to: nextDestination });
        current = nextDestination;
      }

      if (orderedItinerary.length !== itinerary.length) {
        throw new Error("Invalid itinerary");
      }

      return orderedItinerary;
    } catch (error) {
      console.error("[ItineraryService] orderItinerary ::", error);
      throw error;
    }
  };
}
