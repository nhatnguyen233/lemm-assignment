import { ItinerarySegment } from "../interfaces";

export const validateItinerary = (flights: ItinerarySegment[]): void => {
  const flightMap = new Map<string, string>();
  const reverseMap = new Map<string, string>();
  const destinationSet = new Set<string>();

  flights.forEach((flight) => {
    if (destinationSet.has(flight.to)) {
      throw new Error(`Duplicate destination found: ${flight.to}`);
    }
    destinationSet.add(flight.to);
    flightMap.set(flight.from, flight.to);
    reverseMap.set(flight.to, flight.from);
  });

  const startPoint = flights.find(
    (flight) => !reverseMap.has(flight.from)
  )?.from;
  if (!startPoint)
    throw new Error("Invalid itinerary: No valid start point found.");

  let currentPoint = startPoint;
  const orderedFlights: ItinerarySegment[] = [];
  while (currentPoint) {
    const nextPoint = flightMap.get(currentPoint);
    if (!nextPoint) break;
    orderedFlights.push({ from: currentPoint, to: nextPoint });
    currentPoint = nextPoint;
  }

  if (orderedFlights.length !== flights.length) {
    throw new Error("Invalid itinerary: Orphan flight found.");
  }
};
