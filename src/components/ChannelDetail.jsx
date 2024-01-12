import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Videos, ChannelCard } from "./";

import { Box } from "@mui/material";
import { fetchAPI } from "../utils.js/fetchAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  console.log(channelDetail, videos);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAPI(`channels?part=snippet&id=${id}`);
      setChannelDetail(data?.items[0]);

      const videoData = await fetchAPI(
        `search?channelId=${id}&part=snippet&order=date`
      );
      setVideos(videoData?.items);
    };

    fetchData();
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
