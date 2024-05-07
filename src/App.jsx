import { useState, useEffect } from "react";
import { fetchDataFromAPi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SeacrhResult from "./pages/searchResult/SeacrhResult";
import NotFound from "./pages/404/NotFound";

function App() {
  const { url } = useSelector((state) => state.home);
  console.log(url, ">>>>");
  const dispatch = useDispatch();
  useEffect(() => {
    fetchApiConfiguration();
    genresCall();
  }, []);

  const genresCall = async () => {
    let promise = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promise.push(fetchDataFromAPi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promise);
    data.map((genres) => {
      return genres?.data?.genres.map((item) => {
        allGenres[item.id] = item;
      });
    });
    dispatch(getGenres(allGenres));
    console.log(allGenres, "all2");
  };

  const fetchApiConfiguration = () => {
    fetchDataFromAPi("/configuration").then((res) => {
      const urls = {
        backdrop: res.data?.images?.secure_base_url + "original",
        poster: res.data?.images?.secure_base_url + "original",
        profile: res.data?.images?.secure_base_url + "original",
      };
      console.log(urls);
      dispatch(getApiConfiguration(urls));
    });
  };
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<SeacrhResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
