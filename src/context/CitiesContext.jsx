import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/load":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "createcity/load":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "deletecity/load":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("unknown action type");
  }
}
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  useEffect(() => {
    async function fetchdata() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // alert("error while fetching data");
        dispatch({
          type: "rejected",
          payload: "some error occured while fetching cities data",
        });
      }
    }
    fetchdata();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/load", payload: data });
    } catch {
      // alert("error while fetching data");
      dispatch({
        type: "rejected",
        payload: "some error occured while fetching city data",
      });
    }
  }, []);
  /* sending data to api logic here */
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();

      dispatch({ type: "createcity/load", payload: data });
    } catch {
      // alert("error while fetching data");
      dispatch({
        type: "rejected",
        payload: "some error occured while creating city data",
      });
    }
  }
  /* logic for city deletio from api */
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "Delete",
      });
      // setCities((prev) => {
      //   return prev.filter((city) => city.id !== id);
      // });
      dispatch({ type: "deletecity/load", payload: id });
    } catch {
      // alert("error while fetching data");
      dispatch({
        type: "rejected",
        payload: "some error occured while deleting city data",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        formatDate,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("useCities called in app component or at wrong place");
  return value;
}
export { CitiesProvider, useCities };
