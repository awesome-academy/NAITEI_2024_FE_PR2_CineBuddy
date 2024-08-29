import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import NowShowing from './pages/NowShowing/index.tsx';
import ComingSoon from './pages/ComingSoon/index.tsx';
import MovieDetail from './pages/MovieDetail.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/now-showing" element={<NowShowing />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/movie-detail/:id" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
