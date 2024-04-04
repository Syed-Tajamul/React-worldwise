import Message from "./Message";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./cityList.module.css";
import { useCities } from "../context/citiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  const citiesLength = cities.length;
  /* these if statements are early return statments see where they are used */
  if (!citiesLength)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoading) return <Spinner />;
  if (!cities)
    return (
      <Message message="Please click on a city on the map to add ist city" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}
