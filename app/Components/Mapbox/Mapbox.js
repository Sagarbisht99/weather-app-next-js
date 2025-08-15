"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useGlobalContext } from "@/app/context/globalContext";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 basis-[50%] border rounded-lg p-4">
      <div className="h-full w-full flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    </div>
  ),
  onError: (error) => {
    console.error("Failed to load map component:", error);
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Failed to load map</p>
        </div>
      </div>
    );
  },
});

function Mapbox() {
  const { forecast } = useGlobalContext();
  
  const activeCityCoords = forecast?.coord;

  // Debug logging
  useEffect(() => {
    if (forecast) {
      console.log("Forecast data:", forecast);
      console.log("Coordinates:", activeCityCoords);
    }
  }, [forecast, activeCityCoords]);

  // More detailed check
  if (!forecast) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>No forecast data</p>
        </div>
      </div>
    );
  }

  if (!forecast.coord) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>No coordinate data</p>
        </div>
      </div>
    );
  }

  // Enhanced coordinate validation
  if (!activeCityCoords || !activeCityCoords.lat || !activeCityCoords.lon) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Invalid coordinates: {JSON.stringify(activeCityCoords)}</p>
        </div>
      </div>
    );
  }

  // Additional validation for coordinate values
  const lat = parseFloat(activeCityCoords.lat);
  const lon = parseFloat(activeCityCoords.lon);
  
  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Coordinates out of range: {lat}, {lon}</p>
        </div>
      </div>
    );
  }

  try {
    return <MapComponent activeCityCoords={activeCityCoords} />;
  } catch (error) {
    console.error("Error rendering map:", error);
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Error loading map</p>
        </div>
      </div>
    );
  }
}

export default Mapbox;
