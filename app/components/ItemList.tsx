import React from "react";

type itemType = {
  "special tag": string;
  "product title": string;
  "key features": string[];
  "short description": string;
  price: string;
  "resource links": string[];
};

interface itemProps {
  items: itemType[];
}

const ItemList = ({ items }: itemProps) => {
  return (
    <div className="relative mt-10">
      <ul className="no-scrollbar pb-8 px-[5vw] w-full flex justify-between overflow-x-auto snap-x gap-8">
        {items.map((item, index) => (
          <li key={index} className="snap-center">
            <div className="relative flex shrink-0 max-w-[95vw] overflow-hidden rounded-3xl bg-gradient-to-b from-secondary-color to-primary-dark-color text-primary-color shadow-md md:text-base text-sm">
              <div className="relative w-[768px] p-12 h-100 flex flex-col justify-between items-start">
                <h1 className="font-bold font-lg mb-4">
                  {item["product title"]}:{" "}
                  <span className="font-light italic">
                    {item["special tag"]}
                  </span>
                </h1>
                <p className="font-md mb-4">{item["short description"]}</p>
                <h2 className="font-semibold font-lg mb-2 text-secondary-dark-color">Key Features</h2>
                <ol className="list-disc ml-4 text-secondary-dark-color">
                  {item["key features"].map(
                    (feature: string, index: number) => (
                      <li className="font-md" key={index}>
                        {feature}
                      </li>
                    )
                  )}
                </ol>
                <h2 className="mt-4 mb-4 font-bold text-secondary-dark-color">{item["price"]}</h2>
                {item["resource links"].map((link: string, index: number) => (
                  <a className="underline text-secondary-color" key={index} href={link}>
                    Reference {index + 1}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
