"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { MdCancel } from "react-icons/md";

import { db } from "../firebase";
import { collection, doc, query, where, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import CircleSpinner from "../components/CircleSpinner";
import { showToast } from "../components/ToastHelper";

const saved = () => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserId(session.user.id);
    }
  }, [status, session]);

  const productsQuery = userId
    ? query(collection(db, "products"), where("userId", "==", userId))
    : null;
  const [productsSnapshot, loading, error] = useCollection(productsQuery);

  if (status == "loading" || loading) {
    return <CircleSpinner />;
  }

  if (!session) {
    redirect("/api/auth/signin");
  }

  const removeHandle = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      showToast("success", "Item removed successfully");
    } catch (error) {
      console.log(error);
      showToast("error", "An error occured");
    }
  };

  if (status === "authenticated" && userId) {
    if (error) {
      console.error("Error fetching products: ", error);
      showToast("error", "Error fetching products");
      return <p>An error occured</p>;
    }
    console.log(productsSnapshot?.docs.length == 0);

    return (
      <div>
        <h1 className="text-3xl font-extrabold text-center mb-10">
          Saved Products
        </h1>
        {productsSnapshot?.docs.length != 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
            {productsSnapshot?.docs.map((doc) => (
              <div
                key={doc.id}
                className="relative flex shrink-0 max-w-[95vw] overflow-hidden rounded-3xl bg-gradient-to-b from-secondary-color to-primary-dark-color text-primary-color shadow-md md:text-base text-sm"
              >
                <div className="relative w-[768px] p-12 h-100 flex flex-col justify-between items-start">
                  <h1 className="font-bold font-lg mb-4">
                    {doc.data()["product title"]}:{" "}
                    <span className="font-light italic">
                      {doc.data()["special tag"]}
                    </span>
                  </h1>
                  <p className="font-md mb-4">
                    {doc.data()["short description"]}
                  </p>
                  <h2 className="font-semibold font-lg mb-2 text-secondary-dark-color">
                    Key Features
                  </h2>
                  <ol className="list-disc ml-4 text-secondary-dark-color">
                    {doc
                      .data()
                      ["key features"].map((feature: string, index: number) => (
                        <li className="font-md" key={index}>
                          {feature}
                        </li>
                      ))}
                  </ol>
                  <h2 className="mt-4 mb-4 font-bold text-secondary-dark-color">
                    {doc.data()["price"]}
                  </h2>
                  {doc
                    .data()
                    ["resource links"].map((link: string, index: number) => (
                      <a
                        className="underline text-secondary-color"
                        key={index}
                        href={link}
                      >
                        Reference {index + 1}
                      </a>
                    ))}
                  <button
                    className="absolute bottom-10 right-10 text-3xl text-secondary-dark-color hover:text-secondary-color transition-colors"
                    onClick={() => removeHandle(doc.id)}
                  >
                    <MdCancel />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-center">
            You haven't saved any product :)
          </h2>
        )}
      </div>
    );
  }

  return <div></div>;
};

export default saved;
