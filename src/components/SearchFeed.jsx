import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Typography, Box } from "@mui/material";
import { Videos } from "./";
import { fetchAPI } from "../utils/fetchAPI";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI(`search?part=snippet&q=${searchTerm}`);
      setVideos(data?.items);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{
          color: "white",
        }}
      >
        Search Results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
