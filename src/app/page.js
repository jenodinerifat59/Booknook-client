import React from 'react';
import HeroSlider from './component/home/HeroSlider';
import NewArrivals from './component/home/NewArrivals';
import HowItWorks from './component/home/HowItWorks';
import TopCategories from './component/home/TopCategories';

const page = () => {
  return (
    <div>
         <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </div>
  );
};

export default page;