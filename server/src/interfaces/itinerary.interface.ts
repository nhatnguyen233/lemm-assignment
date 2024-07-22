import { Request } from "express";

export interface ItinerarySegment {
  from: string;
  to: string;
}

export interface OrderItineraryRequest
  extends Request<null, null, ItinerarySegment[]> {}
