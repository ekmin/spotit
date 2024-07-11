"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { MdSouth, MdNorth, MdCancel } from "react-icons/md";
import currenciesData from "../../public/currencies.json";
import ItemList from "./ItemList";

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
    name: "Requirements",
    icon: <MdNorth />,
  });
  const onClickShow = () =>
    setShowForm((prevState) => ({
      show: !prevState.show,
      name: prevState.show ? "Requirements" : "Requirements",
      icon: prevState.show ? <MdSouth /> : <MdNorth />,
    }));

  const currencies: Currency[] = Object.values(currenciesData.currencies[0]);

  const [requirement, setRequirement] = useState("");
  const [requirementsArray, setRequirementsArray] = useState<string[]>([]);

  const [requirements, setRequirements] = useState<IRequirements>({
    productType: "",
    requirements: requirementsArray,
    otherCases: "",
    currency: "",
  });

  const [responseData, setResponseData] = useState<Product[]>([]);

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

    setRequirementsArray((prev) => {
      const updatedRequirementsArray = [...prev, requirement];
      setRequirements((prevData) => ({
        ...prevData,
        requirements: updatedRequirementsArray,
      }));
      return updatedRequirementsArray;
    });
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

    try {
      const response = await axios.post("/api/products", requirements);
      setResponseData(response.data);
      setShowForm({
        show: false,
        name: "Requirements",
        icon: <MdSouth />
      });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto">
        <button
          className="w-full md:h-10 md:text-xl text-lg border-b-2 border-white-500 h-8 mb-5 flex justify-between"
          onClick={onClickShow}
        >
          {showForm["name"]} {showForm["icon"]}
        </button>
        {/* <Form show={showForm["show"]} />*/}
        <div
          className={`${
            showForm["show"] ? `opacity-100` : `opacity-0`
          } transition-opacity`}
        >
          {showForm["show"] && <form
            className="bg-secondary-color shadow-md rounded px-8 pt-6 pb-8 mb-5"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Type
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Smartphone"
                name="productType"
                value={requirements.productType}
                onChange={onChange}
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
                  name="requirement"
                  value={requirement}
                  onChange={onChangeRequirement}
                />
                <button
                  className="bg-black py-2 px-3 shadow appearance-none border rounded"
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Other Special Requirements
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Something"
                name="otherCases"
                value={requirements.otherCases}
                onChange={onChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={requirements.currency}
                onChange={onChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-primary-color hover:bg-primary-dark-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>}
        </div>
      </div>
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
