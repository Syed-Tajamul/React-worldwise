import { useCities } from "../context/citiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
export default function CityItem({ city }) {
  const { position, cityName, id } = city;
  const { formatDate, currentCity, deleteCity } = useCities();

  function handleDelete(id) {
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleDelete(id);
          }}
          className={styles.deleteBtn}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}
