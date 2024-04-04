import { useEffect, useState } from "react";
import { useCities } from "../context/citiesContext";
import { useNavigate } from "react-router-dom";
import useGeolocation from "../hooks/useGeolocation";
import styles from "./Map.module.css";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

/*flagemojiToPng is a function that is copied from udemy qna,it renders flag emojis
because by using city.emoji does not work */
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

/*upto this is flag emoji code which is directly copied*/
export default function Map() {
  const {
    position: geoPosition,
    isLoading: geoIsLoading,
    getPosition,
  } = useGeolocation();

  // console.log(geoPosition);
  const { cities } = useCities();
  /* why position is set as [21,-98] because map leaflet demands position to  an array
  of lat and lng */
  const [position, setPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPosition();
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);
  // console.log(geoPosition.lat);

  useEffect(() => {
    if (geoPosition.lat && geoPosition.lng)
      setPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {geoPosition.lat && geoPosition.lng ? (
        ""
      ) : (
        <Button onClick={getPosition} type="position">
          {geoIsLoading ? "loading..." : "check"}
        </Button>
      )}

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
