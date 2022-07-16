import React, { createContext, useState } from "react";
import "./App.css";
import PeopleList from "./components/peopleList";
import FilmList from "./components/filmList";
import LastFilm from "./components/lastFilm";
import Loading from "./components/loading";
export const MovieListContext = createContext();

const api = "https://swapi.dev/api/";

function App() {
  const [selectedPeople, setSelectPeople] = useState("");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <MovieListContext.Provider
      value={{ selectedPeople, setSelectPeople, films, setFilms, setLoading }}
      className="App"
    >
      {!loading && <Loading />}
      <PeopleList api={api} />
      <FilmList api={api} />
      <LastFilm />
    </MovieListContext.Provider>
  );
}

export default App;
