
import React, { Suspense } from "react";

import HeroSlider from "./component/home/HeroSlider";
import NewArrivals from "./component/home/NewArrivals";
import HowItWorks from "./component/home/HowItWorks";
import TopCategories from "./component/home/TopCategories";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <p className="text-gray-500">Loading new arrivals...</p>
          </div>
        }
      >
        <NewArrivals />
      </Suspense>

      <HowItWorks />
      <TopCategories />
    </div>
  );
};

export default HomePage;
