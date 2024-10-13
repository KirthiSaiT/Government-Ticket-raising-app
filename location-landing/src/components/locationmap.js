import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 16);
      L.marker([latitude, longitude]).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default LocationMap;
