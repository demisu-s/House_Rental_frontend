import React from 'react';
import Entity from "./Components/Entity";
import Property from "./Components/Property";
import Slider from "./Components/Slider";

const LandingPage = () => {
  return (
    <div className="px-12 py-12">
      <Property />

      <div className="bg-stone-100 px-8 pt-8 pb-4 mt-10 mb-14 rounded-sm">
        <Entity />
      </div>

      <div className="bg-stone-100 px-4 pt-6 pb-10 rounded-sm">
        <hr className="mb-7" />
        <Slider />
      </div>
    </div>
  );
};

export default LandingPage;
