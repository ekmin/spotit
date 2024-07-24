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

  const testData = {
    purpose_and_use: {
      description:
        "A smartphone is a mobile phone with advanced computing capabilities, allowing you to make calls, send messages, access the internet, take photos and videos, use apps, and much more. You can choose a smartphone based on your specific needs, whether you're looking for a device for communication, entertainment, productivity, or a combination of all these.",
      examples: [
        "Communication: Making calls, sending text messages, video calls.",
        "Entertainment: Watching videos, playing games, listening to music.",
        "Productivity: Email, browsing the web, document editing, working on spreadsheets.",
        "Photography: Taking photos and videos, using different camera modes.",
      ],
    },
    specifications: {
      description:
        "Smartphone specifications are the technical features that determine its performance and capabilities. Some key specifications to consider include:",
      examples: [
        "Display: Size, resolution, type (LCD, OLED, AMOLED), refresh rate.",
        "Processor:  Speed and number of cores, affects overall performance.",
        "RAM: Amount of memory for running apps, more RAM means smoother multitasking.",
        "Storage: Internal storage capacity for apps, photos, and videos.",
        "Battery: Capacity, charging speed, battery life.",
        "Camera: Megapixels, features like optical image stabilization (OIS), video recording capabilities.",
        "Operating System: Android, iOS, or other operating systems.",
      ],
    },
    quality: {
      description:
        "Quality refers to the overall build, materials, durability, and performance of a smartphone. ",
      examples: [
        "Build quality:  Look for a phone with a sturdy design and premium materials.",
        "Durability:  Consider features like water resistance and scratch-resistant glass.",
        "Performance:  Smooth and responsive user experience, fast app loading times.",
        "Camera quality:  Sharp and detailed photos and videos, good low-light performance.",
      ],
    },
    price: {
      description:
        "Smartphone prices vary significantly depending on features, brand, and storage capacity. Set a budget before you start shopping.",
      examples: [
        "Budget phones: Offer good value for money but may have limited features.",
        "Mid-range phones:  Balance features and performance with a reasonable price.",
        "Flagship phones:  Top-of-the-line models with the latest technologies, come at a premium price.",
      ],
    },
    brand: {
      description:
        "Different brands have their strengths and weaknesses. Research popular brands and consider their reputation for quality, software updates, and customer support.",
      examples: [
        "Apple: Known for its iOS operating system, premium design, and strong ecosystem.",
        "Samsung: Offers a wide range of devices with Android, known for its displays and cameras.",
        "Google:  Known for its Pixel phones with stock Android and excellent camera capabilities.",
        "OnePlus:  Offers high-performance phones at competitive prices.",
      ],
    },
    ratings: {
      description:
        "Read reviews from other users to get insights into a phone's performance, battery life, camera quality, and overall satisfaction.",
      examples: [
        "Online reviews:  Websites like Amazon, CNET, and PCMag.",
        "Tech blogs and forums:  Specific websites and forums dedicated to tech reviews.",
      ],
    },
    warranty: {
      description:
        "A warranty covers repairs or replacements for defects within a specific time period. Check the duration and coverage of the warranty before you buy.",
      examples: [
        "Standard warranty: Typically covers manufacturer defects for a year or two.",
        "Extended warranty:  Provides additional coverage for longer periods, may cost extra.",
      ],
    },
    availability: {
      description:
        "Make sure the phone you're interested in is available in your region and from a reputable retailer.",
      examples: [
        "Retailers:  Online stores like Amazon, Best Buy, and local carriers.",
        "Carrier availability:  Check if the phone is compatible with your mobile network.",
      ],
    },
    terms: {
      description:
        "Understand the terminology used in smartphone specifications.",
      examples: [
        "GHz:  Gigahertz, a unit of measurement for processor speed.",
        "GB:  Gigabytes, a unit of measurement for storage capacity and RAM.",
        "MP:  Megapixels, a unit of measurement for camera resolution.",
        "OLED:  Organic light-emitting diode, a type of display known for its deep blacks and vibrant colors.",
        "AMOLED:  Active-matrix organic light-emitting diode, a type of OLED display with faster response times.",
      ],
    },
    conclusion: {
      description:
        "Consider your budget, priorities, and research before making a purchase.  Read reviews and compare specifications to find the best smartphone that meets your individual needs.",
    },
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
