import express from "express";
import { ItineraryController } from "../controllers";

export const ItineraryRoute = express.Router();

ItineraryRoute.post("/order", ItineraryController.orderItinerary);
