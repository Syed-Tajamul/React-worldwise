import { useState } from "react";

export default function useGeolocation() {
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsGeoLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsGeoLoading(false);
      }
    );
  }

  return { isGeoLoading, position, error, getPosition };
}
