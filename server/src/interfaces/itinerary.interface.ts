import { Request } from "express";

export interface ItinerarySegment {
  from: string;
  to: string;
}

export interface ItineraryJob {
  flights: ItinerarySegment[];
  requesterIp: string;
  timestamp: Date;
}

export interface OrderItineraryRequest
  extends Request<null, null, ItinerarySegment[]> {}
