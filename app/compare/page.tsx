"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

import ItemList from "../components/ItemList";

type Product = {
    "special tag": string;
    "product title": string;
    "key features": string[];
    "short description": string;
    price: string;
    "resource links": string[];
  };

const compare = () => {
  const [product, setProduct] = useState({
    product: " "
  });
  const [responseData, setResponseData] = useState([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/compare", product);
      setResponseData(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Smartphone"
          name="product"
          value={product.product}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p className="mb-4">{responseData[0]}</p>
      {responseData && <ItemList items={responseData.filter((_, index) => index > 0)} />}
      {/* {responseData &&
        responseData.filter((_, index) => index > 0).map((item, index) => (
            <div key={index} className="border-b-white mb-4">
            <h1>{item["special tag"]}: {item["product title"]}</h1>
            <p>{item["short description"]}</p>
            <p>{item["key features"]}</p>
            <p>{item["links"]}</p>
            <p>{item["price"]}</p>
          </div>
        ))} */}
    </div>
  );
};

export default compare;
