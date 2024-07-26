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

  return (
    <div>
      <div className="md:max-w-xl max-w-md mx-auto md:p-0 p-2">
        <button
          className="w-full md:h-10 md:text-xl text-lg border-b-2 border-white-500 h-8 mb-5 flex items-center justify-between"
          onClick={onClickShow}
        >
          <span>Requirements <span className="text-lg italic">({showForm["name"]})</span></span> {showForm["icon"]}
        </button>
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

export default ProductForm;
