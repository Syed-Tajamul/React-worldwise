import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CitiesProvider } from "./context/citiesContext";
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// import Pagenotfound from "./pages/PageNotFound";
import Form from "./components/Form";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage";
//lazy loading of pages from here//
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Pagenotfound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
//upto here is lazy loading....u can do npm run build...to see bundle size reduced//

//below is the code for the emoji package that has been directly copied from the QNA section on udemy

polyfillCountryFlagEmojis();

export default function App() {
  // const url = "http://localhost:9000/cities";

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="cities" element={<CityList />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<Pagenotfound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
