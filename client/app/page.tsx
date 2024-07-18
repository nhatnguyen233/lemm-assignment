"use client";

import { useState } from "react";

interface ItinerarySegment {
  from: string;
  to: string;
}

const Home = () => {
  const [itineraryItems, setItineraryItems] = useState<ItinerarySegment[]>([
    { from: "", to: "" },
  ]);
  const [orderedItinerary, setOrderedItinerary] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    index: number,
    key: keyof ItinerarySegment,
    value: string
  ) => {
    const updatedItems = [...itineraryItems];
    updatedItems[index][key] = value;
    setItineraryItems(updatedItems);
  };

  const addItineraryItem = () => {
    setItineraryItems([...itineraryItems, { from: "", to: "" }]);
  };

  const removeItineraryItem = (index: number) => {
    const updatedItems = [...itineraryItems];
    updatedItems.splice(index, 1);
    setItineraryItems(updatedItems);
  };

  const handleOrderItinerary = async () => {
    try {
      const response = await fetch("http://localhost:8001/order-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryItems),
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Flight Itinerary Orderer</h1>
          <button
            className="bg-blue-500 text-white py-1 px-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none"
            onClick={addItineraryItem}
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {itineraryItems.map((item, index) => (
          <div key={index} className="mb-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="From"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={item.from}
              onChange={(e) => handleInputChange(index, "from", e.target.value)}
            />
            <span>→</span>
            <input
              type="text"
              placeholder="To"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={item.to}
              onChange={(e) => handleInputChange(index, "to", e.target.value)}
            />
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md text-sm hover:bg-red-600 focus:outline-none"
              onClick={() => removeItineraryItem(index)}
            >
              X
            </button>
          </div>
        ))}
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
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
};

export default Home;
