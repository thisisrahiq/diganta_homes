import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import AboutSnippet from '../components/home/AboutSnippet';
import FeaturedProjects from '../components/home/FeaturedProjects';
import AmenitiesSection from '../components/home/AmenitiesSection';
import HomeContact from '../components/home/HomeContact';

const Home = () => {
  return (
    <div className="w-full bg-surface">
      <HeroSection />
      <StatsBar />
      <AboutSnippet />
      <AmenitiesSection />
      <FeaturedProjects />
      <HomeContact />
    </div>
  );
};
export default Home;
