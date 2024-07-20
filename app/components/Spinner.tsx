import React from "react";

const items = [1, 2, 3, 4];

const Spinner = () => {
  return (
    <div className="relative mt-10">
      <ul className="no-scrollbar pb-8 px-[5vw] w-full flex gap-8 snap-x overflow-x-auto self-center">
        {items.map((_, index) => (
          <li key={index} className="snap-center">
            <div className="relative flex-shrink-0 max-w-[95vw] overflow-hidden rounded-3xl border-2 border-secondary-color shadow">
              <div className="animate-pulse relative h-100 w-[768px] p-12 flex flex-col justify-between items-start">
                <div className="h-6 w-full mb-4 bg-secondary-color"></div>
                <div className="h-6 w-full mb-4 bg-secondary-color"></div>
                <div className="grid grid-cols-3 gap-4 w-full mb-4">
                  <div className="h-6 bg-secondary-color rounded col-span-2"></div>
                  <div className="h-6 bg-secondary-color rounded col-span-1"></div>
                </div>
                <div className="h-12 w-full bg-secondary-color"></div>
                <div className="h-4 mb-4"></div>
                <div className="grid grid-cols-3 gap-4 w-full mb-4">
                  <div className="h-6 bg-secondary-color rounded col-span-2"></div>
                  <div className="h-6 bg-secondary-color rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Spinner;
