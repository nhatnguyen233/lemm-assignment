import { Request, Response } from "express";
import { ItineraryController } from "../controllers";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("ItineraryOrder", () => {
  let req: Partial<Request>;
  let res: Response;

  beforeEach(() => {
    req = {
      body: [],
    };
    res = mockResponse();
  });

  test("should return ordered itinerary for valid input", () => {
    req.body = [
      { from: "SFO", to: "GRU" },
      { from: "EZE", to: "MIA" },
      { from: "GRU", to: "SCL" },
      { from: "MIA", to: "SFO" },
    ];

    const expectedOutput = [
      { from: "EZE", to: "MIA" },
      { from: "MIA", to: "SFO" },
      { from: "SFO", to: "GRU" },
      { from: "GRU", to: "SCL" },
    ];

    ItineraryController.orderItinerary(req as Request, res);

    expect(res.json).toHaveBeenCalledWith(expectedOutput);
  });

  test("should return error for invalid itinerary", () => {
    req.body = [
      { from: "EZE", to: "MIA" },
      { from: "MIA", to: "SFO" },
      { from: "GRU", to: "SCL" },
    ];

    ItineraryController.orderItinerary(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid itinerary" });
  });

  test("should return error for orphan flight", () => {
    req.body = [
      { from: "SFO", to: "GRU" },
      { from: "EZE", to: "MIA" },
      { from: "GRU", to: "SCL" },
      { from: "XYZ", to: "ABC" },
      { from: "MIA", to: "SFO" },
    ];

    ItineraryController.orderItinerary(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid itinerary" });
  });

  test("should handle empty input", () => {
    req.body = [];

    ItineraryController.orderItinerary(req as Request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid itinerary" });
  });
});
