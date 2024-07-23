import PQueue from "p-queue";
import Itinerary from "../db/models/itinerary.model";
import { ItineraryJob } from "../interfaces";

const queue = new PQueue({ concurrency: 10 }); // Adjust concurrency as needed

const processItineraryJob = async (job: ItineraryJob) => {
  const { flights, requesterIp, timestamp } = job;

  // Save to database
  await Itinerary.create({
    flights: JSON.stringify(flights),
    requester_ip: requesterIp,
    timestamp,
  });
};

const addItineraryJob = (job: ItineraryJob) => {
  queue.add(() => processItineraryJob(job));
};

export { addItineraryJob };
