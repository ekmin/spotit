"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { MdSouth, MdNorth, MdCancel } from "react-icons/md";
import currenciesData from "../../public/currencies.json";
import ItemList from "./ItemList";
import Spinner from "./Spinner";
import { showToast } from "./ToastHelper";

interface Currency {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

interface IRequirements {
  productType: string;
  requirements: string[];
  otherCases: string;
  currency: string;
}

type Product = {
  "special tag": string;
  "product title": string;
  "key features": string[];
  "short description": string;
  price: string;
  "resource links": string[];
};

const ProductForm = () => {
  const [showForm, setShowForm] = useState({
    show: true,
    name: "collapse",
    icon: <MdNorth />,
  });
  const [requirement, setRequirement] = useState("");
  const [requirementsArray, setRequirementsArray] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<IRequirements>({
    productType: "",
    requirements: requirementsArray,
    otherCases: "",
    currency: "",
  });
  const [responseData, setResponseData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const currencies: Currency[] = Object.values(currenciesData.currencies[0]);

  const onClickShow = () =>
    setShowForm((prevState) => ({
      show: !prevState.show,
      name: prevState.show ? "expand" : "collapse",
      icon: prevState.show ? <MdSouth /> : <MdNorth />,
    }));

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setRequirements({ ...requirements, [e.target.name]: e.target.value });
  };

  const onChangeRequirement = (e: ChangeEvent<HTMLInputElement>) => {
    setRequirement(e.target.value);
  };

  const onClickRequirements = (e: any) => {
    e.preventDefault();

    if (requirement == " ") {
      showToast("warning", "Enter your requirement");
      return null
    }

    setRequirementsArray((prev) => {
      const updatedRequirementsArray = [...prev, requirement];
      setRequirements((prevData) => ({
        ...prevData,
        requirements: updatedRequirementsArray,
      }));
      return updatedRequirementsArray;
    });

    setRequirement(" ");
  };

  const onClickDelete = (index: number) => {
    setRequirementsArray((prev) => {
      const updatedRequirementsArray = prev.filter((_, i) => i !== index);
      setRequirements((prevData) => ({
        ...prevData,
        requirements: updatedRequirementsArray,
      }));
      return updatedRequirementsArray;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(requirementsArray.length == 0) {
      showToast("error", "Enter your requirements");
    }

    try {
      console.log(requirements);
      setLoading(true)
      const response = await axios.post("/api/products", requirements);
      setLoading(false)
      setResponseData(response.data);
      console.log(response.data);
      setShowForm({
        show: false,
        name: "expand",
        icon: <MdSouth />,
      });
    } catch (error) {
      console.error("Error submitting form", error);
      setLoading(false)
    }
  };

  const testData = [
    {
        "special tag": "Best All-Rounder",
        "product title": "Samsung Galaxy S23 Ultra",
        "key features": [
            "200MP main camera with 10x optical zoom",
            "Snapdragon 8 Gen 2 processor",
            "5,000mAh battery with 45W fast charging",
            "12GB RAM, 128GB storage",
            "6.8-inch Dynamic AMOLED 2X display"
        ],
        "short description": "The Samsung Galaxy S23 Ultra is a powerful and versatile smartphone that excels in both photography and gaming. Its exceptional camera system with a 200MP main sensor and 10x optical zoom is perfect for vlogging, while the Snapdragon 8 Gen 2 processor delivers smooth and responsive performance for demanding games. The 5,000mAh battery provides ample power for all-day use, and the 128GB storage offers plenty of space for your photos, videos, and apps.",
        "price": "$1,199",
        "resource links": [
            "https://www.samsung.com/us/smartphones/galaxy-s23-ultra/",
            "https://www.gsmarena.com/samsung_galaxy_s23_ultra-12024.php/"
        ]
    },
    {
        "special tag": "Best Camera Phone",
        "product title": "Google Pixel 7 Pro",
        "key features": [
            "50MP main camera with Super Res Zoom",
            "Google Tensor G2 processor",
            "5,000mAh battery with 23W fast charging",
            "12GB RAM, 128GB storage",
            "6.7-inch OLED display"
        ],
        "short description": "The Google Pixel 7 Pro is renowned for its exceptional camera performance. Its 50MP main camera captures stunning images and videos, while the Super Res Zoom allows you to zoom in without sacrificing quality. The Google Tensor G2 processor ensures smooth performance for both gaming and vlogging, and the 5,000mAh battery provides long-lasting power. The 128GB storage offers ample space for your content.",
        "price": "$899",
        "resource links": [
            "https://store.google.com/product/pixel_7_pro",
            "hhttps://www.gsmarena.com/google_pixel_7_pro-11908.php/"
        ]
    },
    {
        "special tag": "Best Value",
        "product title": "OnePlus 11",
        "key features": [
            "50MP main camera with Hasselblad camera system",
            "Snapdragon 8 Gen 2 processor",
            "5,000mAh battery with 100W fast charging",
            "12GB RAM, 128GB storage",
            "6.7-inch AMOLED display"
        ],
        "short description": "The OnePlus 11 offers a compelling balance of performance, camera capabilities, and value. Its 50MP main camera with the Hasselblad camera system delivers excellent image quality, while the Snapdragon 8 Gen 2 processor ensures smooth gaming. The 5,000mAh battery provides long-lasting power, and the 100W fast charging allows for quick top-ups. The 128GB storage offers ample space for your content.",
        "price": "$799",
        "resource links": [
            "https://www.oneplus.com/global/11",
            "https://www.gsmarena.com/oneplus_11-11893.php/"
        ]
    },
    {
        "special tag": "Best for Gaming",
        "product title": "ASUS ROG Phone 7",
        "key features": [
            "50MP main camera",
            "Snapdragon 8 Gen 2 processor with ROG overclocking",
            "6,000mAh battery with 65W fast charging",
            "16GB RAM, 512GB storage",
            "6.78-inch AMOLED display with 165Hz refresh rate",
            "AirTriggers, AeroActive Cooler 7"
        ],
        "short description": "The ASUS ROG Phone 7 is a gaming powerhouse designed to deliver an exceptional mobile gaming experience. Its Snapdragon 8 Gen 2 processor with ROG overclocking ensures lightning-fast performance, while the 6,000mAh battery provides ample power for extended gaming sessions. The 16GB RAM and 512GB storage provide plenty of space for games and apps. The 6.78-inch AMOLED display with a 165Hz refresh rate offers stunning visuals and smooth gameplay. The AirTriggers and AeroActive Cooler 7 enhance the overall gaming experience.",
        "price": "$999",
        "resource links": [
            "https://rog.asus.com/phones/rog-phone-7/",
            "https://www.gsmarena.com/asus_rog_phone_7-12223.php/"
        ]
    }
]

  return (
    <div>
      <div className="md:max-w-xl max-w-md mx-auto md:p-0 p-2">
        <button
          className="w-full md:h-10 md:text-xl text-lg border-b-2 border-white-500 h-8 mb-5 flex items-center justify-between"
          onClick={onClickShow}
        >
          <span>Requirements <span className="text-lg italic">({showForm["name"]})</span></span> {showForm["icon"]}
        </button>
        {/* <Form show={showForm["show"]} />*/}
        <div
          className={`${
            showForm["show"] ? `opacity-100` : `opacity-0`
          } transition-opacity`}
        >
          {showForm["show"] && (
            <form
              className="bg-secondary-color shadow-lg rounded-xl px-8 pt-6 pb-8 mb-5 text-primary-color"
              onSubmit={handleSubmit}
            >
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">
                  Product Type
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter the product type"
                  name="productType"
                  value={requirements.productType}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">
                  Requirements
                </label>
                <div className="flex mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
                    type="text"
                    placeholder="Enter your requirement"
                    name="requirement"
                    value={requirement}
                    onChange={onChangeRequirement}
                  />
                  <button
                    className="bg-primary-dark-color text-secondary-dark-color py-2 px-3 shadow appearance-none border rounded hover:scale-90 transition-transform"
                    onClick={onClickRequirements}
                  >
                    +
                  </button>
                </div>
                {requirementsArray.map((requirement, index) => (
                  <div
                    key={index}
                    className="bg-white mb-1 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4 flex justify-between"
                  >
                    <p>{requirement}</p>
                    <button
                      className="text-red-500 text-xl"
                      onClick={() => onClickDelete(index)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">
                  Other Special Requirements
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your special requirements if you have any"
                  name="otherCases"
                  value={requirements.otherCases}
                  onChange={onChange}
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-bold mb-2">
                  Currency
                </label>
                <select
                  name="currency"
                  value={requirements.currency}
                  onChange={onChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select a currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-end">
                <button
                  className="bg-secondary-dark-color hover:scale-90 transition-transform text-primary-color font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-center capitalize mt-20">
        Products
      </h1>
      {loading && <Spinner />}
      {responseData && <ItemList items={responseData} />}
    </div>
  );
};

/*const Form = (props: any) => (
  <div
    className={`${props.show ? `opacity-100` : `opacity-0`} transition-opacity`}
  >
    <form className="bg-secondary-color shadow-md rounded px-8 pt-6 pb-8">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Type
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Smartphone"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Requirements
        </label>
        <div className="flex mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
            type="text"
            placeholder="Something"
          />
          <button className="bg-black py-2 px-3 shadow appearance-none border rounded">
            +
          </button>
        </div>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
          type="text"
          placeholder="Something"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Other Special Requirements
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Something"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Currency
        </label>
        <select         id="currency-select"
        value={selectedCurrency}
        onChange={handleChange}>
        
        </select>
      </div>
      <div className="flex flex-col items-end">
        <button
          className="bg-primary-color hover:bg-primary-dark-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
);*/

export default ProductForm;
