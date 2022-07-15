import React, { useState, useEffect, useContext } from "react";
import { InputLabel, Select, MenuItem, FormControl, Box } from "@mui/material";
import { MovieListContext } from "../App";

const PeopleList = ({ api }) => {
  const { selectedPeople, setSelectPeople, setLoading } = useContext(
    MovieListContext
  );

  //resursive fetching was very slow.. decided to try something else.
  const [pageCount, setPageCount] = useState(0);
  const getPeoplePages = async () => {
    await fetch(`${api}people/`)
      .then((response) => response.json())
      .then((data) => {
        setPageCount(Math.ceil(data.count / data.results.length));
      });
  };

  useEffect(() => {
    getPeoplePages();
  }, []);

  const [people, setPeople] = useState([]);
  const getAllPeople = async (pageNum) => {
    await fetch(`${api}people/?page=${pageNum}`)
      .then((response) => response.json())
      .then((data) => {
        setPeople((prev) => [data, ...prev].flat().sort(sortData));
      });
  };

  useEffect(() => {
    let i = 1;
    for (i; i < pageCount + 1; i++) {
      getAllPeople(i);
    }
  }, [pageCount]);

  const sortData = (x, y) => {
    if (x.next < y.next) {
      return -1;
    }
    if (x.next > y.next) {
      return 1;
    }
    return 0;
  };

  const peopleNames = people.map((p) => p.results.map((n) => n)).flat();
  const handleChange = (event) => {
    setSelectPeople(peopleNames[event.target.value]);
  };

  useEffect(() => {
    if (people[0]) {
      setLoading(people[0].count !== peopleNames.length);
    }
  }, [people]);

  return (
    <Box sx={{ minWidth: 120, p: 10 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Your Character</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPeople.people}
          label="Age"
          onChange={handleChange}
        >
          {peopleNames.map((p, i) => (
            <MenuItem key={i} value={i} name={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PeopleList;
