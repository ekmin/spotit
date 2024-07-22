"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import ItemList from "../components/ItemList";
import Spinner from "../components/Spinner";
import { showToast } from "../components/ToastHelper";

type Product = {
  "special tag": string;
  "product title": string;
  "key features": string[];
  "short description": string;
  price: string;
  "resource links": string[];
};

const compare = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const [product, setProduct] = useState({
    product: " ",
  });
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/compare", product);
      setLoading(false);
      setProduct({
        product: " ",
      })
      setResponseData(response.data);
      showToast("success", "Data retrieved successfuly");
    } catch (error: any) {
      setProduct({
        product: " ",
      })
      setLoading(false);
      showToast("error", error.response.statusText + ", Try again");
    }
  };

  return (
    <div className="md:p-0 p-2">
      <form
        className="max-w-xl mx-auto bg-secondary-color shadow-md rounded-xl px-8 pt-6 pb-8 mb-5"
        onSubmit={handleSubmit}
      >
        <label className="block text-primary-color text-md font-bold mb-2">
          Product / Model Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Smartphone"
          name="product"
          value={product.product}
          onChange={onChange}
          required
        />
        <div className="flex flex-col items-end">
          <button
            className="bg-secondary-dark-color hover:scale-110 transition-transform text-primary-color font-semibold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <h1 className="text-3xl font-extrabold tracking-tight text-center capitalize mt-10">
        Gemini's Opinion
      </h1>
      <p className="mb-4 text-center max-w-xl m-auto mt-10 border-2 border-secondary-color px-8 py-8 rounded-md">{responseData[0]}</p>
      <h1 className="text-3xl font-extrabold tracking-tight text-center capitalize mt-10">
        Products
      </h1>
      {loading && <Spinner />}
      {responseData && (
        <ItemList items={responseData.filter((_, index) => index > 0)} />
      )}
    </div>
  );
};

export default compare;
