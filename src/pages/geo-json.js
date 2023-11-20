import Leatlet from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import tileLayer from "../utils/tileLayer";
import geojson from "../data/geo-json.json";

const center = [52, 19.2];

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nazwa);
}

const MapWrapper = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const legend = Leatlet.control({ position: "bottomleft" });

    legend.onAdd = () => {
      const div = Leatlet.DomUtil.create("div", "legend");
      div.innerHTML = `click on polygon`;
      return div;
    };

    legend.addTo(map);
  }, [map]);

  return (
    <MapContainer
      zoom={6}
      center={center}
      scrollWheelZoom={false}
      whenCreated={setMap}
    >
      <TileLayer {...tileLayer} />
      <GeoJSON data={geojson} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default MapWrapper;
