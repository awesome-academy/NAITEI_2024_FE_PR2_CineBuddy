import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbSection from './BreadcrumbSection.tsx';
import MovieCard from './MovieCard.tsx';
import ShowtimeModal from '../../components/ShowtimeModal.tsx';
import { fetchMovies, toggleLike, initializeLikes, Movie } from '../../utils/api.ts';
import { useTranslation } from 'react-i18next';

const ComingSoon: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: number]: boolean }>({});
  const [modal, setModal] = useState<boolean | null>(null);
  const { t } = useTranslation();
  const isLoggedIn = true; 

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
      const { likes, hasLiked } = initializeLikes(moviesData, isLoggedIn);
      setLikes(likes);
      setHasLiked(hasLiked);
    };

    fetchData();
  }, [isLoggedIn]);

  const handleLike = (id: number) => {
    const { newHasLiked, newLikesCount } = toggleLike(id, hasLiked[id], likes, isLoggedIn);
    setHasLiked((prev) => ({ ...prev, [id]: newHasLiked }));
    setLikes((prev) => ({ ...prev, [id]: newLikesCount }));
  };

  return (
    <div>
      {/* Breadcrumb */}
      <BreadcrumbSection />

      <div className="container mx-auto mt-8 px-4 lg:px-0 max-w-[980px]">
        {/* Header */}
        <div className="flex items-end justify-between border-b-2 border-black pb-2 mb-5">
          <h1 className="text-[38px] text-[#333]">{t('now_showing.coming_soon')}</h1>
          <Link to="/now-showing" className="text-[20px] text-[#666] uppercase tracking-wider cursor-pointer">
            {t('now_showing.title')}
          </Link>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {movies.filter(movie => movie.sapChieu).map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              hasLiked={hasLiked[movie.id]}
              likes={likes[movie.id]}
              onLike={handleLike}
              setModal={setModal}
            />
          ))}
        </div>
      </div>

      {modal && (
        <ShowtimeModal
          maPhim={0} 
          modal={modal}
          setModal={setModal}
        />
      )}
    </div>
  );
};

export default ComingSoon;
