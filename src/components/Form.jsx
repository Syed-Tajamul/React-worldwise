//  "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.css";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../context/citiesContext";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();
  const { createCity } = useCities();

  const [geoLocationError, setGeoLocationError] = useState("");
  const [isCityNameLoading, setIsCityNameLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      position: { lat, lng },
      notes,
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  useEffect(() => {
    async function getCityName() {
      if (lat === null && lng === null) return;
      try {
        setGeoLocationError("");
        setIsCityNameLoading(true);
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        // console.log(data);
        if (!data.countryName)
          throw new Error("plz click on some other position");

        // console.log(data.locality);
        setCityName(data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoLocationError(err.message);
      } finally {
        setIsCityNameLoading(false);
      }
    }
    getCityName();
  }, [lat, lng, setIsCityNameLoading]);
  if (geoLocationError) return <Message message={geoLocationError} />;
  if (isCityNameLoading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {notes && date ? <Button type="primary">Add</Button> : ""}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
