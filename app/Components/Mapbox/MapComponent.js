"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToActiveCity({ activeCityCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords && activeCityCoords.lat && activeCityCoords.lon) {
      const lat = parseFloat(activeCityCoords.lat);
      const lon = parseFloat(activeCityCoords.lon);
      
      // Validate coordinates are within valid ranges
      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        console.error("Invalid coordinates:", { lat, lon });
        return;
      }

      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([lat, lon], zoomLev, flyToOptions);
    }
  }, [activeCityCoords, map]);

  return null;
}

function MapComponent({ activeCityCoords }) {
  // Enhanced coordinate validation
  if (!activeCityCoords || !activeCityCoords.lat || !activeCityCoords.lon) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Invalid coordinates</p>
        </div>
      </div>
    );
  }

  // Convert and validate coordinates
  const lat = parseFloat(activeCityCoords.lat);
  const lon = parseFloat(activeCityCoords.lon);

  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return (
      <div className="flex-1 basis-[50%] border rounded-lg p-4">
        <div className="h-full w-full flex items-center justify-center">
          <p>Invalid coordinates: {lat}, {lon}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 basis-[50%] border rounded-lg"
      style={{
        padding: "1rem",
      }}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  );
}

export default MapComponent; 