"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import InstructionsContainer from "../components/InstructionsContainer";
import { showToast } from "../components/ToastHelper";
import CircleSpinner from "../components/CircleSpinner";

type Example = {
  description: string;
  examples: string[];
};

type contentType = {
  purpose_and_use: {
    description: "";
    examples: [];
  };
  specifications: {
    description: "";
    examples: [];
  };
  quality: {
    description: "";
    examples: [];
  };
  price: {
    description: "";
    examples: [];
  };
  brand: {
    description: "";
    examples: [];
  };
  ratings: {
    description: "";
    examples: [];
  };
  warranty: {
    description: "";
    examples: [];
  };
  availability: {
    description: "";
    examples: [];
  };
  terms: {
    description: "";
    examples: [];
  };
  conclusion: {
    description: string;
  };
};

const guide = () => {
  const { data: session } = useSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const [product, setProduct] = useState({
    product: "",
  });
  const [responseData, setResponseData] = useState<contentType>({
    purpose_and_use: {
      description: "",
      examples: [],
    },
    specifications: {
      description: "",
      examples: [],
    },
    quality: {
      description: "",
      examples: [],
    },
    price: {
      description: "",
      examples: [],
    },
    brand: {
      description: "",
      examples: [],
    },
    ratings: {
      description: "",
      examples: [],
    },
    warranty: {
      description: "",
      examples: [],
    },
    availability: {
      description: "",
      examples: [],
    },
    terms: {
      description: "",
      examples: [],
    },
    conclusion: {
      description: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/guide", product);
      setLoading(false);
      setProduct({
        product: "",
      });
      setResponseData(response.data);
      console.log(response.data);
      showToast("success", "Data retrieved successfuly");
    } catch (error: any) {
      setProduct({
        product: "",
      });
      setLoading(false);
      showToast("error", error.response.statusText);
    }
  };

  return (
    <div className="md:p-0 p-3">
      <form
        className="max-w-xl mx-auto bg-secondary-color shadow-md rounded-xl px-8 pt-6 pb-8 mb-5"
        onSubmit={handleSubmit}
      >
        <label className="block text-primary-color text-md font-bold mb-2">
          Product Type
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter the product type"
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
        What you should consider
      </h1>
      {loading && <CircleSpinner />}
      {responseData["specifications"]["examples"].length == 0 ? null : (
        <InstructionsContainer content={responseData} />
      )}
    </div>
  );
};

export default guide;
