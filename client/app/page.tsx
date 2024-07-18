"use client";

import { useState } from "react";

export default function Home() {
  const [itinerary, setItinerary] = useState("");
  const [orderedItinerary, setOrderedItinerary] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleOrderItinerary = async () => {
    try {
      const response = await fetch("http://localhost:8001/order-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON.parse(itinerary)),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to order itinerary");
      }

      const data = await response.json();
      setOrderedItinerary(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || "Failed to order itinerary");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
        {" "}
        {/* Add text-black class here */}
        <h1 className="text-2xl font-semibold mb-4">
          Flight Itinerary Orderer
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter flight itinerary (JSON format)"
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
        ></textarea>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          onClick={handleOrderItinerary}
        >
          Order Itinerary
        </button>
        {orderedItinerary.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Ordered Itinerary:</h2>
            <ul className="list-disc list-inside">
              {orderedItinerary.map((segment, index) => (
                <li key={index}>
                  {segment.from} → {segment.to}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
