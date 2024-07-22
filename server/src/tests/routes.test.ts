// tests/itinerary.test.ts
import request from "supertest";
import app from "../index";
import sequelize from "../db";

beforeAll(async () => {
  // Sync the database before running tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
});

describe("POST /itinerary/order", () => {
  it("should process and store ordered itinerary data", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send([
        { from: "EZE", to: "MIA" },
        { from: "MIA", to: "SFO" },
        { from: "SFO", to: "GRU" },
        { from: "GRU", to: "SCL" },
      ]);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });

  it("should handle invalid input gracefully", async () => {
    const response = await request(app)
      .post("/itinerary/order")
      .send({ invalid: "data" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid input format");
  });

  it("should handle empty input", async () => {
    const response = await request(app).post("/itinerary/order").send([]);

    expect(response.status).toBe(400);
  });
});
