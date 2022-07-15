import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { MovieListContext } from "../App";

const LastFilm = () => {
  const { selectedPeople, films } = useContext(MovieListContext);
  const [lastFilm, setLastFilm] = useState("");

  useEffect(() => {
    if (selectedPeople) {
      const filmAmount = films.filter((item) =>
        selectedPeople.films.includes(item.url)
      );

      setLastFilm(films[filmAmount.length - 1]);      
    }
  }, [films, selectedPeople]);

  return (
    <>
      {selectedPeople && (
        <Box sx={{ p: 10, margin: "0 auto", textAlign: "center" }}>
          <p>Name / Year of last movie.</p>
          <p>
            <span>{lastFilm.title}</span> / <span>{lastFilm.release_date}</span>
          </p>
        </Box>
      )}
    </>
  );
};

export default LastFilm;
