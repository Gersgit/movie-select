import React, { useState, useEffect, useContext } from "react";
import { Card, Box } from "@mui/material";
import { MovieListContext } from "../App";

const FilmList = ({ api }) => {
  const { selectedPeople, films, setFilms } = useContext(MovieListContext);
  const getFilms = async () => {
    await fetch(`${api}films/`)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results);
      });
  };

  useEffect(() => {
    getFilms();
  }, []);
  
  return (
    <Box
      className="filmBox"
    >
      {films.map((f, i) => (
        <Card
          variant="outlined"
          sx={{ transition: '0.5s', p:5, textAlign: 'center' }}
          key={i}
          className={             
            selectedPeople
              ? selectedPeople.films.includes(f.url)
                ? "yup"
                : "nope"
              : null
          }
        >
          <h1>{f.title}</h1>
        </Card>
      ))}
    </Box>
  );
};

export default FilmList;
