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
});

function Mapbox() {
  const { forecast } = useGlobalContext();
  const activeCityCoords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCoords) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <MapComponent activeCityCoords={activeCityCoords} />;
}

export default Mapbox;
