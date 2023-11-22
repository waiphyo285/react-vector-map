import Leatlet from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Marker, Popup } from "leaflet";

import tileLayer from "../utils/tileLayer";
import geojson from "../data/geo-json.json";

const center = [52, 19.2]; // origin
// const center = [21.916221, 95.955974]; // MM

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

    // <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={center}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
  );
};

export default MapWrapper;
