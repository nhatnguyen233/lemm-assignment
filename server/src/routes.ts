import { Request, Response } from "express";

export const orderItinerary = (req: Request, res: Response) => {
  const data: { from: string; to: string }[] = req.body;

  const originToDest: { [key: string]: string } = {};
  const destinations = new Set<string>();

  data.forEach((segment) => {
    originToDest[segment.from] = segment.to;
    destinations.add(segment.to);
  });

  let start: string | null = null;
  for (const segment of data) {
    if (!destinations.has(segment.from)) {
      start = segment.from;
      break;
    }
  }

  if (!start) {
    return res.status(400).json({ error: "Invalid itinerary" });
  }

  const orderedItinerary = [];
  let current = start;
  while (originToDest[current]) {
    const nextDestination = originToDest[current];
    orderedItinerary.push({ from: current, to: nextDestination });
    current = nextDestination;
  }

  if (orderedItinerary.length !== data.length) {
    return res.status(400).json({ error: "Invalid itinerary" });
  }

  res.json(orderedItinerary);
};
