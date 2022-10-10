import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "./axios";
import requests from "./Request";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="bannerContents">
        <h1 className="title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="buttons">
          <button className="bannerButton">Play</button>
          <button className="bannerButton">My List</button>
          <h1 className="desc">{truncate(movie?.overview, 150)}</h1>
          {/* <div className="bannerFade" /> */}
        </div>
      </div>
    </header>
  );
};

export default Banner;
