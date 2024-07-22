import { ItinerarySegment } from "../interfaces";

export function validateItinerary(flights: ItinerarySegment[]) {
  const destinations = new Set();
  const origins = new Set();

  if (flights.length === 0) {
    throw new Error("Invalid itinerary");
  }

  flights.forEach((flight) => {
    if (destinations.has(flight.to)) {
      throw new Error(`Duplicate destination: ${flight.to}`);
    }
    if (origins.has(flight.from)) {
      throw new Error(`Duplicate origin: ${flight.from}`);
    }
    destinations.add(flight.to);
    origins.add(flight.from);
  });

  if (destinations.size !== flights.length || origins.size !== flights.length) {
    throw new Error("Invalid itinerary");
  }
}

export function sortItinerary(flights: ItinerarySegment[]): ItinerarySegment[] {
  const map = new Map<string, string>();
  const reverseMap = new Map<string, string>();

  flights.forEach(({ from, to }) => {
    map.set(from, to);
    reverseMap.set(to, from);
  });

  let start = "";
  for (const from of map.keys()) {
    if (!reverseMap.has(from)) {
      start = from;
      break;
    }
  }

  const orderedItinerary: ItinerarySegment[] = [];
  while (start) {
    const to = map.get(start);
    if (to) {
      orderedItinerary.push({ from: start, to });
      start = to;
    } else {
      start = "";
    }
  }

  return orderedItinerary;
}
