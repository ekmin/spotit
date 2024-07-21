import React from "react";

const CircleSpinner = () => {
  return (
    <div className="relative flex h-16 w-16 mx-auto mt-20">
      <div className="animate-ping absolute bg-secondary-dark-color inline-flex h-full w-full rounded-full opacity-75"></div>
      <div className="relative inline-flex h-16 w-16 bg-secondary-color rounded-full animate-pulse"></div>
      <div className="animate-ping absolute bg-secondary-color inline-flex h-full w-full rounded-full opacity-75"></div>
    </div>
  );
};

export default CircleSpinner;
