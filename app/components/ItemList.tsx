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
      <ul className="no-scrollbar pb-8 px-[49vw] w-full flex gap-8 snap-x overflow-x-auto self-center">
        {items.map((item, index) => (
          <li key={index} className="snap-center">
            <div className="relative flex-shrink-0 max-w-[95vw] overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1542144612-1b3641ec3459?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="absolute inset-0 object-cover object-bottom w-full h-full "
              />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/75"></div>

              <div className=" relative h-100 w-[768px] p-12 flex flex-col justify-between items-start">
                <h1 className="font-bold font-lg mb-4">
                  {item["product title"]}:{" "}
                  <span className="font-light italic">
                    {item["special tag"]}
                  </span>
                </h1>
                <p className="font-md mb-4">{item["short description"]}</p>
                <h2 className="font-semibold font-lg mb-2">Key Features</h2>
                <ol className="list-disc ml-4">
                  {item["key features"].map(
                    (feature: string, index: number) => (
                      <li className="font-md" key={index}>
                        {feature}
                      </li>
                    )
                  )}
                </ol>
                <h2 className="mt-4 mb-4">{item["price"]}</h2>
                {item["resource links"].map((link: string, index: number) => (
                  <a className="underline" key={index} href={link}>
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
