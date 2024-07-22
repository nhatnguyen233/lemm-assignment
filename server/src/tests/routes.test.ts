import request from "supertest";
import app from "..";

describe("Itinerary API", () => {
  it("should order the itinerary correctly", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send([
        { from: "SFO", to: "GRU" },
        { from: "MIA", to: "SFO" },
        { from: "EZE", to: "MIA" },
        { from: "GRU", to: "SCL" },
      ]);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { from: "EZE", to: "MIA" },
      { from: "MIA", to: "SFO" },
      { from: "SFO", to: "GRU" },
      { from: "GRU", to: "SCL" },
    ]);
  });

  it("should return error for duplicate destinations", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send([
        { from: "SFO", to: "GRU" },
        { from: "MIA", to: "SFO" },
        { from: "EZE", to: "MIA" },
        { from: "GRU", to: "SFO" },
      ]);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Duplicate destination found: SFO");
  });

  it("should return error for orphan flights", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send([
        { from: "SFO", to: "GRU" },
        { from: "MIA", to: "SFO" },
        { from: "EZE", to: "MIA" },
        { from: "LAX", to: "JFK" },
      ]);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid itinerary: Orphan flight found.");
  });

  it("should return error for no valid start point", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send([
        { from: "SFO", to: "GRU" },
        { from: "GRU", to: "SFO" },
      ]);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Invalid itinerary: No valid start point found."
    );
  });
});
