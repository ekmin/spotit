import React from 'react'

type itemType = {
    "special_tag": string;
    "product_title": string;
    "description": string;
    "pros": string[];
    "cons": string[];
    "price": string;
    "reviews": string;
    "links": string[];
  };
  
  interface itemProps {
    items: itemType[];
  }

const CompareItemList = ({ items }: itemProps) => {
  return (
    <div className="relative mt-10">
      <ul className="no-scrollbar pb-8 px-[5vw] w-full flex justify-between overflow-x-auto snap-x gap-8">
        {items.map((item, index) => (
          <li key={index} className="snap-center">
            <div className="relative flex shrink-0 max-w-[95vw] overflow-hidden rounded-3xl bg-gradient-to-b from-secondary-color to-primary-dark-color text-primary-color shadow-md md:text-base text-sm">
              <div className="relative w-[768px] min-h-[600px] p-12 h-100 flex flex-col justify-between items-start">
                <h1 className="font-bold font-lg mb-4">
                  {item["product_title"]}:{" "}
                  <span className="font-light italic">
                    {item["special_tag"]}
                  </span>
                </h1>
                <p className="font-md mb-4">{item["description"]}</p>
                <h2 className="font-semibold font-lg mb-2 text-secondary-dark-color">
                  Pros
                </h2>
                <ol className="list-disc ml-4 text-secondary-dark-color">
                  {item["pros"].map(
                    (feature: string, index: number) => (
                      <li className="font-md" key={index}>
                        {feature}
                      </li>
                    )
                  )}
                </ol>
                <h2 className="font-semibold font-lg mb-2 text-secondary-dark-color mt-4">
                  Cons
                </h2>
                <ol className="list-disc ml-4 text-secondary-dark-color">
                  {item["cons"].map(
                    (feature: string, index: number) => (
                      <li className="font-md" key={index}>
                        {feature}
                      </li>
                    )
                  )}
                </ol>
                <h2 className="mt-4 mb-4 font-bold text-secondary-dark-color">
                  {item["price"]}
                </h2>
                <p className='text-secondary-dark-color mb-4'>{item["reviews"]}</p>
                {item["links"].map((link: string, index: number) => (
                  <a
                    className="underline text-secondary-color"
                    key={index}
                    href={link}
                  >
                    Reference {index + 1}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CompareItemList