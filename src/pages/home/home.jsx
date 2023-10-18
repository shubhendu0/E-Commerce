import React from "react";
import Categories from "../../components/categories";
import CarouselSlider from "../../components/carousel";

const Home = () => {
  return (
    <div>
      <CarouselSlider/>
      <Categories/>
    </div>
  );
}

export default Home;