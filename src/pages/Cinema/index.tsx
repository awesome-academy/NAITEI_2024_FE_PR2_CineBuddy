import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchMovieShowtimes } from '../../utils/api.ts';
import { Movie, Showtime } from '../../utils/api.ts';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import '../../style/Cinema.css';

import CinemaSelection from './CinemaSelection.tsx';
import ShowtimeDisplay from './ShowtimeDisplay.tsx';

const Cinema: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cinemas, setCinemas] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimesData = async () => {
      try {
        const allShowtimes = await fetchMovieShowtimes();
        const citiesSet = new Set<string>();
        const cinemasSet = new Set<string>();

        allShowtimes.forEach((showtime) => {
          citiesSet.add(showtime.city);
          if (showtime.city === selectedCity) {
            cinemasSet.add(showtime.cinemaName);
          }
        });

        setCities(Array.from(citiesSet));
        setCinemas(Array.from(cinemasSet));
        setShowtimes(allShowtimes);
      } catch (error) {
        console.error('Error fetching showtimes data:', error);
      }
    };

    fetchShowtimesData();
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCinema) {
      const availableDates = Array.from(
        new Set(
          showtimes
            .filter((showtime) => showtime.cinemaName === selectedCinema)
            .map((showtime) => showtime.date)
        )
      );
      setDates(availableDates);
    }
  }, [selectedCinema, showtimes]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      if (selectedCinema && selectedDate) {
        try {
          const relevantShowtimes = showtimes.filter(
            (showtime) =>
              showtime.cinemaName === selectedCinema && showtime.date === selectedDate
          );

          const movieIds = Array.from(new Set(relevantShowtimes.map((showtime) => showtime.movieId)));

          const moviesResponse = await fetchMovies();
          const filteredMovies = moviesResponse.filter((movie) =>
            movieIds.includes(Number(movie.id))
          );

          setMovies(filteredMovies);
        } catch (error) {
          console.error('Error fetching movies data:', error);
        }
      } else {
        setMovies([]);
      }
    };

    fetchMoviesData();
  }, [selectedCinema, selectedDate, showtimes]);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedCinema(null);
    setSelectedDate(null);
    setMovies([]);
  };

  const handleCinemaClick = (cinema: string) => {
    setSelectedCinema(cinema);
    setSelectedDate(null);
    setMovies([]);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleShowtimeClick = (movieId: number, showtimeId: number, cinemaName: string, showtimeTime: string) => {
    navigate(`/booking/${movieId}/${showtimeId}`, {
      state: {
        movieTitle: movies.find((movie) => movie.id === movieId)?.title || '',
        cinemaInfo: cinemaName,
        showtime: showtimeTime,
        date: selectedDate,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-10 lg:px-20 py-8">
      <CinemaSelection 
        cities={cities} 
        selectedCity={selectedCity} 
        handleCityClick={handleCityClick} 
        cinemas={cinemas} 
        selectedCinema={selectedCinema} 
        handleCinemaClick={handleCinemaClick} 
      />
      <ShowtimeDisplay 
        selectedCinema={selectedCinema} 
        dates={dates} 
        selectedDate={selectedDate} 
        handleDateClick={handleDateClick} 
        movies={movies} 
        showtimes={showtimes} 
        handleShowtimeClick={handleShowtimeClick} 
      />
    </div>
  );
};

export default Cinema;
