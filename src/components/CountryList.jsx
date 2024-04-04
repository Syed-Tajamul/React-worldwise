import Message from "./Message";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../context/CitiesContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities)
    return (
      <Message message="Please click on a city on the map to add ist city" />
    );
  const countries = cities.reduce((arr, cur) => {
    if (!arr.map((el) => el.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}
