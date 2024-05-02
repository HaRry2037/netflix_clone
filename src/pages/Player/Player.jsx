import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGM2NDYxYWI1MzlkMDJhNjNkNDc2ZWQ2ZDY5ZWJlOSIsInN1YiI6IjY2MzBjMWE1NTI0OTc4MDEyYWVhODZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UnT8g06yj7hYnhorFPCcD8-RMOyEV1GP-nuvMZ4tU2k'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(response => {
        setIsLoading(false);
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]);
        } else {
          console.error("No video found for the given ID.");
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.error("Error fetching video data:", err);
      });
  }, []);

  const handleBackButtonClick = () => {
    navigate(-2); // Go back two steps in history
  };

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={handleBackButtonClick} alt="Go back" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {apiData.key ? (
            <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
          ) : (
            <p>No video available</p>
          )}
          <div className="player-info">
            <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : "Unknown"}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
